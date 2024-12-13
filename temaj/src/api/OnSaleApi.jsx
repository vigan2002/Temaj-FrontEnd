import {apiClient} from '../utils2/apiClient';

export const getOnSaleAllProducts = async () => {
    const response = await apiClient.get(`/products/on-sale/all/`);
    return response.data;
};