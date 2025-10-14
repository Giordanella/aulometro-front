import { useFormulario } from "../hooks/useFormulario";
import { createReservaExamen } from "../api/reservas";
import BotonPrimario from "./BotonPrimario";
import CamposReservaExamen from "./CamposReservaExamen";
import CampoFormulario from "./CampoFormulario";
import "./styles/FormularioReserva.css";

const TIME_RX = /^\d{2}:\d{2}$/;
const DATE_RX = /^\d{4}-\d{2}-\d{2}$/;

export default function FormularioReservaExamen({
  aulaId,
  onOk,
  onCancel,
  titulo = "Solicitar reserva de examen",
}) {
  // Validadores (para examen NO pedimos disponibilidad)
  const validators = {
    fecha: (fd) => (DATE_RX.test(fd.fecha) ? null : "Fecha inválida (YYYY-MM-DD)"),
    horaInicio: (fd) => (TIME_RX.test(fd.horaInicio) ? null : "Formato HH:mm"),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "La hora de inicio no puede ser posterior o igual a la hora de fin";}
      return null;
    },
    // materia/mesa opcionales; si querés hacerlos obligatorios, validalos acá
    // materia: (fd) => (!fd.materia ? "Materia obligatoria" : null),
    // mesa: (fd) => (!fd.mesa ? "Mesa obligatoria" : null),
  };

  const submitFunc = async (fd) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const payload = {
      aulaId: Number(aulaId),
      fecha: fd.fecha,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      materia: fd.materia || undefined,
      mesa: fd.mesa || undefined,
      observaciones: fd.observaciones || undefined,
    };
    const [resp] = await Promise.all([
      createReservaExamen(payload),
      delay(800), // mínimo tiempo visible de "Enviando..."
    ]);
    return resp;
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    submitting,
    handleChange,
    handleSubmit,
  } = useFormulario(
    {
      fecha: "",
      horaInicio: "08:00",
      horaFin: "10:00",
      materia: "",
      mesa: "",
      observaciones: "",
    },
    submitFunc,
    (reservaCreada) => {
      setTimeout(() => onOk?.(reservaCreada), 1800);
    },
    validators,
    { resetOnSuccess: false }
  );

  return (
    <div className="form-center">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{titulo}</h2>

      
          <CamposReservaExamen
            formData={formData}
            handleChange={handleChange}
            errores={errores}
          />

       
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
              {submitting ? "Enviando..." : "Solicitar"}
            </BotonPrimario>
            <BotonPrimario type="button" className="btn" onClick={onCancel}>
              Cancelar
            </BotonPrimario>
          </div>

          {mensaje && (
            <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>
          )}
        </form>
      </div>
    </div>
  );
}
