import DocenteItem from "./DocenteItem";
import "./styles/ListaDocentes.css";

const ejemplos = [
  { name: "Pepe Sánchez", email: "pepe.sanchez@ejemplo.com" },
  { name: "Laura Gómez", email: "laura.gomez@ejemplo.com" },
  { name: "Carlos Ramírez", email: "carlos.ramirez@ejemplo.com" },
  { name: "Ana Torres", email: "ana.torres@ejemplo.com" },
  { name: "Miguel Díaz", email: "miguel.diaz@ejemplo.com" },
  { name: "Sofía Méndez", email: "sofia.mendez@ejemplo.com" },
];

const ListaDocentes = ({ docentes }) => {
  return (
    <div className="docentes-container">
      <h1>Docentes</h1>
      {ejemplos.map((docente, index) => (
        <DocenteItem
          key={index}
          name={docente.name}
          email={docente.email}
        />
      ))}
    </div>
  );
};

export default ListaDocentes;
