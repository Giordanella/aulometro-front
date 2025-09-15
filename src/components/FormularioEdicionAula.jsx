import { updateAulaById } from "../api/aulas";
import { useFormularioEdicion } from "../hooks/useFormularioEdicion";
import { validarNumeroAula, validarCapacidad, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";
import BotonPrimario from "./BotonPrimario";
import CampoFormulario from "./CampoFormulario";

const FormularioEdicionAula = ({ aula, onAulaActualizada, onCancel }) => {
    
  const validators = {
    numero: validarNumeroAula,
    capacidad: validarCapacidad,
    ubicacion: validarUbicacion,
    computadoras: validarCantidadComputadoras,
    estado: validarEstado
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  } = useFormularioEdicion(
    aula,
    (data) => updateAulaById(aula.id, data),
    onAulaActualizada,
    validators
  );

  return(
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <CampoFormulario
          label="Número de Aula"
          name="numero"
          type="number"
          value={formData.numero}
          onChange={handleChange}
          error={errores.numero}
        />
        <CampoFormulario
          label="Capacidad"
          name="capacidad"
          type="number"
          value={formData.capacidad}
          onChange={handleChange}
          error={errores.capacidad}
        />
        <CampoFormulario
          label="Ubicación"
          name="ubicacion"
          type="text"
          value={formData.ubicacion}
          onChange={handleChange}
          error={errores.ubicacion}
        />
        <CampoFormulario
          label="Cantidad de computadoras"
          name="computadoras"
          type="number"
          value={formData.computadoras}
          onChange={handleChange}
          error={errores.computadoras}
        />
        <CampoFormulario
          label="Estado"
          name="estado"
          type="select"
          value={formData.estado}
          onChange={handleChange}
          error={errores.estado}
        >
          <option value="disponible">Disponible</option>
          <option value="mantenimiento">En Mantenimiento</option>
          <option value="ocupada">No disponible</option>
        </CampoFormulario>
        <label className="checkbox-label">
          <input 
            type="checkbox"
            name="tieneProyector"
            checked={formData.tieneProyector}
            onChange={handleChange}
          />
                    ¿Tiene proyector?
        </label>
        {errores.tieneProyector && <p className="error-text">{errores.tieneProyector}</p>}
                
        {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}

        <div className="botones-edicion">
          <BotonPrimario type="submit">Guardar</BotonPrimario>
          <BotonPrimario type="button" onClick={onCancel}>Cancelar</BotonPrimario>
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionAula;