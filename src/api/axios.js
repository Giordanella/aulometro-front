import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

/* TEMPORAL: Interceptor para agregar header automáticamente
//inyector de JWT
api.interceptors.request.use((config) => {
  //config.headers.role = "DIRECTIVO";
  const token = localStorage.getItem("TOKEN");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});*/

export default api;
