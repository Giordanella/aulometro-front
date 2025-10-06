import "./styles/MenuFiltros.css";

const DIAS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

const MenuFiltros = ({ filters, setFilters, errors = {} }) => {
  const handleChange = (field) => (e) => {
    const { type, value: raw, checked } = e.target;
    let value;
    if (type === "checkbox") {value = checked ? true : undefined;}
    else if (type === "number") {value = raw === "" ? "" : Number(raw);}
    else if (field === "diaSemana") {value = raw === "" ? "" : Number(raw);}
    else {value = raw;}

    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleLimpiar = () => {
    setFilters({
      ubicacion: "",
      capacidadMin: "",
      computadorasMin: "",
      tieneProyector: undefined,
      diaSemana: "",
      horaInicio: "",
      horaFin: "",
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
      {errors.computadorasMin && (
        <p className="error">{errors.computadorasMin}</p>
      )}

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

      <hr className="menu-filtros__divider" />
      <div className="menu-filtros__row">
        <label>Día de la semana</label>
        <select
          value={filters.diaSemana === "" ? "" : Number(filters.diaSemana)}
          onChange={handleChange("diaSemana")}
        >
          <option value="">Cualquiera</option>
          {DIAS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      {errors.diaSemana && <p className="error">{errors.diaSemana}</p>}

      <div className="menu-filtros__row menu-filtros__row--inline">
        <div>
          <label>Hora inicio</label>
          <input
            type="time"
            value={filters.horaInicio || ""}
            onChange={handleChange("horaInicio")}
          />
          {errors.horaInicio && <p className="error">{errors.horaInicio}</p>}
        </div>
        <div>
          <label>Hora fin</label>
          <input
            type="time"
            value={filters.horaFin || ""}
            onChange={handleChange("horaFin")}
          />
          {errors.horaFin && <p className="error">{errors.horaFin}</p>}
        </div>
      </div>

      <div className="menu-filtros__actions">
        <button className="limpiar-btn" type="button" onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default MenuFiltros;
