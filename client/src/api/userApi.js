import api from "./api";

export const updateUser = async (data) => {
  try {
    const response = await api.put("/users/profile", data);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await api.put("/users/change-password", data);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
