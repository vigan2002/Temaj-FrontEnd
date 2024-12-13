import axios from 'axios';
import {getAccessToken, removeTokens, setAccessToken, getRefreshToken} from '../utils2/authCookie';

const URL = 'https://api.temaj.eu';
// const URL = 'http://37.60.255.244:8000';
const createApiClient = () => {
    const api = axios.create({
        baseURL: URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && error.response.data.code === "token_not_valid" && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = getRefreshToken();

                try {
                    const response = await axios.post(`${URL}/token/refresh/`, {refresh: refreshToken}, {
                        headers: {'Content-Type': 'application/json'}
                    });

                    const newAccessToken = response.data.access;
                    setAccessToken(newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    removeTokens();
                    window.location.reload();

                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};


export const apiClient = createApiClient();



