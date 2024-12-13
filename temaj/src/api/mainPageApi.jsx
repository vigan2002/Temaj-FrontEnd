import { apiClient } from '../utils2/apiClient';

export const getImagesBanners = async () => {
    const response = await apiClient.get('/images/');
    return response.data;
};

export const getLandingBanner = async () => {
    const response = await apiClient.get('/images/');
    return response.data;
};

export const getMainBanner = async () => {
    const response = await apiClient.get('/images/');
    return response.data;
};

export const getOtherBanner = async () => {
    const response = await apiClient.get('/images/');
    return response.data;
};
