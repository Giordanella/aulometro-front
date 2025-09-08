import api from "./axios";

export const loginRequest = async (email, password) => {
  const { data } = await api.post("/login", { email, password });
  return data; // { message, user?, token? }
};
