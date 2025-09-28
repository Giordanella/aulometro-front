import "./styles/FormularioAlta.css";
import CampoFormulario from "./CampoFormulario";

const CamposUsuario = ({ formData, handleChange, errores }) => {
  return (
    <>
      <CampoFormulario
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errores.name}
      />

      <CampoFormulario
        placeholder="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errores.email}
        required
      />

      <CampoFormulario
        placeholder="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errores.password}
        required
      />

      <CampoFormulario
        placeholder="Rol"
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
    </>
  );
};

export default CamposUsuario;
