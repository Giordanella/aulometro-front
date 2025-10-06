import CampoFormulario from "./CampoFormulario";
import "./styles/FormularioAlta.css";

export default function CamposAula({ formData, handleChange, errores }) {
  return (
    <>
      <CampoFormulario
        placeholder="Número de aula"
        name="numero"
        type="number"
        value={formData.numero}
        onChange={handleChange}
        error={errores.numero}
      />

      <CampoFormulario
        placeholder="Capacidad"
        name="capacidad"
        type="number"
        value={formData.capacidad}
        onChange={handleChange}
        error={errores.capacidad}
      />

      <CampoFormulario
        placeholder="Ubicación"
        name="ubicacion"
        type="text"
        value={formData.ubicacion}
        onChange={handleChange}
        error={errores.ubicacion}
      />

      <CampoFormulario
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
