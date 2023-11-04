import { useContext, useEffect, useState } from "react";
// import Phones from "../../components/phones/Phones";
import ShowFavourites from "../../components/show-favourites/ShowFavourites";
import axios from "axios";
import swal from "sweetalert";
import { UserAuth } from "../../components/auth-provider/AuthProvider";

const Favourites = () => {

    const [favourites, setFavourites] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [price, setPrice] = useState(0);
    const { user } = useContext(UserAuth);


    useEffect(() => {
        axios.get(`http://localhost:5000/favourites/${user?.email}`, {withCredentials: true})
            .then(data => setFavourites(data.data))
            .catch(error => swal('Error', `${error.message}`, 'error'));
        // const total = favourites?.reduce((preValue, currentValue) => preValue + currentValue.price, 0);
        // setPrice(total.toFixed(2));
    }, [])


    useEffect(() => {
        const total = favourites.reduce((preValue, currentValue) => preValue + currentValue.price, 0);
        setPrice(total.toFixed(2));
    }, [favourites])


    const handleDelete = () => {
        // localStorage.clear();
        
        axios.delete(`http://localhost:5000/favourites/${user?.email}`)
        .then(data => {
            console.log(data);
            setNotFound(true);
            setFavourites([]);
        })
        .catch(error => console.log(error.message));
    }

    return (
        <>
            {/* <h1>favourites</h1> */}
            <div className="w-fit m-auto space-y-4">
                <p className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white px-3 py-2">Total: ${price}</p>
                {
                    notFound || <button onClick={handleDelete} className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white px-3 py-2">Delete all favourites</button>
                }
            </div>
            <div className="">
                {
                    notFound ? <p className="w-fit m-auto">No data found</p> : <ShowFavourites favourites={favourites}></ShowFavourites>
                }
            </div>
        </>
    );
};

export default Favourites;