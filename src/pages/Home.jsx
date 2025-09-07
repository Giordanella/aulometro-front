import { useEffect, useState } from "react";
import { getDocentes } from "../api/users";
import FormularioAlta from "../components/FormularioAlta";
import ListaDocentes from "../components/ListaDocentes";
import "./styles/Home.css";

function Home() {
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
    <div className="home-container">
      <h1>Dashboard</h1>
      <FormularioAlta setDocentes={setDocentes} />
      <ListaDocentes docentes={docentes} />
    </div>
  );
}

export default Home;
