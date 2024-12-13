import {apiClient} from '../utils2/apiClient';

export const getUserWishlist = async () => {
    const response = await apiClient.get('/user/wishlist/');
    return response.data;
};
export const deleteWishlistById = async (id) => {
    const response = await apiClient.delete(`/user/wishlist/${id}/`);
    return response; 
}
export const addToWishlistById = async (id) => {
    const response = await apiClient.post(`/products/${id}/wishlist/`);
    return response; 
}
export const deleteAllWishlist = async () => {
    const response = await apiClient.delete(`/user/wishlist/all/`);
    return response; 
}

