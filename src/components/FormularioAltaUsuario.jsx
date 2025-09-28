import "./styles/FormularioAlta.css";
import { useFormulario } from "../hooks/useFormulario.jsx";
import { createUser } from "../api/users";
import {
  validarEmail,
  validarNombreUsuario,
  validarPassword,
  validarRole
} from "../utils/validarUsuario.js";
import CamposUsuario from "./CamposUsuario.jsx";
import BotonPrimario from "./BotonPrimario";

const FormularioAltaUsuario = ({ setDocentes }) => {
  const validators = {
    name: validarNombreUsuario,
    email: validarEmail,
    password: validarPassword,
    role: validarRole
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  } = useFormulario(
    { name: "", email: "", password: "", role: "" },
    createUser,
    (nuevoDocente) => {
      if (nuevoDocente.role === "DOCENTE") {
        setDocentes((prevDocentes) => [...prevDocentes, nuevoDocente]);
      }
    },
    validators,
    { resetOnSuccess: true }
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Alta de Usuario</h2>
        <CamposUsuario
          formData={formData}
          handleChange={handleChange}
          errores={errores}
        />
        <BotonPrimario>Dar de alta usuario</BotonPrimario>
      </form>

      {mensaje && (
        <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>
      )}
    </div>
  );
};

export default FormularioAltaUsuario;
