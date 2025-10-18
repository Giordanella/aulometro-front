import "./styles/FormularioAlta.css";
import CampoFormulario from "./CampoFormulario";

const CamposClave = ({ formData, handleChange, errores, mostrarLabels = false }) => {
  return (
    <>
      <CampoFormulario
        label={mostrarLabels ? "Contraseña actual" : undefined}
        placeholder="Contraseña actual"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        error={errores.currentPassword}
        required
        autoComplete="current-password"
      />

      <CampoFormulario
        label={mostrarLabels ? "Contraseña nueva" : undefined}
        placeholder="Contraseña nueva"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        error={errores.newPassword}
        required
        autoComplete="new-password"
      />

      <CampoFormulario
        label={mostrarLabels ? "Confirmar contraseña" : undefined}
        placeholder="Confirmar contraseña"
        name="confirmNewPassword"
        type="password"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        error={errores.confirmNewPassword}
        required
        autoComplete="new-password"
      />
    </>
  );
};

export default CamposClave;
