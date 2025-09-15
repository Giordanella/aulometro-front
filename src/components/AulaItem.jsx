import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { can } from "../permissions";
import "./styles/AulaItem.css";
import "./styles/FormularioAlta.css";
import { useBorrarAula } from "../hooks/useBorrarAula";
import BotonPrimario from "./BotonPrimario";
import FormularioEdicionAula from "./FormularioEdicionAula";
import ModalConfirmacion from "./ModalConfirmacion";

const AulaItem = ({ aulaId, numero, capacidad, ubicacion, computadoras, tieneProyector, estado, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    loading
  } = useBorrarAula(onDelete);

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

      <ModalConfirmacion
        abierto={showDeleteModal}
        mensaje={"¿Estás seguro de que deseas borrar esta aula?"}
        onConfirmar={() => handleDelete(aulaId)}
        onCancelar={() => setShowDeleteModal(false)}
        loading={loading}
      />
    </div>
  );
};

export default AulaItem;
