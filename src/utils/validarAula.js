function validarNumeroNoNegativo(valor) {
  return Number.isInteger(Number(valor)) && Number(valor) >= 0;
}

export function validarNumeroAula(formData) {
  if (!validarNumeroNoNegativo(formData.numero)) {
    return "El número de aula debe ser un número entero no negativo.";
  }
  if (formData.numero < 1 || formData.numero > 350) {
    return "El número de aula debe estar entre 1 y 350.";
  }
  return null;
}

export function validarCapacidad(formData) {
  if (!validarNumeroNoNegativo(formData.capacidad)) {
    return "La capacidad debe ser un número entero no negativo.";
  }
  if (formData.capacidad < 1 || formData.capacidad > 100) {
    return "La capacidad debe estar entre 1 y 100.";
  }
  return null;
}

export function validarUbicacion(formData) {
  const regex = /^[a-zA-Z0-9\s,.\-ñÑºáéíóúÁÉÍÓÚ]+$/;
  if (!formData.ubicacion || formData.ubicacion.trim().length === 0) {
    return "La ubicación no puede estar vacía.";
  }
  if (!regex.test(formData.ubicacion)) {
    return "La ubicación contiene caracteres inválidos.";
  }
  return null;
}

export function validarCantidadComputadoras(formData) {
  if (!validarNumeroNoNegativo(formData.computadoras)) {
    return "Las computadoras deben ser un número entero no negativo.";
  }
  if (formData.computadoras < 0 || formData.computadoras > 50) {
    return "La cantidad de computadoras debe estar entre 0 y 50.";
  }
  if (formData.capacidad && formData.computadoras > formData.capacidad) {
    return "Las computadoras no deben exceder la capacidad del aula.";
  }
  return null;
}

export function validarEstado(formData) {
  const estadosValidos = ["disponible", "ocupada", "mantenimiento"];
  if (!estadosValidos.includes(formData.estado)) {
    return "El estado debe ser 'disponible', 'ocupada' o 'mantenimiento'.";
  }
  return null;
}

const TIME_RX = /^\d{2}:\d{2}$/;

export function validarFiltros(filters = {}) {
  const errors = {};

  if (filters.ubicacion) {
    errors.ubicacion = validarUbicacion({ ubicacion: filters.ubicacion });
  }
  if (filters.capacidadMin !== "" && filters.capacidadMin !== undefined) {
    errors.capacidadMin = validarCapacidad({ capacidad: filters.capacidadMin });
  }
  if (filters.computadorasMin !== "" && filters.computadorasMin !== undefined) {
    errors.computadorasMin = validarCantidadComputadoras({
      computadoras: filters.computadorasMin,
      capacidad: filters.capacidadMin,
    });
  }

  if (filters.diaSemana !== "" && filters.diaSemana !== undefined) {
    const d = Number(filters.diaSemana);
    if (!Number.isFinite(d) || d < 1 || d > 6) {
      errors.diaSemana = "El día debe ser Lunes a Sábado.";
    }
  }

  const hi = filters.horaInicio;
  const hf = filters.horaFin;
  if ((hi && !TIME_RX.test(hi)) || (hf && !TIME_RX.test(hf))) {
    if (hi && !TIME_RX.test(hi)) {errors.horaInicio = "Formato HH:mm";}
    if (hf && !TIME_RX.test(hf)) {errors.horaFin = "Formato HH:mm";}
  } else if (hi && hf) {
    if (hf <= hi) {errors.horaFin = "La hora fin debe ser mayor que inicio";}
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== null);
}
