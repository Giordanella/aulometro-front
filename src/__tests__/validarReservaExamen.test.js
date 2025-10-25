import { validarReservaExamen, hasErrors, __internals__ } from "../utils/validarReservaExamen";

test("reserva examen valida", () => {
  const errors = validarReservaExamen({ fecha: "2025-10-19", horaInicio: "10:00", horaFin: "12:00" });
  expect(hasErrors(errors)).toBe(false);
});

test("fecha requerida y formato", () => {
  expect(validarReservaExamen({ fecha: "", horaInicio: "08:00", horaFin: "09:00" }).fecha).toBe("La fecha es requerida.");
  expect(validarReservaExamen({ fecha: "19/10/2025", horaInicio: "08:00", horaFin: "09:00" }).fecha).toBe("La fecha no es válida.");
});

test("fecha invalida real (mes/dia)", () => {
  const errors = validarReservaExamen({ fecha: "2025-02-30", horaInicio: "08:00", horaFin: "09:00" });
  expect(errors.fecha).toBe("La fecha no es válida.");
});

test("hora fin mayor a inicio", () => {
  const errors = validarReservaExamen({ fecha: "2025-11-01", horaInicio: "09:00", horaFin: "08:59" });
  expect(errors.horaFin).toBe("La hora fin debe ser mayor que inicio");
});

test("hora formatos invalidos", () => {
  const e1 = validarReservaExamen({ fecha: "2025-11-01", horaInicio: "9:00", horaFin: "10:00" });
  expect(e1.horaInicio).toBe("Formato HH:mm");
  const e2 = validarReservaExamen({ fecha: "2025-11-01", horaInicio: "09:00", horaFin: "9:0" });
  expect(e2.horaFin).toBe("Formato HH:mm");
});

test("duración mínima de 30 minutos (examen)", () => {
  const errors = validarReservaExamen({ fecha: "2025-11-02", horaInicio: "10:00", horaFin: "10:20" });
  expect(errors.horaFin).toMatch(/al menos 30 minutos/i);
});

test("duración máxima de 6 horas (examen)", () => {
  const errors = validarReservaExamen({ fecha: "2025-11-03", horaInicio: "08:00", horaFin: "15:00" });
  expect(errors.horaFin).toMatch(/más de 6 horas/i);
});

test("internals TIME_RX requiere 2 digitos", () => {
  expect(__internals__.TIME_RX.test("07:05")).toBe(true);
  expect(__internals__.TIME_RX.test("7:5")).toBe(false);
});
