import {apiClient} from '../utils2/apiClient';

export const getBanners = async () => {
    const response = await apiClient.get('/banners/');
    return response.data;
};

export const getCategories = async () => {
    const response = await apiClient.get('/products/categories/');
    return response.data;
};

export const getNewest = async () => {
    const response = await apiClient.get('/products/newest/');
    return response.data;
};
export const getSanitary = async () => {
    const response = await apiClient.get('/products/sanitary/');
    return response.data;
};
export const getBestseller = async () => {
    const response = await apiClient.get('/products/best-sellers/');
    return response.data;
};
export const getBrands = async () => {
    const response = await apiClient.get('/products/brands/');
    return response.data;
};
export const getonSale = async () => {
    const response = await apiClient.get('/products/on-sale/');
    return response.data;
};