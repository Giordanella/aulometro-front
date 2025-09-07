import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";

const FormularioAlta = () => {
  return (
    <div className="form-container">
      <form className="form">
        <input
          type="text"
          placeholder="Nombre"
          className="form-input"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-input"
          required
        />
        <select className="form-input" required>
          <option value="">Seleccionar rol</option>
          <option value="DOCENTE">Docente</option>
          <option value="DIRECTIVO">Directivo</option>
        </select>
        <BotonPrimario>Dar de alta usuario</BotonPrimario>
      </form>
    </div>
  );
};

export default FormularioAlta;
