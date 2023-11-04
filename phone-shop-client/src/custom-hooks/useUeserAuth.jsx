import { useContext } from "react";
import { UserAuth } from "../components/auth-provider/AuthProvider";

const useUeserAuth = () => {
    const auth = useContext(UserAuth);
    return auth;
};

export default useUeserAuth;