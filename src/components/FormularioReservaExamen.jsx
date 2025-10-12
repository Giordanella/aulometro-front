import { useFormulario } from "../hooks/useFormulario";
import { createReservaExamen } from "../api/reservas";
import BotonPrimario from "./BotonPrimario";
import CamposReserva from "./CamposReserva";
import "./styles/FormularioReserva.css";

const TIME_RX = /^\d{2}:\d{2}$/;

export default function FormularioReservaExamen({
  aulaId,
  aulaNumero,
  onOk,
  onCancel,
  titulo = "Solicitar reserva de examen",
}) {
  // Validadores (para examen NO pedimos disponibilidad)
  const validators = {
    diaSemana: (fd) =>
      fd.diaSemana >= 1 && fd.diaSemana <= 7 ? null : "Día 1..7 (Lun..Dom)",
    horaInicio: (fd) => (TIME_RX.test(fd.horaInicio) ? null : "Formato HH:mm"),
    horaFin: (fd) => {
      if (!TIME_RX.test(fd.horaFin)) {return "Formato HH:mm";}
      if (TIME_RX.test(fd.horaInicio) && fd.horaFin <= fd.horaInicio)
      {return "Fin > Inicio";}
      return null;
    },
    // materia/mesa opcionales; si querés hacerlos obligatorios, validalos acá
    // materia: (fd) => (!fd.materia ? "Materia obligatoria" : null),
    // mesa: (fd) => (!fd.mesa ? "Mesa obligatoria" : null),
  };

  const submitFunc = async (fd) => {
    return createReservaExamen({
      aulaId: Number(aulaId),
      diaSemana: fd.diaSemana,
      horaInicio: fd.horaInicio,
      horaFin: fd.horaFin,
      materia: fd.materia || undefined,
      mesa: fd.mesa || undefined,
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
    {
      diaSemana: 1,
      horaInicio: "08:00",
      horaFin: "10:00",
      materia: "",
      mesa: "",
      observaciones: "",
    },
    submitFunc,
    (reservaCreada) => onOk?.(reservaCreada),
    validators,
    { resetOnSuccess: false }
  );

  return (
    <div className="form-center">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{titulo}</h2>

      
          <CamposReserva
            formData={formData}
            handleChange={handleChange}
            errores={errores}
            aulaNumero={aulaNumero}
          />

       
          <div className="form-field">
            <label htmlFor="materia">Materia</label>
            <input
              id="materia"
              name="materia"
              value={formData.materia}
              onChange={handleChange}
              placeholder="Ej: Álgebra I"
            />
            {errores.materia && <span className="error">{errores.materia}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="mesa">Mesa</label>
            <input
              id="mesa"
              name="mesa"
              value={formData.mesa}
              onChange={handleChange}
              placeholder="Ej: Octubre - 1er llamado"
            />
            {errores.mesa && <span className="error">{errores.mesa}</span>}
          </div>

          <div className="form-actions" style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <BotonPrimario type="submit">Solicitar</BotonPrimario>
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
