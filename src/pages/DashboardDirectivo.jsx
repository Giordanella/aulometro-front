import { useEffect, useState } from "react";
import { getDocentes } from "../api/users";
import FormularioAlta from "../components/FormularioAlta";
import ListaDocentes from "../components/ListaDocentes";
import BotonPrimario from "../components/BotonPrimario";
import { useAuth } from "../contexts/AuthContext";
import "./styles/Home.css";

const Home = () => {
  const [docentes, setDocentes] = useState([]);
  const { logout } = useAuth();

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
      <h1>Dashboard Directivo</h1>
      <FormularioAlta setDocentes={setDocentes} />
      <ListaDocentes docentes={docentes} />
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default Home;
