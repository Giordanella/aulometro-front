import "./styles/MenuFiltros.css";

const MenuFiltros = ({ filters, setFilters, errors = {} }) => {
  const handleChange = (field) => (e) => {
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (e.target.type === "number") {
      value = e.target.value === "" ? "" : Number(e.target.value);
    } else {
      value = e.target.value;
    }

    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLimpiar = () => {
    setFilters({
      ubicacion: "",
      capacidadMin: "",
      computadorasMin: "",
      tieneProyector: undefined,
      estado: "",
    });
  };

  return (
    <div className="menu-filtros">
      <div className="menu-filtros__row">
        <label>Ubicación</label>
        <input
          type="text"
          value={filters.ubicacion || ""}
          onChange={handleChange("ubicacion")}
          placeholder="Dep, Edificio, Piso..."
        />
      </div>
      {errors.ubicacion && <p className="error">{errors.ubicacion}</p>}

      <div className="menu-filtros__row">
        <label>Capacidad (mín.)</label>
        <input
          type="number"
          min={1}
          max={100}
          value={filters.capacidadMin === "" ? "" : filters.capacidadMin}
          onChange={handleChange("capacidadMin")}
          placeholder="Ej: 20"
        />
      </div>
      {errors.capacidadMin && <p className="error">{errors.capacidadMin}</p>}

      <div className="menu-filtros__row">
        <label>Computadoras (mín.)</label>
        <input
          type="number"
          min={0}
          max={50}
          value={filters.computadorasMin === "" ? "" : filters.computadorasMin}
          onChange={handleChange("computadorasMin")}
          placeholder="Ej: 5"
        />
      </div>
      {errors.computadorasMin && <p className="error">{errors.computadorasMin}</p>}

      <div className="menu-filtros__row">
        <label>
          <input
            type="checkbox"
            checked={!!filters.tieneProyector}
            onChange={handleChange("tieneProyector")}
          />{" "}
          Tiene proyector
        </label>
      </div>

      <div className="menu-filtros__row">
        <label>Estado</label>
        <select value={filters.estado || ""} onChange={handleChange("estado")}>
          <option value="">Cualquiera</option>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>
      {errors.estado && <p className="error">{errors.estado}</p>}

      <div className="menu-filtros__actions">
        <button className="limpiar-btn" type="button" onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default MenuFiltros;
