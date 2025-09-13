import { useFormularioAlta } from "../hooks/useFormularioAlta";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";

const FormularioAltaAula = ({ onAulaCreada }) => {
  const {
    formData,
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
    onAulaCreada
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
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          className="form-input"
          value={formData.capacidad}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          className="form-input"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidadComputadoras"
          placeholder="Cantidad de computadoras"
          className="form-input"
          value={formData.cantidadComputadoras}
          onChange={handleChange}
        />
        <label className="form-label">
          <input 
            type="checkbox"
            name="tieneProyector"
            className="form-input"
            checked={formData.tieneProyector}
            onChange={handleChange}
          />
            ¿Tiene proyector?</label>
        <BotonPrimario>Dar de alta Aula</BotonPrimario>
      </form>
      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaAula;