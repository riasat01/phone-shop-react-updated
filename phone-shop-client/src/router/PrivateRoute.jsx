import { useContext } from "react";
import { UserAuth } from "../components/auth-provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserAuth);
    const location = useLocation();
    // console.log(location.pathname);

    if (loading) {
        return (
            <div className="h-16 flex justify-center items-center gap-6 font-extrabold text-5xl">
                <span className="loading loading-infinity loading-xs"></span>
                <span className="loading loading-infinity loading-sm"></span>
                <span className="loading loading-infinity loading-md"></span>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        )
    }
    if (!user) {
        return (
            <Navigate state = {location.pathname} to='/login'></Navigate>
        )
    }
    return (
        <>
            {children}
        </>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;