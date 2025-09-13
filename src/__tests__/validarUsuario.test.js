import { validarNombreUsuario, validarEmail, validarPassword, validarRole } from "../utils/validarUsuario";

// Usuario tests

// Nombre de usuario tests

test("nombre de usuario valido", () => {
  expect(validarNombreUsuario("John Doe")).toBeNull();
});

test("nombre de usuario vacio test", () => {
  expect(validarNombreUsuario("")).toBe("El nombre no puede estar vacío.");
});

test("nombre de usuario muy corto", () => {
  expect(validarNombreUsuario("Jo")).toBe("El nombre debe tener entre 3 y 50 caracteres.");
});

test("nombre de usuario muy largo", () => {
  expect(validarNombreUsuario("J".repeat(51))).toBe("El nombre debe tener entre 3 y 50 caracteres.");
});

test("nombre de usuario con caracteres invalidos", () => {
  expect(validarNombreUsuario("John123")).toBe("El nombre solo puede contener letras y espacios.");
});

// Email tests

test("email valido", () => {
  expect(validarEmail("john_doe@gmail.com")).toBeNull();
});

test("email vacio test", () => {
  expect(validarEmail("")).toBe("El correo electrónico no puede estar vacío.");
});

test("email muy corto", () => {
  expect(validarEmail("a@b.c")).toBe("El correo electrónico debe tener entre 5 y 100 caracteres.");
});

test("email muy largo", () => {
  expect(validarEmail("a".repeat(91) + "@example.com")).toBe("El correo electrónico debe tener entre 5 y 100 caracteres.");
});

test("email con formato invalido", () => {
  expect(validarEmail("invalid-email")).toBe("El correo electrónico no es válido.");
});

// Password tests

test("password valido", () => {
  expect(validarPassword("securePassword123")).toBeNull();
});

test("password vacio test", () => {
  expect(validarPassword("")).toBe("La contraseña no puede estar vacía.");
});

test("password muy corta", () => {
  expect(validarPassword("12345")).toBe("La contraseña debe tener al menos 6 caracteres.");
});

test("password muy larga", () => {
  expect(validarPassword("a".repeat(51))).toBe("La contraseña no puede exceder los 50 caracteres.");
});

// Role tests

test("role valido", () => {
  expect(validarRole("DOCENTE")).toBeNull();
  expect(validarRole("DIRECTIVO")).toBeNull();
});

test("role vacio test", () => {
  expect(validarRole("")).toBe("El rol no puede estar vacío.");
});

test("role muy corto", () => {
  expect(validarRole("AD")).toBe("El rol debe tener entre 3 y 20 caracteres.");
});

test("role muy largo", () => {
  expect(validarRole("A".repeat(21))).toBe("El rol debe tener entre 3 y 20 caracteres.");
});

test("role invalido", () => {
  expect(validarRole("ADMIN")).toBe("El rol debe ser 'DOCENTE' o 'DIRECTIVO'.");
});