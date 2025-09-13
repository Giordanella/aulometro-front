import "./styles/AulaItem.css";

const AulaItem = ({ numeroAula, capacidad, ubicacion, cantidadComputadoras, tieneProyector, franjaHoraria }) => {
  return (
    <div className="aula-container">
      <span className="aula-data numeroAula">{numeroAula}</span>
      <span className="aula-data capacidad">{capacidad}</span>
      <span className="aula-data numeroAula">{ubicacion}</span>
      <span className="aula-data capacidad">{cantidadComputadoras}</span>
      <span className="aula-data numeroAula">{tieneProyector ? "Sí" : "No"}</span>
      <span className="aula-data capacidad">{franjaHoraria}</span>
    </div>
  );
};

export default AulaItem;
