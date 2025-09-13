import AulaItem from "./AulaItem";
import "./styles/ListaAulas.css";

const ListaAulas = ({ aulas }) => {
  return (
    <div className="aulas-container">
      <h1>Aulas</h1>

      {aulas.length === 0 ? (
        <p className="aulas-empty-message">No hay aulas disponibles.</p>
      ) : (
        aulas.map((aula) => (
          <AulaItem
            key={aula.id}
            numeroAula={aula.numeroAula}
            email={aula.email}
            ubicacion={aula.ubicacion}
            capacidad={aula.capacidad}
            cantidadComputadoras={aula.cantidadComputadoras}
            tieneProyector={aula.tieneProyector}
            franjaHoraria={aula.franjaHoraria}
          />
        ))
      )}
    </div>
  );
};

export default ListaAulas;
