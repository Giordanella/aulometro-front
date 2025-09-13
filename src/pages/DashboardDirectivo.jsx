import { useEffect, useState } from "react";
import { getDocentes } from "../api/users";
import FormularioAltaUsuario from "../components/FormularioAltaUsuario";
import FormularioAltaAula from "../components/FormularioAltaAula";
import ListaDocentes from "../components/ListaDocentes";
import BotonPrimario from "../components/BotonPrimario";
import { useAuth } from "../contexts/useAuth";
import "./styles/Home.css";
import SelectorFormulario from "../components/SelectorFormulario";

const Home = () => {
  const [docentes, setDocentes] = useState([]);
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

  // Simulación: función para cuando se crea un aula
  const handleAulaCreada = (aula) => {
    alert(`Aula creada: ${aula.nombre} (capacidad: ${aula.capacidad})`);
    // Aquí podrías actualizar una lista de aulas si la tuvieras
  };

  return (
    <div className="home-container">
      <h1>Dashboard Directivo</h1>
      <SelectorFormulario
        formularioActivo={formularioActivo}
        setFormularioActivo={setFormularioActivo}
      />
      {formularioActivo === "usuario" ? (
        <FormularioAltaUsuario setDocentes={setDocentes} />
      ) : (
        <FormularioAltaAula onAulaCreada={handleAulaCreada} />
      )}
      <ListaDocentes docentes={docentes} />
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default Home;
