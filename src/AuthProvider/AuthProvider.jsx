/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";
import axios from "axios";



export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const GoogleProvider = new GoogleAuthProvider();

    const CreateUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const Login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const Logout = () => {
        return signOut(auth);

    };

    const GoogleLogin = () => {
        return signInWithPopup(auth, GoogleProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
            if (currentUser) {
                const user = currentUser.email;
                axios.post(`https://eduskills-server.vercel.app/authentication`, user, {
                    withCredentials:true
                })
                    .then(data => {
                        console.log(data.data)
                        if (data.data) {
                            localStorage.setItem('access-token', data?.data?.token)
                            setLoading(false);
                        }
                    })

            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }


        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        CreateUser,
        Login,
        Logout,
        GoogleLogin
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>


};

export default AuthProvider;