import "./styles/BotonFiltro.css";

const BotonFiltro = ({ children, onClick, isActive = false }) => {
  const clase = isActive ? "boton-filtro activo" : "boton-filtro";

  return (
    <button className={clase} onClick={onClick}>
      {children}
    </button>
  );
};

export default BotonFiltro;
