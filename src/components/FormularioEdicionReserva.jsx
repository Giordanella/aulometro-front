import { useFormulario } from "../hooks/useFormulario";
import { actualizarReserva, getDisponibilidad } from "../api/reservas";
import BotonPrimario from "./BotonPrimario";
import CamposReserva from "./CamposReserva";
import "./styles/FormularioReserva.css";

const TIME_RX = /^\d{2}:\d{2}$/;

export default function FormularioEdicionReserva({
  reserva,
  onOk,
  onCancel,
  titulo = "Editar reserva",
}) {
  const validators = {
    diaSemana: (fd) => (fd.diaSemana >= 1 && fd.diaSemana <= 6 ? null : "Solo Lunes a Sábado"),
    horaInicio: (fd) => (TIME_RX.test(fd.horaInicio) ? null : "Formato HH:mm"),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "La hora de inicio no puede ser posterior o igual a la hora de fin";}
      return null;
    },
  };

  const submitFunc = async (fd) => {
    // opcional: chequear disponibilidad como en alta
    const { data } = await getDisponibilidad({
      aulaId: reserva.aulaId,
      diaSemana: fd.diaSemana,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
    });
    if (!data.available) {throw new Error("No disponible en ese horario.");}

    const payload = {
      diaSemana: fd.diaSemana,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      observaciones: fd.observaciones || undefined,
    };
    const resp = await actualizarReserva(reserva.id, payload);
    return resp?.data ?? resp;
  };

  const { formData, errores, mensaje, tipoMensaje, submitting, handleChange, handleSubmit } =
    useFormulario(
      {
        diaSemana: reserva.diaSemana,
        horaInicio: reserva.horaInicio?.slice(0, 5) || "",
        horaFin: reserva.horaFin?.slice(0, 5) || "",
        observaciones: reserva.observaciones || "",
      },
      submitFunc,
      (r) => onOk?.(r),
      validators,
      { resetOnSuccess: false }
    );

  return (
    <div className="form-center">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{titulo}</h2>

          <CamposReserva formData={formData} handleChange={handleChange} errores={errores} />

          <div className="form-actions" style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <BotonPrimario type="submit" disabled={submitting}>
              {submitting ? "Guardando..." : "Guardar"}
            </BotonPrimario>
            <BotonPrimario type="button" className="btn" onClick={onCancel}>
              Cancelar
            </BotonPrimario>
          </div>

          {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
        </form>
      </div>
    </div>
  );
}
