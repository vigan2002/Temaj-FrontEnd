import { apiClient } from "../utils2/apiClient";

export const getAllProducts = async (filter) => {
  const response = await apiClient.get("/products/", { params: filter });
  return response.data;
};
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}/`);
  return response;
};
export const getRelatedProducts = async (id) => {
  const response = await apiClient.get(`/products/${id}/related/`);
  return response.data;
};

export const setReviewForProducts = async (id, rate) => {
  const body = {
    rate: rate,
  };
  const response = await apiClient.post(`/rate/${id}/`, body);
  return response.data;
};

export const addDiscountToClient = async (body) => {
  const response = await apiClient.post(`/discount/`, body)
  return response;
};

export const getAllArchitect = async () => {
  const response = await apiClient.get(`/administrator/archtitects/`);
  return response.data;
}

export const addDiscountToArchitect = async (body) => {
  const response = await apiClient.post(`/discount/`, body)
  return response;
};
