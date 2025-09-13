import { useFormularioAlta } from "../hooks/useFormularioAlta.jsx";
import { createUser } from "../api/users";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";
import { validarEmail, validarNombreUsuario, validarPassword, validarRole } from "../utils/validarUsuario.js";

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
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errores.name && <p className="error-text">{errores.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errores.email && <p className="error-text">{errores.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errores.password && <p className="error-text">{errores.password}</p>}
        <select
          name="role"
          className="form-input"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar rol</option>
          <option value="DOCENTE">Docente</option>
          <option value="DIRECTIVO">Directivo</option>
        </select>
        {errores.role && <p className="error-text">{errores.role}</p>}

        <BotonPrimario>Dar de alta usuario</BotonPrimario>
      </form>

      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaUsuario;
