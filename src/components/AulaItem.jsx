import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { can } from "../permissions";
import "./styles/AulaItem.css";
import "./styles/FormularioAlta.css";
import { updateAulaById, deleteAulaById } from "../api/aulas";
import CampoFormulario from "./CampoFormulario";
import BotonPrimario from "./BotonPrimario";
import { 
  validarNumeroAula, 
  validarCapacidad, 
  validarUbicacion, 
  validarCantidadComputadoras, 
  validarEstado 
} from "../utils/validarAula";

const AulaItem = ({ aulaId, numero, capacidad, ubicacion, computadoras, tieneProyector, estado, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ numero, capacidad, ubicacion, computadoras, tieneProyector, estado });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const { user } = useAuth();

  const validators = {
    numero: validarNumeroAula,
    capacidad: validarCapacidad,
    ubicacion: validarUbicacion,
    computadoras: validarCantidadComputadoras,
    estado: validarEstado
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const newFormData = {
      ...formData,
      [name]: newValue
    };

    setFormData(newFormData);

    const newErrors = {};
    for (const field in validators) {
      const error = validators[field](newFormData);
      if (error) {newErrors[field] = error;}
    }
    setErrores(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in validators) {
      const error = validators[field](formData);
      if (error) {newErrors[field] = error;}
    }

    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      setMensaje("Por favor corrige los errores en el formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      await updateAulaById(aulaId, formData);
      onUpdate({ id: aulaId, ...formData });
      setIsEditing(false);
      setErrores({});
      setMensaje("Aula actualizada correctamente.");
      setTipoMensaje("success");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    } catch (error) {
      console.error("Error al actualizar el aula:", error);
      setMensaje("Error al actualizar el aula.");
      setTipoMensaje("error");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    }
    
  };

  const handleDelete = () => {
    deleteAulaById(aulaId)
      .then(() => {
        onDelete(aulaId);
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error al borrar el aula:", error);
      });
    
  };

  if (isEditing) {
    return (
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>

          <CampoFormulario
            label="Número de Aula"
            name="numero"
            type="number"
            value={formData.numero}
            onChange={handleChange}
            error={errores.numero}
          />

          <CampoFormulario
            label="Capacidad"
            name="capacidad"
            type="number"
            value={formData.capacidad}
            onChange={handleChange}
            error={errores.capacidad}
          />

          <CampoFormulario
            label="Ubicación"
            name="ubicacion"
            type="text"
            value={formData.ubicacion}
            onChange={handleChange}
            error={errores.ubicacion}
          />

          <CampoFormulario
            label="Cantidad de Computadoras"
            name="computadoras"
            type="number"
            value={formData.computadoras}
            onChange={handleChange}
            error={errores.computadoras}
          />

          <CampoFormulario
            label="Estado"
            name="estado"
            type="select"
            value={formData.estado}
            onChange={handleChange}
            error={errores.estado}
          >
            <option value="disponible">Disponible</option>
            <option value="mantenimiento">En mantenimiento</option>
            <option value="ocupada">No disponible</option>
          </CampoFormulario>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="tieneProyector"
              checked={formData.tieneProyector}
              onChange={handleChange}
            />
            Tiene Proyector
          </label>
          {errores.tieneProyector && <p className="error-text">{errores.tieneProyector}</p>}

          {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}

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
      <span className="numeroAula">Aula {numero}</span>
      <span className="aula-data">Capacidad: {capacidad}</span>
      <span className="aula-data">{ubicacion}</span>
      <span className="aula-data">Cantidad de computadoras: {computadoras}</span>
      <span className="aula-data">Con proyector: {tieneProyector ? "Sí" : "No"}</span>
      <span className="estado">Estado: {estado}</span>

      <div className="aula-acciones">
        {can(user, "modificarAulas") && <BotonPrimario type="button" onClick={() => {setIsEditing(true);}}>Modificar</BotonPrimario>}
        {can(user, "borrarAulas") && <BotonPrimario type="button" onClick={() => {setShowDeleteModal(true);}}>Borrar</BotonPrimario>}
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas borrar esta aula?</p>
            <div className="modal-buttons">
              <BotonPrimario type="button" onClick={handleDelete}>Confirmar</BotonPrimario>
              <BotonPrimario type="button" onClick={() => setShowDeleteModal(false)}>Cancelar</BotonPrimario>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AulaItem;
