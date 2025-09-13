import { useFormularioAlta } from "../hooks/useFormularioAlta.jsx";
import { createUser } from "../api/users";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarEmail, validarNombreUsuario, validarPassword, validarRole } from "../utils/validarUsuario.js";
import CampoFormulario from "./CampoFormulario.jsx";

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
  } = useFormularioAlta(
    { name: "", email: "", password: "", role: "" },
    createUser,
    (nuevoDocente) => {
      if (nuevoDocente.role === "DOCENTE") {
        setDocentes((prevDocentes) => [...prevDocentes, nuevoDocente]);
      }
    },
    validators
  );

  return (
    <div className="form-container">
      
      <form className="form" onSubmit={handleSubmit}>
        <h2>Alta de Usuario</h2>

        <CampoFormulario
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errores.name}
        />

        <CampoFormulario
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errores.email}
          required
        />
        
        <CampoFormulario
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errores.password}
          required
        />

        <CampoFormulario
          label="Rol"
          name="role"
          type="select"
          value={formData.role}
          onChange={handleChange}
          error={errores.role}
          required
        >
          <option value="">Seleccionar rol</option>
          <option value="DOCENTE">Docente</option>
          <option value="DIRECTIVO">Directivo</option>
        </CampoFormulario>

        <BotonPrimario>Dar de alta usuario</BotonPrimario>
        
      </form>

      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaUsuario;
