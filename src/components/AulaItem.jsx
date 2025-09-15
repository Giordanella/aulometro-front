import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { can } from "../permissions";
import "./styles/AulaItem.css";
import "./styles/FormularioAlta.css";
import { deleteAulaById } from "../api/aulas";
import BotonPrimario from "./BotonPrimario";
import FormularioEdicionAula from "./FormularioEdicionAula";

const AulaItem = ({ aulaId, numero, capacidad, ubicacion, computadoras, tieneProyector, estado, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

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
      <FormularioEdicionAula
        aula={{ id: aulaId, numero, capacidad, ubicacion, computadoras, tieneProyector, estado }}
        onAulaActualizada={(updated) => {
          onUpdate({ id: aulaId, ...updated});
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
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
