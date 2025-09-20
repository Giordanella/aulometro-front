import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import { validarNumeroAula } from "../utils/validarAula.js";
import "./styles/BarraBusqueda.css";
import { searchAulas } from "../api/aulas.js";
import MenuFiltros from "./MenuFiltros.jsx";
import menuIcon from "../assets/menu.svg";

const BarraBusqueda = ({ setAulas }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

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

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
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
      <div className="barra-busqueda__top">
        <form className="barra-busqueda" onSubmit={handleBuscar}>
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
          <BotonPrimario disabled={isButtonDisabled}>Buscar</BotonPrimario>
        </form>

        <button
          className="menu-filtros-toggle"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          type="button"
          title="Mostrar/Ocultar filtros"
        >
          <img src={menuIcon} alt="Menú filtros" />
        </button>
      </div>

      {error && <p className="barra-busqueda__error">{error}</p>}

      {mostrarFiltros && <MenuFiltros />}
    </div>
  );
};

export default BarraBusqueda;
