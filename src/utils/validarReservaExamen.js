const TIME_RX = /^\d{2}:\d{2}$/;

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

  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== null);
}

export const __internals__ = { TIME_RX, validarFecha, validarHoraInicio, validarHoraFin };
