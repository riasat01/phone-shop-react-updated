const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware

app.use(cors());
app.use(express.json());



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

    const phoneCollection = client.db("phoneDB").collection("phones")

    app.get('/phones', async(req, res) => {
        const result = await phoneCollection.find().toArray();
        res.send(result);
    })

    app.get('/phones/:id', async(req, res) => {
        const id = req.params.id;
        const query = {id: id};
        const options ={
          projection: {_id: 0, id: 1, image: 1, phone_name: 1, brand_name: 1}
        }
        const result = await phoneCollection.findOne(query, options);
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