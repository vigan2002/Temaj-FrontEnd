import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./consts";

export const API_URL = BASE_URL;

const api = axios.create({
 baseURL: API_URL,
 timeout: 30000,
 headers: {
  "Content-Type": "application/json",
 },
});

api.interceptors.request.use(async (config) => {
 const token = Cookies.get("token");
 if (token) config.headers["Authorization"] = `Bearer ${token}`;
 return config;
});

api.interceptors.response.use(
 (response) => {
  return response;
 },
 (error) => {
  return Promise.reject(error);
 }
);

export default api;
