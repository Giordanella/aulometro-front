import { useState } from "react";
import { getDocentes } from "../api/users";
import { getAulas } from "../api/aulas";
import FormularioAltaUsuario from "../components/FormularioAltaUsuario";
import FormularioAltaAula from "../components/FormularioAltaAula";
import ListaDocentes from "../components/ListaDocentes";
import BotonPrimario from "../components/BotonPrimario";
import { useAuth } from "../contexts/useAuth";
import "./styles/Home.css";
import SelectorFormulario from "../components/SelectorFormulario";
import ListaAulas from "../components/ListaAulas";
import { useLista } from "../hooks/useLista.jsx";
import DataLoader from "../components/DataLoader.jsx";


const Home = () => {
  const { items: aulas, setItems: setAulas, fetchItems: fetchAulas } = useLista(getAulas);
  const { items: docentes, setItems: setDocentes, fetchItems: fetchDocentes } = useLista(getDocentes);
  const [formularioActivo, setFormularioActivo] = useState("usuario");
  const { logout } = useAuth();

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
          <DataLoader fetchData={fetchDocentes} fallbackLoading="Cargando docentes..." fallbackError="Error al cargar docentes">
            <ListaDocentes docentes={docentes} />
          </DataLoader>
        </div>
      ) : (
        <div className="home-container">
          <FormularioAltaAula setAulas={setAulas} />
          <DataLoader fetchData={fetchAulas} fallbackLoading="Cargando aulas..." fallbackError="Error al cargar aulas">
            <ListaAulas aulas={aulas} setAulas={setAulas} />
          </DataLoader>
        </div>
      )}
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default Home;
