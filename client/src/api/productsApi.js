import api from "../api/api.js";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductsFiltered = async (filter) => {
  const response = await api.get(`/products?${filter}`);
  return response.data;
};

export const getProduct = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const getNewReleasesProducts = async () => {
  const response = await api.get("/products/new-releases");
  return response.data;
};
