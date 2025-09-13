function validarNumeroPositivo(valor) {
  return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

export function validarNumeroAula(numero) {
  if (!validarNumeroPositivo(numero)) {return "El número de aula debe ser un entero positivo.";}
  if (numero < 1 || numero > 350) {return "El número de aula debe estar entre 1 y 350.";}
  return null;
}

export function validarCapacidad(capacidad) {
  if (!validarNumeroPositivo(capacidad)) {return "La capacidad debe ser un entero positivo.";}
  if (capacidad < 1 || capacidad > 100) {return "La capacidad debe estar entre 1 y 100.";}
  return null;
}

export function validarUbicacion(ubicacion) {
  const regex = /^[a-zA-Z0-9\s,.-]+$/;
  if (!ubicacion || ubicacion.trim().length === 0) {return "La ubicación no puede estar vacía.";}
  if (!regex.test(ubicacion)) {return "La ubicación contiene caracteres inválidos.";}
  return null;
}

export function validarCantidadComputadoras(cantidad) {
  if (!validarNumeroPositivo(cantidad)) {return "La cantidad de computadoras debe ser un entero positivo.";}
  if (cantidad < 0 || cantidad > 50) {return "La cantidad de computadoras debe estar entre 0 y 50.";}
  return null;
}

export function validarEstado(estado) {
  const estadosValidos = ["disponible", "ocupada", "mantenimiento"];
  return estadosValidos.includes(estado);
}