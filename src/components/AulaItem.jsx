import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { can } from "../permissions";
import "./styles/AulaItem.css";
import "./styles/FormularioAlta.css";
import { updateAulaById } from "../api/aulas";
import CampoFormulario from "./CampoFormulario";
import BotonPrimario from "./BotonPrimario";

const AulaItem = ({ aulaId, numeroAula, capacidad, ubicacion, cantidadComputadoras, tieneProyector, estado }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    numeroAula,
    capacidad,
    ubicacion,
    cantidadComputadoras,
    tieneProyector,
    estado
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Updarting aula with id ${aulaId}:`, formData);
    updateAulaById(aulaId, formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>

          <CampoFormulario
            label="Número de Aula"
            name="numeroAula"
            type="text"
            value={formData.numeroAula}
            onChange={handleChange}
          />

          <CampoFormulario
            label="Capacidad"
            name="capacidad"
            type="number"
            value={formData.capacidad}
            onChange={handleChange}
          />

          <CampoFormulario
            label="Ubicación"
            name="ubicacion"
            type="text"
            value={formData.ubicacion}
            onChange={handleChange}
          />

          <CampoFormulario
            label="Cantidad de Computadoras"
            name="cantidadComputadoras"
            type="number"
            value={formData.cantidadComputadoras}
            onChange={handleChange}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="tieneProyector"
              checked={formData.tieneProyector}
              onChange={handleChange}
            />
            Tiene Proyector
          </label>

          <CampoFormulario
            label="Estado"
            name="estado"
            type="select"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="disponible">Disponible</option>
            <option value="mantenimiento">En mantenimiento</option>
            <option value="no_disponible">No disponible</option>
          </CampoFormulario>

          <div className="botones-edicion">
            <BotonPrimario type="submit">Guardar</BotonPrimario>
            <BotonPrimario type="button" onClick={() => setIsEditing(false)}>Cancelar</BotonPrimario>
          </div>

        </form>
      </div>
    );
  }
  
  return (
    <div className="aula-container">
      <span className="numeroAula">Aula {numeroAula}</span>
      <span className="aula-data">Capacidad: {capacidad}</span>
      <span className="aula-data">{ubicacion}</span>
      <span className="aula-data">Cantidad de computadoras: {cantidadComputadoras}</span>
      <span className="aula-data">Con proyector: {tieneProyector ? "Sí" : "No"}</span>
      <span className="estado">Estado: {estado}</span>

      {can(user, "modificarAulas") && <BotonPrimario type="button" onClick={() => {setIsEditing(true);}}>Modificar</BotonPrimario>}
    </div>
  );
};

export default AulaItem;
