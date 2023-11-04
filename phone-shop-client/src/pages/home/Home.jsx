import { useEffect, useState } from "react";
import Banner from "../../components/header/banner/Banner";
import Phones from "../../components/phones/Phones";
import axios from "axios";

const Home = () => {
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        axios.get(`https://phone-shop-server-steel.vercel.app/phones`)
            .then(data => setPhones(data.data))
            .catch(error => console.log(error.message));
    }, [])

    // console.log(phones);
    return (
        <>
            <Banner></Banner>
            <Phones phones={phones}></Phones>
        </>
    );
};

export default Home;