const TIME_RX = /^\d{2}:\d{2}$/;
const MIN_MINUTOS_EX = 30;
const MAX_MINUTOS_EX = 6 * 60; // 6 horas
const MAX_HORAS_EX = MAX_MINUTOS_EX / 60;

function minutosEntre(h1, h2) {
  const [h1h, h1m] = h1.split(":").map(Number);
  const [h2h, h2m] = h2.split(":").map(Number);
  return (h2h * 60 + h2m) - (h1h * 60 + h1m);
}

function validarFecha(valor) {
  if (!valor) {return "La fecha es requerida.";}
  // Acepta formato YYYY-MM-DD (input type=date)
  const rx = /^\d{4}-\d{2}-\d{2}$/;
  if (!rx.test(valor)) {return "La fecha no es válida.";}
  // Comprobar fecha real
  const d = new Date(valor);
  const [y, m, day] = valor.split("-").map(Number);
  if (
    !Number.isFinite(d.getTime()) ||
    d.getUTCFullYear() !== y ||
    d.getUTCMonth() + 1 !== m ||
    d.getUTCDate() !== day
  ) {
    return "La fecha no es válida.";
  }
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

export function validarReservaExamen(formData = {}) {
  const errors = {
    fecha: null,
    horaInicio: null,
    horaFin: null,
    observaciones: null,
  };

  errors.fecha = validarFecha(formData.fecha);
  errors.horaInicio = validarHoraInicio(formData.horaInicio);
  errors.horaFin = validarHoraFin(formData.horaInicio, formData.horaFin);

  // Validar duración mínima y máxima para examen si horas son válidas
  if (!errors.horaInicio && !errors.horaFin) {
    const mins = minutosEntre(formData.horaInicio, formData.horaFin);
    if (mins < MIN_MINUTOS_EX) {
      errors.horaFin = `La reserva de examen debe durar al menos ${MIN_MINUTOS_EX} minutos`;
    } else if (mins > MAX_MINUTOS_EX) {
      errors.horaFin = `La reserva de examen no puede durar más de ${MAX_HORAS_EX} horas`;
    }
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== null);
}

export const __internals__ = { TIME_RX, validarFecha, validarHoraInicio, validarHoraFin, minutosEntre, MIN_MINUTOS_EX, MAX_MINUTOS_EX, MAX_HORAS_EX };
