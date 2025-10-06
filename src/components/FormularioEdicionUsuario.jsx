import { updateUserById } from "../api/users.js";
import { useFormulario } from "../hooks/useFormulario.jsx";
import {
  validarNombreUsuario,
  validarEmail,
  validarPassword,
  validarRole
} from "../utils/validarUsuario.js";
import CamposUsuario from "./CamposUsuario.jsx";
import BotonPrimario from "./BotonPrimario.jsx";

const FormularioEdicionUsuario = ({ docente, onUpdatedUsuario, onCancel }) => {
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
    docente,
    (data) => updateUserById(docente.id, data),
    onUpdatedUsuario,
    validators,
    { resetOnSuccess: false }
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <CamposUsuario
          formData={formData}
          handleChange={handleChange}
          errores={errores}
          mostrarLabels
        />
        {mensaje && (
          <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>
        )}
        <div className="botones-edicion">
          <BotonPrimario type="submit">Guardar</BotonPrimario>
          <BotonPrimario type="button" onClick={onCancel}>
            Cancelar
          </BotonPrimario>
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionUsuario;
