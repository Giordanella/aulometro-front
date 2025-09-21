import "./styles/MenuFiltros.css";

/**
 * Props:
 *  - filters: objeto actual de filtros
 *  - setFilters: setter para actualizar filtros
 */
const MenuFiltros = ({ filters, setFilters }) => {
  const handleChange = (field) => (e) => {
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (e.target.type === "number") {
      // permitimos string vacío para limpiar
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

      <div className="menu-filtros__row">
        <label>Capacidad (mín.)</label>
        <input
          type="number"
          min={1}
          value={filters.capacidadMin === "" ? "" : filters.capacidadMin}
          onChange={handleChange("capacidadMin")}
          placeholder="Ej: 20"
        />
      </div>

      <div className="menu-filtros__row">
        <label>Computadoras (mín.)</label>
        <input
          type="number"
          min={0}
          value={filters.computadorasMin === "" ? "" : filters.computadorasMin}
          onChange={handleChange("computadorasMin")}
          placeholder="Ej: 5"
        />
      </div>

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
        <select
          value={filters.estado || ""}
          onChange={handleChange("estado")}
        >
          <option value="">Cualquiera</option>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div className="menu-filtros__actions">
        <button type="button" onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default MenuFiltros;
