import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import { validarNumeroAula } from "../utils/validarAula.js";
import "./styles/BarraBusqueda.css";

const BarraBusqueda = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setError(null);
      return;
    }

    const formData = { numero: Number(value) };
    const errorMsg = validarNumeroAula(formData);
    setError(errorMsg);
  };

  const handleBuscar = () => {
    if (error) {return;}

    console.log("Buscar aula:", query);
  };

  return (
    <div className="barra-busqueda-container">
      <div className="barra-busqueda">
        <input
          className="barra-busqueda__input"
          type="number"
          placeholder="Ingrese el número de aula..."
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            const invalidChars = ["-", "+", "e", "E", ".", ","];
            if (invalidChars.includes(e.key)) {
              e.preventDefault();
            }
            if (query.length >= 3 && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onBeforeInput={(e) => {
            const invalidPattern = /[+\-eE.,]/;
            if (invalidPattern.test(e.data)) {
              e.preventDefault();
            }
            if ((query + e.data).length > 3) {
              e.preventDefault();
            }
          }}
          min={1}
          max={350}
        />
        <BotonPrimario onClick={handleBuscar} disabled={!!error}>
          Buscar
        </BotonPrimario>
      </div>
      {error && <p className="barra-busqueda__error">{error}</p>}
    </div>
  );
};

export default BarraBusqueda;
