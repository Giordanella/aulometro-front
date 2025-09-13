import { useEffect, useState } from "react";
import { getDocentes } from "../api/users";
import FormularioAltaUsuario from "../components/FormularioAltaUsuario";
import FormularioAltaAula from "../components/FormularioAltaAula";
import ListaDocentes from "../components/ListaDocentes";
import BotonPrimario from "../components/BotonPrimario";
import { useAuth } from "../contexts/useAuth";
import "./styles/Home.css";
import SelectorFormulario from "../components/SelectorFormulario";
import ListaAulas from "../components/ListaAulas";
import { getAulas } from "../api/aulas";

const Home = () => {
  const [docentes, setDocentes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [formularioActivo, setFormularioActivo] = useState("usuario");
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

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await getAulas();
        setAulas(response.data);
      } catch (error) {
        console.error("Error al obtener aulas:", error);
      }
    };

    fetchAulas();
  }, []);

  return (
    <div className="home-container">
      <h1>Dashboard Directivo</h1>
      <SelectorFormulario
        formularioActivo={formularioActivo}
        setFormularioActivo={setFormularioActivo}
      />
      {formularioActivo === "usuario" ? (
        <div className="home-container">
          <FormularioAltaUsuario setDocentes={setDocentes} />
          <ListaDocentes docentes={docentes} />
        </div>
      ) : (
        <div className="home-container">
          <FormularioAltaAula setAulas={setAulas} />
          <ListaAulas aulas={aulas} />
        </div>
      )}
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default Home;
