import { useState } from "react";
import BotonFiltro from "./BotonFiltro";
import "./styles/Filtro.css";

const Filtro = () => {
  const [activo, setActivo] = useState(false);

  const handleClick = () => {
    setActivo(!activo);
  };

  return (
    <div className="filtro-container">
      <BotonFiltro isActive={activo} onClick={handleClick} />
    </div>
  );
};

export default Filtro;
