import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// TEMPORAL: Interceptor para agregar header automáticamente
api.interceptors.request.use((config) => {
  config.headers.role = "DIRECTIVO";
  return config;
});

export default api;
