import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import CampoFormulario from "./CampoFormulario";
import { createReserva, getDisponibilidad } from "../api/reservas";
import { useFormulario } from "../hooks/useFormulario";

// Lunes (1) a Sábado (6). Domingo (7) eliminado del sistema.
const DIAS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

const TIME_RX = /^\d{2}:\d{2}$/;

export default function FormReserva({
  aulaId,
  onOk,
  onCancel,
  asModal = true,
  titulo = "Solicitar reserva",
}) {
  // Estado de disponibilidad
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [msgDisp, setMsgDisp] = useState("");

  // Validadores
  const validators = {
    aulaId: () => (!aulaId ? "Aula inválida" : null),
    diaSemana: (fd) => {
      if (!(fd.diaSemana >= 1 && fd.diaSemana <= 6))
      {return "Solo se admiten reservas de Lunes a Sábado";}
      return null;
    },
    horaInicio: (fd) => (!TIME_RX.test(fd.horaInicio) ? "Formato HH:mm" : null),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "La hora fin debe ser mayor que inicio";}
      return null;
    },
  };

  const submitFunc = async (fd) => {
    if (available !== true) {
      throw new Error("Chequear disponibilidad de aula.");
    }
    const payload = {
      aulaId: Number(aulaId),
      diaSemana: fd.diaSemana,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      observaciones: fd.observaciones || undefined,
    };
    return createReserva(payload);
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit,
  } = useFormulario(
    // initialState
    { diaSemana: 1, horaInicio: "08:00", horaFin: "10:00", observaciones: "" },

    submitFunc,

    (reservaCreada) => {
      onOk?.(reservaCreada);
    },

    validators,

    { resetOnSuccess: false }
  );

  // Cada cambio invalida el chequeo anterior
  const onChangeInvalidate = (e) => {
    handleChange(e);
    setAvailable(null);
    setMsgDisp("");
  };

  async function chequearDisponibilidad() {
    const tieneErrores =
      validators.aulaId(formData) ||
      validators.diaSemana(formData) ||
      validators.horaInicio(formData) ||
      validators.horaFin(formData);

    if (tieneErrores) {return;} // los errores ya los muestra el hook

    setChecking(true);
    setMsgDisp("");
    try {
      const { data } = await getDisponibilidad({
        aulaId,
        diaSemana: formData.diaSemana,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
      });
      setAvailable(data.available);
      setMsgDisp(
        data.available ? "Disponible ✔️" : "No disponible en ese horario."
      );
    } catch (e) {
      setAvailable(null);
      setMsgDisp(e?.response?.data?.error || e.message || "Error al chequear");
    } finally {
      setChecking(false);
    }
  }

  const contenido = (
    <form onSubmit={handleSubmit} className="p-4">
      <h3 className="text-lg font-semibold mb-3">{titulo}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <CampoFormulario
          placeholder="Día de la semana"
          name="diaSemana"
          type="select"
          value={formData.diaSemana}
          onChange={onChangeInvalidate}
          error={errores.diaSemana}
        >
          {DIAS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </CampoFormulario>

        <CampoFormulario
          placeholder="Aula ID"
          name="aulaId"
          type="number"
          value={aulaId}
          readOnly
          error={errores.aulaId}
        />

        <CampoFormulario
          placeholder="Hora inicio (HH:mm)"
          name="horaInicio"
          type="time"
          value={formData.horaInicio}
          onChange={onChangeInvalidate}
          error={errores.horaInicio}
        />

        <CampoFormulario
          placeholder="Hora fin (HH:mm)"
          name="horaFin"
          type="time"
          value={formData.horaFin}
          onChange={onChangeInvalidate}
          error={errores.horaFin}
        />
      </div>

      <label className="form-label mt-3 block">
        <span className="block mb-1">Observaciones (opcional)</span>
        <textarea
          name="observaciones"
          className="form-input w-full"
          rows={3}
          value={formData.observaciones}
          onChange={onChangeInvalidate}
        />
      </label>

      {/* Mensajes de disponibilidad y del hook */}
      {msgDisp && (
        <p
          className={`mt-2 text-sm ${available === true ? "text-green-600" : "text-red-600"}`}
        >
          {msgDisp}
        </p>
      )}
      {mensaje && (
        <p
          className={`mt-1 text-sm ${tipoMensaje === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {mensaje}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        <BotonPrimario
          type="button"
          onClick={chequearDisponibilidad}
          disabled={checking}
        >
          {checking ? "Chequeando..." : "Chequear disponibilidad"}
        </BotonPrimario>

        {/* Botón deshabilitado hasta que la disponibilidad sea true */}
        <BotonPrimario type="submit" disabled={available !== true}>
          Solicitar
        </BotonPrimario>

        <button type="button" className="btn" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );

  if (!asModal) {return contenido;}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        {contenido}
      </div>
    </div>
  );
}
