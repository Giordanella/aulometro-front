import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthRole = (role) => {
  api.defaults.headers.common["role"] = role;
};

export default api;
