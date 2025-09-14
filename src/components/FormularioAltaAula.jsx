import { useFormularioAlta } from "../hooks/useFormularioAlta";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarCapacidad, validarNumeroAula, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";
import CampoFormulario from "./CampoFormulario";

const FormularioAltaAula = ({ onAulaCreada }) => {

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
  } = useFormularioAlta(
    {
      numero: "",
      capacidad: "",
      ubicacion: "",
      computadoras: "",
      tieneProyector: false,
      estado: "disponible"
    },
    createAula,
    onAulaCreada,
    validators
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Alta de Aula</h2>

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

        <CampoFormulario
          placeholder="Estado"
          name="estado"
          type="select"
          value={formData.estado}
          onChange={handleChange}
          error={errores.estado}
        >
          <option value="disponible">Disponible</option>
          <option value="mantenimiento">En mantenimiento</option>
          <option value="ocupada">No disponible</option>
        </CampoFormulario>

        <label className="form-label">
          <input 
            type="checkbox"
            name="tieneProyector"
            className="form-input"
            checked={formData.tieneProyector}
            onChange={handleChange}
          />
          ¿Tiene proyector?
        </label>
        {errores.tieneProyector && <p className="error-text">{errores.tieneProyector}</p>}
        <BotonPrimario>Dar de alta Aula</BotonPrimario>
      </form>
      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaAula;