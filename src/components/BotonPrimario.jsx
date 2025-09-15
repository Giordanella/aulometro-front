import "./styles/BotonPrimario.css";

const BotonPrimario = ({ children, type = "submit", onClick, disabled = false }) => {
  return (
    <button type={type} className="boton-primario" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default BotonPrimario;
