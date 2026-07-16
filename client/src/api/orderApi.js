import api from "./api";

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createCheckoutSession = async () => {
  const response = await api.post("/orders/checkout");
  return response.data;
};
