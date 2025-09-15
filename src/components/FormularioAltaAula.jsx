import { useFormulario } from "../hooks/useFormulario";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarCapacidad, validarNumeroAula, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";
import CamposAula from "./CamposAula";

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
  } = useFormulario(
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
    validators,
    { resetOnSuccess: true }
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Alta de Aula</h2>
        <CamposAula
          formData={formData}
          handleChange={handleChange}
          errores={errores}
        />
        <BotonPrimario>Dar de alta Aula</BotonPrimario>
      </form>
      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaAula;