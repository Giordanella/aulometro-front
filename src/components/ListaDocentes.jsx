import { useEffect, useState } from "react";
import { getDocentes } from "../api/users";
import DocenteItem from "./DocenteItem";
import "./styles/ListaDocentes.css";

const ListaDocentes = () => {
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await getDocentes();
        setDocentes(response.data.rows);
      } catch (error) {
        console.error("Error al obtener docentes:", error);
      }
    };

    fetchDocentes();
  }, []);

  return (
    <div className="docentes-container">
      <h1>Docentes</h1>
      {docentes.length === 0 ? (
        <p>No hay docentes disponibles.</p>
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
