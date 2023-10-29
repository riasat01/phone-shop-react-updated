import { Outlet } from "react-router-dom";
import Navbar from "../components/header/navbar/Navbar";

const MainLayout = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;