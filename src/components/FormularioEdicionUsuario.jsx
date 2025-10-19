import { updateUserById } from "../api/users.js";
import { useFormulario } from "../hooks/useFormulario.jsx";
import {
  validarNombreUsuario,
  validarEmail,
  validarRole
} from "../utils/validarUsuario.js";
import CamposUsuario from "./CamposUsuario.jsx";
import BotonPrimario from "./BotonPrimario.jsx";

const FormularioEdicionUsuario = ({ docente, onUpdatedUsuario, onCancel }) => {
  const validators = {
    name: validarNombreUsuario,
    email: validarEmail,
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
    (data) => {
      const { name, email, role } = data;
      return updateUserById(docente.id, { name, email, role });
    },
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
          incluirPassword={false}
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
