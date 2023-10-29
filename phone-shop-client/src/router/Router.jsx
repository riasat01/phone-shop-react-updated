import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Favourites from "../pages/favourites/Favourites";
import Login from "../pages/login/Login";
import PhoneDetails from "../pages/phone-details/PhoneDetails";
import ErrorPage from "../pages/error-page/ErrorPage";

const myRouter = createBrowserRouter([
    {
        path: `/`,
        element:<MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: `/`,
                element:<Home></Home>,
                // loader: () => fetch(`../phones.json`)
            },
            {
                path: `/favourites`,
                element:<Favourites></Favourites>
            },
            {
                path: `/login`,
                element:<Login></Login>
            },
            {
                path: '/phone/:id',
                element:<PhoneDetails></PhoneDetails>,
                loader: () => fetch(`../phones.json`)
            }
        ]
    }
]) 

export default myRouter;