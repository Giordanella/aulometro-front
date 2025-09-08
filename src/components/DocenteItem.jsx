import "./styles/DocenteItem.css";

const DocenteItem = ({ name, email }) => {
  return (
    <div className="docente-container">
      <span className="docente-data name">{name}</span>
      <span className="docente-data email">{email}</span>
    </div>
  );
};

export default DocenteItem;
