import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import "./styles/BarraBusqueda.css";

const BarraBusqueda = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBuscar = () => {
    console.log("Buscar aula:", query);
  };

  return (
    <div className="barra-busqueda">
      <input
        className="barra-busqueda__input"
        type="number"
        placeholder="Ingrese el número de aula..."
        value={query}
        onChange={handleChange}
      />
      <BotonPrimario onClick={handleBuscar}>Buscar</BotonPrimario>
    </div>
  );
};

export default BarraBusqueda;
