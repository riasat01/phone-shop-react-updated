const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require("jsonwebtoken");
const CookieParser = require('cookie-parser');

// built in middleware

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(CookieParser());

// custom middleware

const logger = async (req, res, next ) => {
  console.log('CAlled ', req.hostname, req.originalUrl);
  next();
}

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(`Value of token in middleware ${token}`);
  if(!token){
    return res.status(401).send({ message: 'Not Authorized' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      console.log(err);
      return res.status(401).send({message: 'unauthorized'})
    }
    console.log('Value in the token', decoded);
    req.user = decoded;
    next();
  })
}

// mongo db

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1xv3maf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // auth related api 
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
      res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      .send({success: true});
    })

    // services realated api
    const phoneCollection = client.db("phoneDB").collection("phones");
    const favouritesCollection = client.db("phoneDB").collection("favourites");



    // Phones related api end points

    app.get('/phones', async(req, res) => {
        const result = await phoneCollection.find().toArray();
        res.send(result);
    })

    app.get('/phones/:id', logger, verifyToken, async(req, res) => {
        // console.log('cookies test', req.cookies)
        const email = req.query.email;
        // console.log(email);
        if(email !== req.user.email){
          return res.status(403).send({message: 'forbidden access'});
        }
        const id = req.params.id;
        const query = {id: id};
        const options ={
          projection: {_id: 0, id: 1, image: 1, phone_name: 1, brand_name: 1, price: 1}
        }
        const result = await phoneCollection.findOne(query, options);
        res.send(result);
    })



    // favourites related api end points

    app.get('/favourites',  async(req, res) => {
      const result = await favouritesCollection.find().toArray();
      res.send(result);
    })
    app.post('/favourites', async(req, res) => {
      const data = req.body;
      const result = await favouritesCollection.insertOne(data);
      res.send(result);
    })
    app.get('/favourites/:email', logger, verifyToken, async(req, res) => {
      const email = req.params?.email;
      if(email !== req.user?.email){
        return res.status(403).send({message: 'forbidden access'})
      }
      const result = await favouritesCollection.find({email: email}).toArray();
      console.log('User in the verified token', req.user.email);
      res.send(result);
    })
    app.delete('/favourites/:email', async(req, res) => {
      const email = req.params.email;
      const query = {email: email};
      const result = await favouritesCollection.deleteMany(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// root of server

app.get('/', (req, res) => {
    res.send("Server is running!!")
})


app.listen(port, () => {
    console.log("Server created")
})