import { validarNombreUsuario, validarEmail, validarPassword, validarRole } from "../utils/validarUsuario";

// Usuario tests

// Nombre de usuario tests

test("nombre de usuario valido", () => {
  expect(validarNombreUsuario({name: "John Doe"})).toBeNull();
});

test("nombre de usuario vacio test", () => {
  expect(validarNombreUsuario({name: ""})).toBe("El nombre no puede estar vacío.");
});

test("nombre de usuario solo espacios", () => {
  expect(validarNombreUsuario({name: "   "})).toBe("El nombre no puede estar vacío.");
});

test("nombre de usuario muy corto", () => {
  expect(validarNombreUsuario({name: "Jo"})).toBe("El nombre debe tener entre 3 y 50 caracteres.");
});

test("nombre de usuario muy largo", () => {
  expect(validarNombreUsuario({name: "J".repeat(51)})).toBe("El nombre debe tener entre 3 y 50 caracteres.");
});

test("nombre de usuario con caracteres invalidos", () => {
  expect(validarNombreUsuario({name: "John123"})).toBe("El nombre solo puede contener letras y espacios.");
});

test("nombre de usuario con acentos y ñ", () => {
  expect(validarNombreUsuario({name: "José Ñandú"})).toBeNull();
});

// Email tests

test("email valido", () => {
  expect(validarEmail({email: "john_doe@gmail.com"})).toBeNull();
});

test("email vacio test", () => {
  expect(validarEmail({email: ""})).toBe("El correo electrónico no puede estar vacío.");
});

test("email muy corto", () => {
  expect(validarEmail({email: "a@b.c"})).toBe("El correo electrónico debe tener entre 5 y 100 caracteres.");
});

test("email muy largo", () => {
  expect(validarEmail({email: "a".repeat(91) + "@example.com"})).toBe("El correo electrónico debe tener entre 5 y 100 caracteres.");
});

test("email con formato invalido", () => {
  expect(validarEmail({email: "invalid-email"})).toBe("El correo electrónico no es válido.");
});

test("email con punto al final de local es invalido", () => {
  expect(validarEmail({email: "john.@gmail.com"})).toBe("El correo electrónico no es válido.");
});

// Password tests

test("password valido", () => {
  expect(validarPassword({password: "securePassword123"})).toBeNull();
});

test("password vacio test", () => {
  expect(validarPassword({password: ""})).toBe("La contraseña no puede estar vacía.");
});

test("password muy corta", () => {
  expect(validarPassword({password: "12345"})).toBe("La contraseña debe tener al menos 6 caracteres.");
});

test("password muy larga", () => {
  expect(validarPassword({password: "a".repeat(51)})).toBe("La contraseña no puede exceder los 50 caracteres.");
});

test("password con espacios permitidos", () => {
  expect(validarPassword({password: " 123456 "})).toBeNull();
});

// Role tests

test("role valido", () => {
  expect(validarRole({role: "DOCENTE"})).toBeNull();
  expect(validarRole({role: "DIRECTIVO"})).toBeNull();
});

test("role vacio test", () => {
  expect(validarRole({role: ""})).toBe("El rol no puede estar vacío.");
});

test("role muy corto", () => {
  expect(validarRole({role: "AD"})).toBe("El rol debe tener entre 3 y 20 caracteres.");
});

test("role muy largo", () => {
  expect(validarRole({role: "A".repeat(21)})).toBe("El rol debe tener entre 3 y 20 caracteres.");
});

test("role invalido", () => {
  expect(validarRole({role: "ADMIN"})).toBe("El rol debe ser 'DOCENTE' o 'DIRECTIVO'.");
});

test("role con espacios debe ser exacto", () => {
  expect(validarRole({role: " DOCENTE "})).toBe("El rol debe ser 'DOCENTE' o 'DIRECTIVO'.");
});