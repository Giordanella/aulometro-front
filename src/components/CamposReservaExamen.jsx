import CampoFormulario from "./CampoFormulario";

export default function CamposReservaExamen({ formData, handleChange, errores, aulaNumero }) {
  return (
    <>
      <label className="form-label">Fecha</label>
      <CampoFormulario
        name="fecha"
        type="date"
        value={formData.fecha}
        onChange={handleChange}
        error={errores.fecha}
      />

      <label className="form-label">Número de aula</label>
      <CampoFormulario name="aulaNumero" type="number" value={aulaNumero} readOnly />

      <label className="form-label">Hora inicio</label>
      <CampoFormulario
        name="horaInicio"
        type="time"
        value={formData.horaInicio}
        onChange={handleChange}
        error={errores.horaInicio}
      />

      <label className="form-label">Hora fin</label>
      <CampoFormulario
        name="horaFin"
        type="time"
        value={formData.horaFin}
        onChange={handleChange}
        error={errores.horaFin}
      />

      <label className="form-label">Observaciones (opcional)</label>
      <CampoFormulario
        name="observaciones"
        as="textarea"
        value={formData.observaciones}
        onChange={handleChange}
        error={errores.observaciones}
      />
    </>
  );
}
