import { useEffect, useState } from "react";
import Banner from "../../components/header/banner/Banner";
import Phones from "../../components/phones/Phones";
import axios from "axios";

const Home = () => {
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/phones`)
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