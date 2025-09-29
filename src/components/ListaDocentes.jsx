import DocenteItem from "./DocenteItem";
import "./styles/ListaDocentes.css";

const ListaDocentes = ({ docentes, setDocentes }) => {

  const handleUpdateDocente = (updatedDocente) => {
    setDocentes((prevDocentes) =>
      prevDocentes.map((docente) =>
        docente.id === updatedDocente.id ? { ...docente, ...updatedDocente } : docente
      )
    );
  };

  const handleDeleteDocente = (docenteId) => {
    setDocentes((prevDocentes) =>
      prevDocentes.filter((docente) => docente.id !== docenteId)
    );
  };

  return (
    <div className="docentes-container">
      <h1>Docentes</h1>

      {docentes.length === 0 ? (
        <p className="docentes-empty-message">No hay docentes disponibles.</p>
      ) : (
        docentes.map((docente) => (
          <DocenteItem
            key={docente.id}
            docente={docente}
            onUpdate={handleUpdateDocente}
            onDelete={handleDeleteDocente}
          />
        ))
      )}
    </div>
  );
};

export default ListaDocentes;
