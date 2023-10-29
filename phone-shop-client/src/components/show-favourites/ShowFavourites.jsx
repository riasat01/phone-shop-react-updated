import { useEffect, useState } from "react";
import Phone from "../phone/Phone";

const ShowFavourites = ({ favourites }) => {
    const [length, setLength] = useState(4);
    const [isShowLess, setIsShowLess] = useState(false);
    // const [textShowLess, setTextShowLess] = useState('Show More');

    // const handleShowLess = () => {
    //     setIsShowLess(!isShowLess);
    //     if(isShowLess){
    //         setLength(favourites.length);
    //     }else{
    //         setLength(4);
    //     }
    // }

    useEffect(() => {
        // setIsShowLess(!isShowLess);
        isShowLess ? setLength(favourites.length) : setLength(4);
    }, [isShowLess])
    return (
        <>
            <h1 className="text-3xl font-semibold my-12 mx-auto w-fit">Favourites</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    favourites?.slice(0, length).map(phone => <Phone key={phone.id} phone={phone}></Phone>)
                }

            </div>
            <div className="w-fit mt-12 mx-auto">
                {
                    favourites.length > 4 && <button onClick={() => setIsShowLess(!isShowLess)} className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white px-3 py-2">{isShowLess ? 'Show Less' : 'Show More'}</button>
                }
            </div>
        </>
    );
};

export default ShowFavourites;