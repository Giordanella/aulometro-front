const TIME_RX = /^\d{2}:\d{2}$/;

function validarDiaSemana(valor) {
  const d = Number(valor);
  if (!Number.isFinite(d)) {return "El día debe ser un número.";}
  if (d < 1 || d > 6) {return "El día debe ser Lunes a Sábado.";}
  return null;
}

function validarHoraInicio(valor) {
  if (!valor || !TIME_RX.test(valor)) {return "Formato HH:mm";}
  return null;
}

function validarHoraFin(horaInicio, horaFin) {
  if (!horaFin || !TIME_RX.test(horaFin)) {return "Formato HH:mm";}
  if (horaInicio && TIME_RX.test(horaInicio) && horaFin <= horaInicio) {
    return "La hora fin debe ser mayor que inicio";
  }
  return null;
}

export function validarReserva(formData = {}) {
  const errors = {
    diaSemana: null,
    horaInicio: null,
    horaFin: null,
    observaciones: null,
  };

  errors.diaSemana = validarDiaSemana(formData.diaSemana);
  errors.horaInicio = validarHoraInicio(formData.horaInicio);
  errors.horaFin = validarHoraFin(formData.horaInicio, formData.horaFin);

  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== null);
}

export const __internals__ = { TIME_RX, validarDiaSemana, validarHoraInicio, validarHoraFin };
