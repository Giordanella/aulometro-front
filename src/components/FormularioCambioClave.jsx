import "./styles/FormularioAlta.css";
import { useFormulario } from "../hooks/useFormulario.jsx";
import { changePassword } from "../api/users";
import { validarPassword } from "../utils/validarUsuario.js";
import BotonPrimario from "./BotonPrimario";
import CamposClave from "./CamposClave.jsx";
import { useAuth } from "../contexts/useAuth.js";

const FormularioCambioClave = () => {
  const { setUser } = useAuth();

  // Wrappers que adaptan los nombres actuales del form a los validadores existentes
  const validators = {
    currentPassword: (formData) => {
      return validarPassword({ password: formData.currentPassword });
    },

    newPassword: (formData) => {
      return validarPassword({ password: formData.newPassword });
    },

    confirmNewPassword: (formData) => {
      const v = formData.confirmNewPassword;
      // No marcar error por estar vacío mientras el usuario está tipeando (UX suave)
      if (!v || v.trim() === "") {return null;}

      // Validar formato/longitud
      const formato = validarPassword({ password: v });
      if (formato) {return formato;}

      // Comparación con la nueva contraseña
      if (v !== formData.newPassword) {return "Las contraseñas no coinciden.";}

      return null;
    }
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    submitting,
    handleChange,
    handleSubmit
  } = useFormulario(
    { currentPassword: "", newPassword: "", confirmNewPassword: "" },
    changePassword,
    setUser,
    validators,
    { resetOnSuccess: true }
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Cambio de contraseña</h2>
        <CamposClave
          formData={formData}
          handleChange={handleChange}
          errores={errores}
        />
        <BotonPrimario disabled={submitting} aria-busy={submitting}>
          {submitting ? "Cambiando..." : "Cambiar contraseña"}
        </BotonPrimario>
      </form>

      {mensaje && (
        <p className={`form-message ${tipoMensaje}`} role="status" aria-live="polite">{mensaje}</p>
      )}
    </div>
  );
};

export default FormularioCambioClave;
