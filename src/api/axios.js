import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Configurar token en header Authorization
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
