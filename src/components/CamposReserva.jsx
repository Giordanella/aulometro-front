import CampoFormulario from "./CampoFormulario";

const DIAS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

export default function CamposReserva({
  formData,
  handleChange,
  errores,
}) {
  return (
    <>
      <CampoFormulario
        label="Día de la semana"
        name="diaSemana"
        type="select"
        value={formData.diaSemana}
        onChange={handleChange}
        error={errores.diaSemana}
      >
        {DIAS.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </CampoFormulario>

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
