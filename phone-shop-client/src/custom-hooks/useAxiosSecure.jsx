import axios from "axios";
import { useEffect } from "react";
import useUeserAuth from "./useUeserAuth";
import swal from "sweetalert";

const AxiosSecure = axios.create({
    baseURL: 'https://phone-shop-server-steel.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useUeserAuth();
    useEffect(() => {
        AxiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('Error tracked in interceptor ', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('Logout user');
                logOut()
                    .then(() => swal(`Info`, `You've sign out successfully`, 'info'))
                    .catch(error => swal('Error', `${error.message}`, 'error'));
            }
        })
    }, [])
    return AxiosSecure;
};

export default useAxiosSecure;