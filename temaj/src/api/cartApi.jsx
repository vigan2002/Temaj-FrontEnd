import {apiClient} from '../utils2/apiClient';

export const getCartsUser = async () => {
    const response = await apiClient.get(`/user/cart/`);
    return response.data; 
}

export const addToCartById = async (id, input) => {
    const response = await apiClient.post(`/products/${id}/cart/`,{ quantity: input });
    return response; 
}

export const deleteAllCartsUser = async() => {
    const response = await apiClient.delete(`/user/cart/all/`);
    return response;    
}
export const deleteCartUserById = async (id) => {
    const response = await apiClient.delete(`/user/cart/${id}/`);
    return response;
}
export const addOrders = async (data) => {
    const response = await apiClient.post(`/user/order/`,data);
    return response; 
}
export const getOrdersUser = async () => {
    const response = await apiClient.get('/orders/');
    return response.data;
}

export const getPendingOrdersUser = async () => {
    const response = await apiClient.get('/administrator/pending-orders/');
    return response.data;
}
export const addPendingOrdersUser = async (cart_id, status) => {
    const data = { state: status };
    const response = await apiClient.put(`/administrator/update-order/${cart_id}/`, data);
    return response;
}


export const getPendingPromotionUser = async () => {
    const response = await apiClient.get('/administrator/pending-promotion/');
    return response.data;
}
export const addPendingPromotionUser = async (id, data) => {
    const response = await apiClient.put(`/administrator/promote/${id}/`,data);
    return response; 
}