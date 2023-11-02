import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Phone = ({ phone }) => {

    const { id, image, phone_name, price, rating } = phone;
    return (
        <div>
            <div className="relative flex flex-col rounded-xl bg-slate-900 bg-clip-border text-gray-400 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                        src={image}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {phone_name}
                        </p>
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            ${price}
                        </p>
                    </div>
                    <p className="block font-sans text-sm font-normal leading-normal text-gray-400 antialiased opacity-75">
                        {rating}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <Link to={`/phone/${id}`}>
                        <button
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Phone.propTypes = {
    phone: PropTypes.object
}

export default Phone;