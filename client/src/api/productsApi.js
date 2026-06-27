import api from "../api/api.js";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getNewReleasesProducts = async () => {
  const response = await api.get("/products/new-releases");
  return response.data;
};
