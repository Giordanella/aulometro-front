import "./styles/DocenteItem.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import BotonPrimario from "./BotonPrimario";
import { useState } from "react";
import FormularioEdicionUsuario from "./FormularioEdicionUsuario";
import useBorrarItem from "../hooks/useBorrarItem";
import { deleteUserById } from "../api/users";
import ModalConfirmacion from "./ModalConfirmacion";

const DocenteItem = ({ docente, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    loading,
  } = useBorrarItem(deleteUserById, onDelete);

  if (isEditing) {
    return (
      <FormularioEdicionUsuario
        docente={docente}
        onUpdatedUsuario={(updated) => {
          onUpdate(updated);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="docente-item-container">
      <div className="docente-container">
        <span className="docente-data name">{docente.name}</span>
        <span className="docente-data email">{docente.email}</span>
      </div>
      <div className="buttons-container">
        <BotonPrimario type="button" onClick={() => setIsEditing(true)}>
          <img src={editIcon} />
        </BotonPrimario>
        <BotonPrimario>
          <img
            src={deleteIcon}
            type="button"
            onClick={() => setShowDeleteModal(true)}
          />
        </BotonPrimario>
        <ModalConfirmacion
          abierto={showDeleteModal}
          mensaje="¿Estás seguro de que deseas eliminar este usuario?"
          onConfirmar={() => handleDelete(docente.id)}
          onCancelar={() => setShowDeleteModal(false)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DocenteItem;
