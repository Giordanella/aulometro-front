import { validarNumeroAula, validarCapacidad, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";

// Aula tests Lunes enum 1..6 8:00 a 9:00

// Numero de aula tests

test("numero de aula valido", () => {
  expect(validarNumeroAula({numero: 150})).toBeNull();
});

test("numero de aula invalido (negativo)", () => {
  expect(validarNumeroAula({numero: -5})).toBe("El número de aula debe ser un número entero no negativo.");
});

test("numero de aula invalido (fuera de rango)", () => {
  expect(validarNumeroAula({numero: 400})).toBe("El número de aula debe estar entre 1 y 350.");
});

test("numero de aula invalido (no entero)", () => {
  expect(validarNumeroAula({numero: 25.5})).toBe("El número de aula debe ser un número entero no negativo.");
});

// Capacidad tests

test("capacidad valida", () => {
  expect(validarCapacidad({capacidad: 30})).toBeNull();
});

test("capacidad invalida (negativa)", () => {
  expect(validarCapacidad({capacidad: -10})).toBe("La capacidad debe ser un número entero no negativo.");
});

test("capacidad invalida (fuera de rango)", () => {
  expect(validarCapacidad({capacidad: 150})).toBe("La capacidad debe estar entre 1 y 100.");
});

test("capacidad invalida (no entero)", () => {
  expect(validarCapacidad({capacidad: 20.5})).toBe("La capacidad debe ser un número entero no negativo.");
});

// Ubicacion tests

test("ubicacion valida", () => {
  expect(validarUbicacion({ubicacion:"Edificio A, Piso 2"})).toBeNull();
});

test("ubicacion vacia", () => {
  expect(validarUbicacion({ubicacion:""})).toBe("La ubicación no puede estar vacía.");
});

test("ubicacion con caracteres invalidos", () => {
  expect(validarUbicacion({ubicacion:"Edificio @123"})).toBe("La ubicación contiene caracteres inválidos.");
});

// Cantidad de computadoras tests

test("cantidad de computadoras valida", () => {
  expect(validarCantidadComputadoras({computadoras: 20, capacidad: 20})).toBeNull();
});

test("cantidad de computadoras invalida (negativa)", () => {
  expect(validarCantidadComputadoras({computadoras: -3, capacidad: 20})).toBe("Las computadoras deben ser un número entero no negativo.");
});

test("cantidad de computadoras invalida (fuera de rango)", () => {
  expect(validarCantidadComputadoras({computadoras: 60, capacidad: 80})).toBe("La cantidad de computadoras debe estar entre 0 y 50.");
});

test("cantidad de computadoras invalida (no entero)", () => {
  expect(validarCantidadComputadoras({computadoras: 10.5, capacidad: 20})).toBe("Las computadoras deben ser un número entero no negativo.");
});

test("cantidad de computadoras mayor que capacidad", () => {
  expect(validarCantidadComputadoras({computadoras: 25, capacidad: 20})).toBe("Las computadoras no deben exceder la capacidad del aula.");
});

// Estado tests

test("estado valido", () => {
  expect(validarEstado({estado: "disponible"})).toBe(null);
  expect(validarEstado({estado: "ocupada"})).toBe(null);
  expect(validarEstado({estado: "mantenimiento"})).toBe(null);
});

test("estado invalido", () => {
  expect(validarEstado({estado: "cerrada"})).toBe("El estado debe ser 'disponible', 'ocupada' o 'mantenimiento'.");
  expect(validarEstado({estado: ""})).toBe("El estado debe ser 'disponible', 'ocupada' o 'mantenimiento'.");
});