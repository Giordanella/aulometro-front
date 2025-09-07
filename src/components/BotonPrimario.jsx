import "./styles/BotonPrimario.css";

const BotonPrimario = ({ children, type = "submit", onClick }) => {
  return (
    <button type={type} className="boton-primario" onClick={onClick}>
      {children}
    </button>
  );
};

export default BotonPrimario;
