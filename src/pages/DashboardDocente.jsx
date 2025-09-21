import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";
import ListaAulas from "../components/ListaAulas";
import { useLista } from "../hooks/useLista.jsx";
import "./styles/Home.css";
import DataLoader from "../components/DataLoader.jsx";
import { getAulas } from "../api/aulas";
import BusquedaAulas from "../components/BusquedaAulas.jsx";

const DashboardDirectivo = () => {
  const { user, logout } = useAuth();
  const { items: aulas, fetchItems: fetchAulas } = useLista(getAulas);

  return (
    <div className="home-container">
      <h1>Bienvenido/a {user?.role}</h1>
      <BusquedaAulas />
      <DataLoader fetchData={fetchAulas} fallbackLoading="Cargando aulas..." fallbackError="Error al cargar aulas">
        <ListaAulas aulas={aulas} title="Lista de aulas" />
      </DataLoader>
      <p>Has ingresado con tu email {user?.email}</p>
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default DashboardDirectivo;
