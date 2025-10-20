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
export const actualizarReserva = (id, data) => api.put(`/reservas/${id}`, data);

export const getDisponibilidad = (params) =>
  api.get("/reservas/disponibilidad", { params });

export const getReservaById = (id) => api.get(`/reservas/${id}`);

export function createReservaExamen(payload) {
  return api.post("/reservas/examen", payload);
}

export const aprobarReservaExamen = (id) => api.post(`/reservas/examen/${id}/aprobar`);
export const rechazarReservaExamen = (id, motivo) => api.post(`/reservas/examen/${id}/rechazar`, { motivo });
export const cancelarReservaExamen = (id) => api.post(`/reservas/examen/${id}/cancelar`);
export const actualizarReservaExamen = (id, data) => api.put(`/reservas/examen/${id}`, data);

export const getReservasAprobadasPorAula = (nombreAula) => api.get(`/reservas/aulas/${nombreAula}/aprobadas`);
export const getReservasExamenAprobadasPorAula = (nombreAula) => api.get(`/reservas/examen/aulas/${nombreAula}/aprobadas`);

export const liberarReserva = (id) => api.post(`/reservas/${id}/liberar`);
export const liberarReservaExamen = (id) => api.post(`/reservas/examen/${id}/liberar`);
