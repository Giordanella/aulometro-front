import "./styles/DocenteItem.css";

const DirectivoItem = ({ directivo }) => {
  return (
    <div className="docente-item-container">
      <div className="docente-container">
        <span className="docente-data name">{directivo.name}</span>
        <span className="docente-data email">{directivo.email}</span>
      </div>
    </div>
  );
};

export default DirectivoItem;
