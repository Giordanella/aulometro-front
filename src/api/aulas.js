import api from "./axios";

export const getAulas = () => api.get("/aulas");

export const getAulaById = (id) => api.get(`/aulas/${id}`);

export const createAula = (data) => api.post("/aulas", data);

export const updateAulaById = (id, data) => api.put(`/aulas/${id}`, data);

export const deleteAulaById = (id) => api.delete(`/aulas/${id}`);

export const searchAulas = (filters = {}) =>
  api.get("/busqueda/aulas", { params: filters });

export const searchAulasDisponibles = (filters = {}) =>
  api.get("/busqueda/aulas-disponibles", { params: filters });
