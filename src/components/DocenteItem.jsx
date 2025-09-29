import "./styles/DocenteItem.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import BotonPrimario from "./BotonPrimario";
import { useState } from "react";
import FormularioEdicionUsuario from "./FormularioEdicionUsuario";

const DocenteItem = ({ docente, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

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
          <img src={deleteIcon} />
        </BotonPrimario>
      </div>
    </div>
  );
};

export default DocenteItem;
