import AulaItem from "./AulaItem";
import "./styles/ListaAulas.css";

const ListaAulas = ({ aulas, setAulas, title, msg = "No hay aulas disponibles." }) => {

  const handleUpdateAula = (updatedAula) => {
    setAulas((prevAulas) =>
      prevAulas.map((aula) =>
        aula.id === updatedAula.id ? {...aula, ...updatedAula} : aula
      )
    );
  };

  const handleDeleteAula = (aulaId) => {
    setAulas((prevAulas) => prevAulas.filter((aula) => aula.id !== aulaId));
  };

  return (
    <div className="aulas-container">
      {title && <h1>{title}</h1>}
      {aulas.length === 0 ? (
        <p className="aulas-empty-message">{msg}</p>
      ) : (
        aulas.map((aula) => (
          <AulaItem
            key={aula.id}
            aulaId={aula.id}
            numero={aula.numero}
            ubicacion={aula.ubicacion}
            capacidad={aula.capacidad}
            computadoras={aula.computadoras}
            tieneProyector={aula.tieneProyector}
            estado={aula.estado}
            onUpdate={handleUpdateAula}
            onDelete={handleDeleteAula}
          />
        ))
      )}
    </div>
  );
};

export default ListaAulas;
