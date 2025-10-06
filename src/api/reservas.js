import api from "./axios";

export const createReserva = (data) => api.post("/reservas", data);

export const createReservaBatch = (aulaId, reservas) =>
  api.post("/reservas", { aulaId, reservas });

export const getMisReservas = () => api.get("/reservas/propias");

export const getPendientes = () => api.get("/reservas/pendientes");

export const aprobarReserva = (id) => api.post(`/reservas/${id}/aprobar`);

export const rechazarReserva = (id, motivo) =>
  api.post(`/reservas/${id}/rechazar`, { motivo });

export const cancelarReserva = (id) => api.post(`/reservas/${id}/cancelar`);

export const getDisponibilidad = (params) =>
  api.get("/reservas/disponibilidad", { params });

export const getReservaById = (id) => api.get(`/reservas/${id}`);
