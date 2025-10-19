import { validarNumeroAula, validarCapacidad, validarUbicacion, validarCantidadComputadoras, validarEstado, validarFiltros, hasErrors } from "../utils/validarAula";

// Aula tests Lunes enum 1..6 8:00 a 9:00

// Numero de aula tests

test("numero de aula valido", () => {
  expect(validarNumeroAula({numero: 150})).toBeNull();
});

test("numero de aula limites inclusivos", () => {
  expect(validarNumeroAula({numero: 1})).toBeNull();
  expect(validarNumeroAula({numero: 350})).toBeNull();
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

test("numero de aula con string numerico", () => {
  expect(validarNumeroAula({numero: "10"})).toBeNull();
});

// Capacidad tests

test("capacidad valida", () => {
  expect(validarCapacidad({capacidad: 30})).toBeNull();
});

test("capacidad limites inclusivos", () => {
  expect(validarCapacidad({capacidad: 1})).toBeNull();
  expect(validarCapacidad({capacidad: 100})).toBeNull();
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

test("capacidad con string numerico en limite superior valido", () => {
  expect(validarCapacidad({capacidad: "100"})).toBeNull();
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

test("ubicacion con puntos y guiones validos", () => {
  expect(validarUbicacion({ubicacion:"Pab. B-1.2"})).toBeNull();
});

// Cantidad de computadoras tests

test("cantidad de computadoras valida", () => {
  expect(validarCantidadComputadoras({computadoras: 20, capacidad: 20})).toBeNull();
});

test("cantidad de computadoras limite superior", () => {
  expect(validarCantidadComputadoras({computadoras: 50, capacidad: 80})).toBeNull();
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

test("cantidad de computadoras con string numerico", () => {
  expect(validarCantidadComputadoras({computadoras: "0", capacidad: 10})).toBeNull();
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

// validarFiltros tests

test("validarFiltros: todos validos", () => {
  const errors = validarFiltros({ ubicacion: "Edif A", capacidadMin: 10, computadorasMin: 5, diaSemana: 3, horaInicio: "08:00", horaFin: "09:00" });
  expect(hasErrors(errors)).toBe(false);
});

test("validarFiltros: invalid diaSemana y horas", () => {
  const errors = validarFiltros({ diaSemana: 0, horaInicio: "8:00", horaFin: "07:00" });
  expect(errors.diaSemana).toBe("El día debe ser Lunes a Sábado.");
  expect(errors.horaInicio).toBe("Formato HH:mm");
  // horaFin formato malo no se evalua como orden
  const errors2 = validarFiltros({ horaInicio: "08:00", horaFin: "07:00" });
  expect(errors2.horaFin).toBe("La hora fin debe ser mayor que inicio");
});

test("validarFiltros: computadoras exceden capacidad minima", () => {
  const errors = validarFiltros({ capacidadMin: 5, computadorasMin: 6 });
  expect(errors.computadorasMin).toBe("Las computadoras no deben exceder la capacidad del aula.");
});

test("hasErrors retorna true cuando hay algun error", () => {
  const errors = validarFiltros({ horaInicio: "08:00", horaFin: "07:00" });
  expect(hasErrors(errors)).toBe(true);
});