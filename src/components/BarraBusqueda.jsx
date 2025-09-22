import { useState, useMemo } from "react";
import BotonPrimario from "./BotonPrimario";
import { validarNumeroAula, validarFiltros, hasErrors } from "../utils/validarAula.js";
import "./styles/BarraBusqueda.css";
import { searchAulas } from "../api/aulas.js";
import MenuFiltros from "./MenuFiltros.jsx";
import menuIcon from "../assets/menu.svg";

const BarraBusqueda = ({ setAulas, filters, setFilters }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.startsWith("0")) {value = "";}

    setQuery(value);

    if (value.trim() === "") {
      setError(null);
      return;
    }

    const formData = { numero: Number(value) };
    const errorMsg = validarNumeroAula(formData);
    setError(errorMsg);
  };

  // ✅ Validación global de filtros
  const filtersValidation = useMemo(() => validarFiltros(filters), [filters]);
  const hasFilterValidationErrors = hasErrors(filtersValidation);

  function buildPayload({ numero, ...restFilters }) {
    const out = {};
    if (numero !== undefined && numero !== "" && numero !== null) {
      out.numero = numero;
    }
    Object.entries(restFilters).forEach(([k, v]) => {
      if (v === undefined || v === null) {return;}
      if (typeof v === "string") {
        if (v.trim() === "") {return;}
        out[k] = v;
        return;
      }
      out[k] = v;
    });
    return out;
  }

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (error || hasFilterValidationErrors) {return;}

    const combined = { ...filters };
    if (query && query !== "") {combined.numero = Number(query);}

    const payload = buildPayload(combined);

    setAulas([]); // indicamos carga

    try {
      const res = await searchAulas(payload);
      setAulas(res.data);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        setAulas([]);
        return;
      }
      console.error("Error al buscar aulas:", err);
      setAulas(null);
    }
  };

  const hasNumeroValido = query && query >= 1 && query <= 350 && !error;

  const hasFilters =
    (filters.ubicacion && filters.ubicacion.trim() !== "") ||
    (filters.capacidadMin && filters.capacidadMin > 0) ||
    (filters.computadorasMin && filters.computadorasMin > 0) ||
    filters.tieneProyector === true ||
    (filters.estado && filters.estado.trim() !== "");

  // ✅ ahora también depende de si hay errores de validación en filtros
  const isButtonDisabled = (!hasNumeroValido && !hasFilters) || hasFilterValidationErrors;

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
              if (invalidPattern.test(e.data)) {e.preventDefault();}
              if ((query + e.data).length > 3) {e.preventDefault();}
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

      {mostrarFiltros && (
        <MenuFiltros filters={filters} setFilters={setFilters} errors={filtersValidation} />
      )}
    </div>
  );
};

export default BarraBusqueda;
