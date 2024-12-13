import React, {createContext, useState, useEffect, useContext} from 'react';
import {getAccessToken, removeTokens, decodeToken, setTokens} from '../utils2/authCookie';

const AuthContext = createContext();

export const AuthProvider2 = ({children}) => {

    const token = getAccessToken();
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(token);

    useEffect(() => {
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                setUser(decodedUser);
                setLoggedIn(true);
            } else {
                logout();
            }
        }
    }, [token]);

    const logintoken = (data) => {
        setTokens(data);
        setUser(decodeToken(data.access));
        setLoggedIn(true);
    };

    const logout = () => {
        removeTokens();
        setUser(null);
        setLoggedIn(false);
    };

    const isAuthenticated = loggedIn;

    return (
        <AuthContext.Provider value={{user, logintoken, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

