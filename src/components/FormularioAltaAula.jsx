import { useFormularioAlta } from "../hooks/useFormularioAlta";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarCapacidad, validarNumeroAula, validarUbicacion, validarCantidadComputadoras, validarFranjaHoraria } from "../utils/validarAula";
import CampoFormulario from "./CampoFormulario";

const FormularioAltaAula = ({ onAulaCreada }) => {

  const validators = {
    numeroAula: validarNumeroAula,
    capacidad: validarCapacidad,
    ubicacion: validarUbicacion,
    cantidadComputadoras: validarCantidadComputadoras,
    franjaHoraria: validarFranjaHoraria
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
      numeroAula: "",
      capacidad: "",
      ubicacion: "",
      cantidadComputadoras: "",
      tieneProyector: false,
      franjaHoraria: "disponible"
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
          label="Número de aula"
          name="numeroAula"
          type="number"
          value={formData.numeroAula}
          onChange={handleChange}
          error={errores.numeroAula}
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
          name="cantidadComputadoras"
          type="number"
          value={formData.cantidadComputadoras}
          onChange={handleChange}
          error={errores.cantidadComputadoras}
        />

        <CampoFormulario
          label="Franja horaria"
          name="franjaHoraria"
          type="select"
          value={formData.franjaHoraria}
          onChange={handleChange}
          error={errores.franjaHoraria}
        >
          <option value="disponible">Disponible</option>
          <option value="no_disponible">No disponible</option>
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