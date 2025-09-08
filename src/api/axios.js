import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const setAuthRole = (role) => {
  api.defaults.headers.common["role"] = role;
};

export default api;
