import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda";
import "./styles/BusquedaAulas.css";
import ListaAulas from "./ListaAulas";

const BusquedaAulas = () => {
  const [aulas, setAulas] = useState(null);

  // Estado compartido de filtros (los campos coinciden con los que acepta el backend)
  const [filters, setFilters] = useState({
    ubicacion: "",
    capacidadMin: "",
    computadorasMin: "",
    tieneProyector: undefined, // boolean o undefined
    estado: "",
  });

  return (
    <div className="busqueda-aulas-container">
      <BarraBusqueda
        setAulas={setAulas}
        filters={filters}
        setFilters={setFilters}
      />
      {aulas && (
        <ListaAulas
          aulas={aulas}
          title="Resultados de búsqueda"
          msg="No hay aulas que coincidan con la búsqueda."
        />
      )}
    </div>
  );
};

export default BusquedaAulas;
