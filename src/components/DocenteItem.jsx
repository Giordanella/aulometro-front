import "./styles/DocenteItem.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import BotonPrimario from "./BotonPrimario";

const DocenteItem = ({ name, email }) => {
  return (
    <div className="docente-item-container">
      <div className="docente-container">
        <span className="docente-data name">{name}</span>
        <span className="docente-data email">{email}</span>
      </div>
      <div className="buttons-container">
        <BotonPrimario>
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
