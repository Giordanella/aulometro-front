import "./styles/FormularioAlta.css";
import CampoFormulario from "./CampoFormulario";

const CamposUsuario = ({ formData, handleChange, errores, mostrarLabels = false }) => {
  return (
    <>
      <CampoFormulario
        label={mostrarLabels ? "Nombre" : undefined}
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errores.name}
      />

      <CampoFormulario
        label={mostrarLabels ? "Correo electrónico" : undefined}
        placeholder="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errores.email}
        required
      />

      <CampoFormulario
        label={mostrarLabels ? "Contraseña" : undefined}
        placeholder="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errores.password}
        required
      />

      <CampoFormulario
        label={mostrarLabels ? "Rol" : undefined}
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
