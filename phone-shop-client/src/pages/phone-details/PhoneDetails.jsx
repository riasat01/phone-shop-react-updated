import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../../components/auth-provider/AuthProvider";
import swal from "sweetalert";

const PhoneDetails = () => {
    const { user } = useContext(UserAuth);
    const [phone, setPhone] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/phones/${id}`)
            .then(data => { setPhone(data.data) })
            .catch(error => console.log(error.message));
    }, [])


    const { image, phone_name, brand_name, price } = phone;

    const handleAddToFavourites = phone => {
        // console.log(phone);
        // const temp = [];
        // const favourite = JSON.parse(localStorage.getItem(`favourites`));
        // if(favourite){
        //     const exists = favourite?.find(phon => phon.id === id);
        //     if(exists){
        //         alert(`No duplicates allowed`)
        //     }else{
        //         console.log(exists)
        //         temp.push(...favourite, phone);
        //         console.log(temp);
        //         localStorage.setItem(`favourites`, JSON.stringify(temp));
        //         alert(`Successfully added`)
        //     }
        // }else{
        //     temp.push(phone);
        //     localStorage.setItem(`favourites`, JSON.stringify(temp));
        // }
        // const data = { ...phone, email: user.email };
        // console.log(data);
        axios.get(`http://localhost:5000/favourites/${user.email}`)
            .then(data => {
                const item = data?.data?.find(info => info.id === phone.id)
                // console.log(item);
                if(item){
                    swal('Error', 'Item slreaady exist', 'error')
                    return;
                }else{
                    const info = { ...phone, email: user.email };
                    axios.post('http://localhost:5000/favourites', info)
                    .then(() => swal('Success', 'Item added successfully', 'success'))
                    .catch(error => swal('Error', `${error.message}`, 'error'));
                }
            })
            .catch(error => swal('Error', `${error.message}`, 'error'));
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-slate-900 bg-clip-border text-gray-500 shadow-md">
                <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                    <img
                        src={image}
                        alt="image"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-6 flex flex-col">
                    <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-cyan-500 antialiased">
                        {brand_name}
                    </h6>
                    <h4 className="flex-grow mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {phone_name}
                    </h4>
                    {/* <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        Like so many organizations these days, Autodesk is a company in
                        transition. It was until recently a traditional boxed software company
                        selling licenses. Yet its own business model disruption is only part of
                        the story
                    </p> */}
                    <p>{price}</p>
                    <Link className="inline-block">
                        <button onClick={() => handleAddToFavourites(phone)}
                            className="flex select-none items-center gap-2 rounded-lg py-3 px-0 text-center align-middle font-sans text-xs font-bold uppercase text-blue-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >Add to favourites
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                ></path>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PhoneDetails;