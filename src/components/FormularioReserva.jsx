import { useState } from "react";
import { useFormulario } from "../hooks/useFormulario";
import { createReserva, getDisponibilidad } from "../api/reservas";
import BotonPrimario from "./BotonPrimario";
import CamposReserva from "./CamposReserva";
import "./styles/FormularioReserva.css";

const TIME_RX = /^\d{2}:\d{2}$/;

export default function FormularioReserva({
  aulaId,
  aulaNumero,
  onOk,
  onCancel,
  titulo = "Solicitar reserva",
}) {
  // Estado de disponibilidad
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null); // null sin chequear, true/false resultado
  const [msgDisp, setMsgDisp] = useState("");

  // Validadores
  const validators = {
    diaSemana: (fd) =>
      fd.diaSemana >= 1 && fd.diaSemana <= 6 ? null : "Solo Lunes a Sábado",
    horaInicio: (fd) => (TIME_RX.test(fd.horaInicio) ? null : "Formato HH:mm"),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "Fin > Inicio";}
      return null;
    },
  };

  const submitFunc = async (fd) => {
    if (available !== true) {throw new Error("Primero chequeá disponibilidad.");}
    return createReserva({
      aulaId: Number(aulaId),
      diaSemana: fd.diaSemana,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      observaciones: fd.observaciones || undefined,
    });
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit,
  } = useFormulario(
    { diaSemana: 1, horaInicio: "08:00", horaFin: "10:00", observaciones: "" },
    submitFunc,
    (reservaCreada) => onOk?.(reservaCreada),
    validators,
    { resetOnSuccess: false }
  );

  // Cada cambio invalida el último chequeo
  const handleChangeInvalidate = (e) => {
    handleChange(e);
    setAvailable(null);
    setMsgDisp("");
  };

  async function chequearDisponibilidad() {
    // validamos rápido antes de llamar al GET
    const tieneErrores =
      validators.diaSemana(formData) ||
      validators.horaInicio(formData) ||
      validators.horaFin(formData);
    if (tieneErrores) {return;}

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

  return (
    <div className="form-center">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{titulo}</h2>

          <CamposReserva
            formData={formData}
            handleChange={handleChangeInvalidate}
            errores={errores}
            aulaNumero={aulaNumero}
          />

          <div
            className="form-actions"
            style={{ display: "flex", gap: 8, marginTop: 8 }}
          >
            <BotonPrimario
              type="button"
              onClick={chequearDisponibilidad}
              disabled={checking}
            >
              {checking ? "Chequeando..." : "Chequear disponibilidad"}
            </BotonPrimario>

            <BotonPrimario type="submit" disabled={available !== true}>
              Solicitar
            </BotonPrimario>

            <BotonPrimario type="button" className="btn" onClick={onCancel}>
              Cancelar
            </BotonPrimario>
          </div>

          {/* Mensajes en el estilo del Alta */}
          {msgDisp && (
            <p
              className={`form-message ${available === true ? "success" : "error"}`}
            >
              {msgDisp}
            </p>
          )}
          {mensaje && (
            <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>
          )}
        </form>
      </div>
    </div>
  );
}
