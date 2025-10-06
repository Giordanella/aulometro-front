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
  aulaNumero,
}) {
  return (
    <>
      <label className="form-label">Día de la semana</label>
      <CampoFormulario
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

      <label className="form-label">Número de aula</label>
      <CampoFormulario
        name="aulaNumero"
        type="number"
        value={aulaNumero}
        readOnly
      />

      <label className="form-label">Hora inicio </label>
      <CampoFormulario
        name="horaInicio"
        type="time"
        value={formData.horaInicio}
        onChange={handleChange}
        error={errores.horaInicio}
      />

      <label className="form-label">Hora fin </label>
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
