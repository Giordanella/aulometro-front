import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda";
import "./styles/BusquedaAulas.css";
import ListaAulas from "./ListaAulas";

const BusquedaAulas = () => {
  const [aulas, setAulas] = useState([]);

  return (
    <div className="busqueda-aulas-container">
      <BarraBusqueda setAulas={setAulas} />
      <ListaAulas aulas={aulas} />
    </div>
  );
};

export default BusquedaAulas;
