import Phone from "../phone/Phone";

const Phones = ({phones}) => {
    // console.log(phones);
    return (
        <>
            <h1 className="text-3xl font-semibold my-12 mx-auto w-fit">All Categories Phone</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                phones?.map(phone => <Phone key={phone.id} phone={phone}></Phone>)
            }
            </div>
        </>
    );
};

export default Phones;