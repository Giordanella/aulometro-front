import { validarNumeroAula, validarCapacidad, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";

// Aula tests

// Numero de aula tests

test("numero de aula valido", () => {
  expect(validarNumeroAula(150)).toBeNull();
});

test("numero de aula invalido (negativo)", () => {
  expect(validarNumeroAula(-5)).toBe("El número de aula debe ser un entero positivo.");
});

test("numero de aula invalido (fuera de rango)", () => {
  expect(validarNumeroAula(400)).toBe("El número de aula debe estar entre 1 y 350.");
});

test("numero de aula invalido (no entero)", () => {
  expect(validarNumeroAula(25.5)).toBe("El número de aula debe ser un entero positivo.");
});

// Capacidad tests

test("capacidad valida", () => {
  expect(validarCapacidad(30)).toBeNull();
});

test("capacidad invalida (negativa)", () => {
  expect(validarCapacidad(-10)).toBe("La capacidad debe ser un entero positivo.");
});

test("capacidad invalida (fuera de rango)", () => {
  expect(validarCapacidad(150)).toBe("La capacidad debe estar entre 1 y 100.");
});

test("capacidad invalida (no entero)", () => {
  expect(validarCapacidad(20.5)).toBe("La capacidad debe ser un entero positivo.");
});

// Ubicacion tests

test("ubicacion valida", () => {
  expect(validarUbicacion("Edificio A, Piso 2")).toBeNull();
});

test("ubicacion vacia", () => {
  expect(validarUbicacion("")).toBe("La ubicación no puede estar vacía.");
});

test("ubicacion con caracteres invalidos", () => {
  expect(validarUbicacion("Edificio @123")).toBe("La ubicación contiene caracteres inválidos.");
});

// Cantidad de computadoras tests

test("cantidad de computadoras valida", () => {
  expect(validarCantidadComputadoras(20)).toBeNull();
});

test("cantidad de computadoras invalida (negativa)", () => {
  expect(validarCantidadComputadoras(-3)).toBe("La cantidad de computadoras debe ser un entero positivo.");
});

test("cantidad de computadoras invalida (fuera de rango)", () => {
  expect(validarCantidadComputadoras(60)).toBe("La cantidad de computadoras debe estar entre 0 y 50.");
});

test("cantidad de computadoras invalida (no entero)", () => {
  expect(validarCantidadComputadoras(10.5)).toBe("La cantidad de computadoras debe ser un entero positivo.");
});

// Estado tests

test("estado valido", () => {
  expect(validarEstado("disponible")).toBe(true);
  expect(validarEstado("ocupada")).toBe(true);
  expect(validarEstado("mantenimiento")).toBe(true);
});

test("estado invalido", () => {
  expect(validarEstado("cerrada")).toBe(false);
  expect(validarEstado("")).toBe(false);
});