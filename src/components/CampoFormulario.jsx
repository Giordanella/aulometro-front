import "./styles/FormularioAlta.css";

const CampoFormulario = ({ label, placeholder, name, type = "text", value, onChange, error, required = false, children }) => {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      { type !== "select" ? (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={"form-input"}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <select
          name={name}
          className="form-input"
          value={value}
          onChange={onChange}
          required={required}
        >
          {children}
        </select>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default CampoFormulario;