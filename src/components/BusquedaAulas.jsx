import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda";
import "./styles/BusquedaAulas.css";
import ListaAulas from "./ListaAulas";

const BusquedaAulas = () => {
  const [aulas, setAulas] = useState(null);

  return (
    <div className="busqueda-aulas-container">
      <BarraBusqueda setAulas={setAulas} />
      {aulas && <ListaAulas aulas={aulas} msg="No hay aulas que coincidan con la búsqueda." />}
    </div>
  );
};

export default BusquedaAulas;
