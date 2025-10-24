const TIME_RX = /^\d{2}:\d{2}$/;
const MIN_MINUTOS = 30;
const MAX_MINUTOS = 8 * 60; // 8 horas
const MAX_HORAS = MAX_MINUTOS / 60;

function minutosEntre(h1, h2) {
  // h1, h2 en formato HH:mm garantizado por TIME_RX
  const [h1h, h1m] = h1.split(":").map(Number);
  const [h2h, h2m] = h2.split(":").map(Number);
  return (h2h * 60 + h2m) - (h1h * 60 + h1m);
}

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

  // Validación de duración mínima y máxima solo si formatos están OK y fin>inicio
  if (!errors.horaInicio && !errors.horaFin) {
    const mins = minutosEntre(formData.horaInicio, formData.horaFin);
    if (mins < MIN_MINUTOS) {
      errors.horaFin = `La reserva debe durar al menos ${MIN_MINUTOS} minutos`;
    } else if (mins > MAX_MINUTOS) {
      errors.horaFin = `La reserva no puede durar más de ${MAX_HORAS} horas`;
    }
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== null);
}

export const __internals__ = { TIME_RX, validarDiaSemana, validarHoraInicio, validarHoraFin, minutosEntre, MIN_MINUTOS, MAX_MINUTOS, MAX_HORAS };
