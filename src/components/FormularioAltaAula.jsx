import { useFormularioAlta } from "../hooks/useFormularioAlta";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarCapacidad, validarNumeroAula, validarUbicacion, validarCantidadComputadoras, validarFranjaHoraria } from "../utils/validarAula";

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
        <input
          type="number"
          name="numeroAula"
          placeholder="Número de aula"
          className="form-input"
          value={formData.numeroAula}
          onChange={handleChange}
        />
        {errores.numeroAula && <p className="error-text">{errores.numeroAula}</p>}
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          className="form-input"
          value={formData.capacidad}
          onChange={handleChange}
        />
        {errores.capacidad && <p className="error-text">{errores.capacidad}</p>}
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          className="form-input"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        {errores.ubicacion && <p className="error-text">{errores.ubicacion}</p>}
        <input
          type="number"
          name="cantidadComputadoras"
          placeholder="Cantidad de computadoras"
          className="form-input"
          value={formData.cantidadComputadoras}
          onChange={handleChange}
        />
        {errores.cantidadComputadoras && <p className="error-text">{errores.cantidadComputadoras}</p>}
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