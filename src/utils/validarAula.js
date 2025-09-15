function validarNumeroNoNegativo(valor) {
  return Number.isInteger(Number(valor)) && Number(valor) >= 0;
}

export function validarNumeroAula(formData) {
  console.log(formData);
  if (!validarNumeroNoNegativo(formData.numero)) {return "El número de aula debe ser un número entero no negativo.";}
  if (formData.numero < 1 || formData.numero > 350) {return "El número de aula debe estar entre 1 y 350.";}
  return null;
}

export function validarCapacidad(formData) {
  if (!validarNumeroNoNegativo(formData.capacidad)) {return "La capacidad debe ser un número entero no negativo.";}
  if (formData.capacidad < 1 || formData.capacidad > 100) {return "La capacidad debe estar entre 1 y 100.";}
  return null;
}

export function validarUbicacion(formData) {
  const regex = /^[a-zA-Z0-9\s,.-]+$/;
  if (!formData.ubicacion || formData.ubicacion.trim().length === 0) {return "La ubicación no puede estar vacía.";}
  if (!regex.test(formData.ubicacion)) {return "La ubicación contiene caracteres inválidos.";}
  return null;
}

export function validarCantidadComputadoras(formData) {
  if (!validarNumeroNoNegativo(formData.computadoras)) {return "La cantidad de computadoras debe ser un número entero no negativo.";}
  if (formData.computadoras < 0 || formData.computadoras > 50) {return "La cantidad de computadoras debe estar entre 0 y 50.";}
  if (formData.computadoras > formData.capacidad) {return "La cantidad de computadoras no puede ser mayor que la capacidad del aula.";}
  return null;
}

export function validarEstado(formData) {
  const estadosValidos = ["disponible", "ocupada", "mantenimiento"];
  if(!estadosValidos.includes(formData.estado)) {return "El estado debe ser 'disponible', 'ocupada' o 'mantenimiento'.";}
  return null;
}