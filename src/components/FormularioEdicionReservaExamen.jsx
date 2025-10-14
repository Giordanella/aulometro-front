import { useFormulario } from "../hooks/useFormulario";
import { actualizarReservaExamen } from "../api/reservas";
import BotonPrimario from "./BotonPrimario";
import CamposReservaExamen from "./CamposReservaExamen";
import CampoFormulario from "./CampoFormulario";
import "./styles/FormularioReserva.css";

const TIME_RX = /^\d{2}:\d{2}$/;
const DATE_RX = /^\d{4}-\d{2}-\d{2}$/;

export default function FormularioEdicionReservaExamen({
  reserva,
  onOk,
  onCancel,
  titulo = "Editar reserva de examen",
}) {
  const validators = {
    fecha: (fd) => (DATE_RX.test(fd.fecha) ? null : "Fecha inválida (YYYY-MM-DD)"),
    horaInicio: (fd) => (TIME_RX.test(fd.horaInicio) ? null : "Formato HH:mm"),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "La hora de inicio no puede ser posterior o igual a la hora de fin";}
      return null;
    },
  };

  const submitFunc = async (fd) => {
    const payload = {
      fecha: fd.fecha,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      materia: fd.materia || undefined,
      mesa: fd.mesa || undefined,
      observaciones: fd.observaciones || undefined,
    };
    const resp = await actualizarReservaExamen(reserva.id, payload);
    return resp?.data ?? resp;
  };

  const { formData, errores, mensaje, tipoMensaje, submitting, handleChange, handleSubmit } =
    useFormulario(
      {
        fecha: reserva.fecha || "",
        horaInicio: reserva.horaInicio?.slice(0, 5) || "",
        horaFin: reserva.horaFin?.slice(0, 5) || "",
        materia: reserva.materia || "",
        mesa: reserva.mesa || "",
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

          <CamposReservaExamen formData={formData} handleChange={handleChange} errores={errores} />

          <CampoFormulario
            label="Materia"
            name="materia"
            placeholder="Ej: Álgebra I"
            value={formData.materia}
            onChange={handleChange}
            error={errores.materia}
          />

          <CampoFormulario
            label="Mesa"
            name="mesa"
            placeholder="Ej: Octubre - 1er llamado"
            value={formData.mesa}
            onChange={handleChange}
            error={errores.mesa}
          />

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
