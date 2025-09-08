import DocenteItem from "./DocenteItem";
import "./styles/ListaDocentes.css";

const ListaDocentes = ({ docentes }) => {
  return (
    <div className="docentes-container">
      <h1>Docentes</h1>

      {docentes.length === 0 ? (
        <p className="docentes-empty-message">No hay docentes disponibles.</p>
      ) : (
        docentes.map((docente) => (
          <DocenteItem
            key={docente.id}
            name={docente.name}
            email={docente.email}
          />
        ))
      )}
    </div>
  );
};

export default ListaDocentes;
