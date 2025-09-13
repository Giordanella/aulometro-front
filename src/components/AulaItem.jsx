import "./styles/AulaItem.css";

const AulaItem = ({ numeroAula, capacidad, ubicacion, cantidadComputadoras, tieneProyector, franjaHoraria }) => {
  return (
    <div className="aula-container">
      <span className="numeroAula">Aula {numeroAula}</span>
      <span className="aula-data">Capacidad: {capacidad}</span>
      <span className="aula-data">{ubicacion}</span>
      <span className="aula-data">Cantidad de computadoras: {cantidadComputadoras}</span>
      <span className="aula-data">Con proyector: {tieneProyector ? "Sí" : "No"}</span>
      <span className="franjaHoraria">Estado: {franjaHoraria}</span>
    </div>
  );
};

export default AulaItem;
