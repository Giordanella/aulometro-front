import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";
import ListaAulas from "../components/ListaAulas";
import { useLista } from "../hooks/useLista.jsx";
import "./styles/Home.css";
import DataLoader from "../components/DataLoader.jsx";
import { getAulas } from "../api/aulas";
import BusquedaAulas from "../components/BusquedaAulas.jsx";
import Ruedita from "../components/Ruedita.jsx";
import { Link } from "react-router-dom";

const DashboardDirectivo = () => {
  const { user, logout } = useAuth();
  const { items: aulas, fetchItems: fetchAulas } = useLista(getAulas);

  return (
    <div className="home-container">
      <h1>Bienvenido/a {user?.role}</h1>
      <BotonPrimario as={Link} to="/reservas/mias">
        Ver reservas
      </BotonPrimario>
      <BusquedaAulas />
      <DataLoader
        fetchData={fetchAulas}
        fallbackLoading={<Ruedita />}
        fallbackError="Error al cargar aulas"
      >
        <ListaAulas aulas={aulas} title="Lista de aulas" />
      </DataLoader>
      <p>Has ingresado con tu email {user?.email}</p>
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default DashboardDirectivo;
