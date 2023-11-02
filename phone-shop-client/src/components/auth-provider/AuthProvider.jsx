import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";
import PropTypes from 'prop-types'

export const UserAuth = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user with email and password
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in with email and password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // get current user status
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
          });
          
    }, [])

    // update user name
    const updateName = name => {
        return updateProfile(auth.currentUser, {
            displayName: name
          })
    }

    // sign out
    const logOut = () => {
        return signOut(auth);
    }

    const AuthInfo = {
        user,
        loading,
        signUp,
        signIn,
        updateName,
        logOut
    }

    return (
        <UserAuth.Provider value={AuthInfo}>
            {children}
        </UserAuth.Provider>
        
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;