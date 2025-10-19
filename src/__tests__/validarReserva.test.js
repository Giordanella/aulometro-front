import { validarReserva, hasErrors, __internals__ } from "../utils/validarReserva";

test("reserva valida", () => {
  const errors = validarReserva({ diaSemana: 3, horaInicio: "08:00", horaFin: "09:00" });
  expect(hasErrors(errors)).toBe(false);
});

test("diaSemana fuera de rango", () => {
  const errors = validarReserva({ diaSemana: 7, horaInicio: "08:00", horaFin: "09:00" });
  expect(errors.diaSemana).toBe("El día debe ser Lunes a Sábado.");
});

test("diaSemana no numero", () => {
  const errors = validarReserva({ diaSemana: "abc", horaInicio: "08:00", horaFin: "09:00" });
  expect(errors.diaSemana).toBe("El día debe ser un número.");
});

test("horaInicio formato invalido", () => {
  const errors = validarReserva({ diaSemana: 1, horaInicio: "8:00", horaFin: "09:00" });
  expect(errors.horaInicio).toBe("Formato HH:mm");
});

test("horaFin formato invalido", () => {
  const errors = validarReserva({ diaSemana: 2, horaInicio: "08:00", horaFin: "9:00" });
  expect(errors.horaFin).toBe("Formato HH:mm");
});

test("horaFin debe ser mayor que inicio", () => {
  const errors = validarReserva({ diaSemana: 2, horaInicio: "09:00", horaFin: "09:00" });
  expect(errors.horaFin).toBe("La hora fin debe ser mayor que inicio");
});

test("internals TIME_RX coincide con 2 digitos", () => {
  expect(__internals__.TIME_RX.test("00:00")).toBe(true);
  expect(__internals__.TIME_RX.test("0:00")).toBe(false);
});
