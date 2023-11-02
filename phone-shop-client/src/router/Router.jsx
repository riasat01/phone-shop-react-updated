import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Favourites from "../pages/favourites/Favourites";
import LoginPage from "../pages/login-page/LoginPage";
import PhoneDetails from "../pages/phone-details/PhoneDetails";
import ErrorPage from "../pages/error-page/ErrorPage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import PrivateRoute from "./PrivateRoute";

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
                element:<PrivateRoute><Favourites></Favourites></PrivateRoute>
            },
            {
                path: `/login`,
                element:<LoginPage></LoginPage>,
                children: [
                    {
                        path: '/login',
                        element: <Login></Login>
                    },
                    {
                        path: '/login/register',
                        element: <Register></Register>
                    }
                ]
            },
            {
                path: '/phone/:id',
                element:<PrivateRoute><PhoneDetails></PhoneDetails></PrivateRoute>
            }
        ]
    }
]) 

export default myRouter;