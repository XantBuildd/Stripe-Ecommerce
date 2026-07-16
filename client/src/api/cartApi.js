import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const createItemCart = async (item) => {
  const response = await api.post("/cart", item);
  return response.data;
};

export const updateItemCart = async (item) => {
  const response = await api.update(`/cart/${item.productId}`, item);
  return response.data;
};

export const deleteItemCart = async (item) => {
  const response = await api.delete(`/cart/${item.productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");
  return response.data;
};
