import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import { validarNumeroAula } from "../utils/validarAula.js";
import "./styles/BarraBusqueda.css";
import { searchAulas } from "../api/aulas.js";

const BarraBusqueda = ({ setAulas }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let value = e.target.value;

    if (value.startsWith("0")) {
      value = "";
    }

    setQuery(value);

    if (value.trim() === "") {
      setError(null);
      return;
    }

    const formData = { numero: Number(value) };
    const errorMsg = validarNumeroAula(formData);
    setError(errorMsg);
  };

  const handleBuscar = async () => {
    if (error) {return;}
    setAulas([]);
    try {
      const res = await searchAulas({ numero: query });
      setAulas(res.data);
    } catch (err) {
      console.error("Error al buscar aulas:", err);
    }
  };

  const isButtonDisabled = !query || query < 1 || query > 350 || !!error;

  return (
    <div className="barra-busqueda-container">
      <div className="barra-busqueda">
        <input
          className="barra-busqueda__input"
          type="number"
          placeholder="Ingrese el número de aula..."
          value={query}
          onChange={handleChange}
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
        <BotonPrimario onClick={handleBuscar} disabled={isButtonDisabled}>
          Buscar
        </BotonPrimario>
      </div>
      {error && <p className="barra-busqueda__error">{error}</p>}
    </div>
  );
};

export default BarraBusqueda;
