import CampoFormulario from "./CampoFormulario";
import "./styles/FormularioAlta.css";

export default function CamposAula({ formData, handleChange, errores, mostrarLabels = false }) {
  return (
    <>
      <CampoFormulario
        label={mostrarLabels ? "Número de aula" : undefined}
        placeholder="Número de aula"
        name="numero"
        type="number"
        value={formData.numero}
        onChange={handleChange}
        error={errores.numero}
      />

      <CampoFormulario
        label={mostrarLabels ? "Capacidad" : undefined}
        placeholder="Capacidad"
        name="capacidad"
        type="number"
        value={formData.capacidad}
        onChange={handleChange}
        error={errores.capacidad}
      />

      <CampoFormulario
        label={mostrarLabels ? "Ubicación" : undefined}
        placeholder="Ubicación"
        name="ubicacion"
        type="text"
        value={formData.ubicacion}
        onChange={handleChange}
        error={errores.ubicacion}
      />

      <CampoFormulario
        label={mostrarLabels ? "Cantidad de computadoras" : undefined}
        placeholder="Cantidad de computadoras"
        name="computadoras"
        type="number"
        value={formData.computadoras}
        onChange={handleChange}
        error={errores.computadoras}
      />

      <label className="form-label checkbox-label">
        <input
          type="checkbox"
          name="tieneProyector"
          checked={formData.tieneProyector}
          onChange={handleChange}
        />
        ¿Tiene proyector?
      </label>
      {errores.tieneProyector && (
        <p className="error-text">{errores.tieneProyector}</p>
      )}
    </>
  );
}
