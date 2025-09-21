import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import { validarNumeroAula } from "../utils/validarAula.js";
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

  // Quita claves vacías/indeseadas del objeto filters antes de enviar
  function buildPayload({ numero, ...restFilters }) {
    const out = {};
    // incluir numero si existe y es no vacío
    if (numero !== undefined && numero !== "" && numero !== null) {
      // si viene string, mandamos tal cual; backend normaliza
      out.numero = numero;
    }
    // recorrer filtros del menu
    Object.entries(restFilters).forEach(([k, v]) => {
      if (v === undefined || v === null) {return;}
      if (typeof v === "string") {
        if (v.trim() === "") {return;}
        out[k] = v;
        return;
      }
      // boolean o number
      out[k] = v;
    });
    return out;
  }

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }

    // construir payload combinando query (numero) y filtros del MenuFiltros
    const combined = { ...filters };
    if (query && query !== "") {combined.numero = Number(query);}

    const payload = buildPayload(combined);

    // Indicar carga visualmente poniendo [] primero (igual que antes)
    setAulas([]);

    try {
      const res = await searchAulas(payload);
      setAulas(res.data);
    } catch (err) {
      // Si el backend devuelve 404 (no hay resultados), lo manejamos y mostramos array vacío
      const status = err?.response?.status;
      if (status === 404) {
        setAulas([]);
        return;
      }
      console.error("Error al buscar aulas:", err);
      // opcional: podés setear un estado para mostrar error al usuario
      setAulas(null);
    }
  };

  // Chequea si hay número válido
  const hasNumeroValido = query && query >= 1 && query <= 350 && !error;

  // Chequea si hay al menos un filtro aplicado
  const hasFilters =
    (filters.ubicacion && filters.ubicacion.trim() !== "") ||
    (filters.capacidadMin && filters.capacidadMin > 0) ||
    (filters.computadorasMin && filters.computadorasMin > 0) ||
    filters.tieneProyector === true ||
    (filters.estado && filters.estado.trim() !== "");

  // El botón se habilita si hay número válido o filtros
  const isButtonDisabled = !hasNumeroValido && !hasFilters;

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

      {mostrarFiltros && (
        <MenuFiltros
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

export default BarraBusqueda;
