import CampoFormulario from "./CampoFormulario";

export default function CamposReservaExamen({ formData, handleChange, errores }) {
  return (
    <>
      <CampoFormulario
        label="Fecha"
        name="fecha"
        type="date"
        value={formData.fecha}
        onChange={handleChange}
        error={errores.fecha}
      />

      <CampoFormulario
        label="Hora inicio"
        name="horaInicio"
        type="time"
        value={formData.horaInicio}
        onChange={handleChange}
        error={errores.horaInicio}
      />

      <CampoFormulario
        label="Hora fin"
        name="horaFin"
        type="time"
        value={formData.horaFin}
        onChange={handleChange}
        error={errores.horaFin}
      />

      <CampoFormulario
        label="Observaciones (opcional)"
        name="observaciones"
        as="textarea"
        value={formData.observaciones}
        onChange={handleChange}
        error={errores.observaciones}
      />
    </>
  );
}
