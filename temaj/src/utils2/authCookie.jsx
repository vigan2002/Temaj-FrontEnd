// auth.js
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const setTokens = (data) => {
    Cookies.set(TOKEN_KEY, data.access, {expires: 1, sameSite: 'Lax'});
    Cookies.set(REFRESH_TOKEN_KEY, data.refresh, {expires: 7, sameSite: 'Lax'});
};

export const setAccessToken = (data) => {
    Cookies.set(TOKEN_KEY, data, {expires: 1, sameSite: 'Lax'});
}

export const getAccessToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
    Cookies.remove(TOKEN_KEY, {
        secure:true,
        sameSite: 'None'
    });
    Cookies.remove(REFRESH_TOKEN_KEY, {
        secure:true,
        sameSite: 'None'
    });
};

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token');
        return null;
    }
};
