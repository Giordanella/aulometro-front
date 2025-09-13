import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";
import ListaAulas from "../components/ListaAulas";
import { useListaAulas } from "../hooks/useListaAulas";
import "./styles/Home.css";
import DataLoader from "../components/DataLoader.jsx";

const DashboardDirectivo = () => {
  const { user, logout } = useAuth();
  const { aulas, loading, error } = useListaAulas();

  return (
    <div className="home-container">
      <h1>Bienvenido/a {user?.role}</h1>
      <h2>Lista de Aulas</h2>
      <DataLoader loading={loading} error={error}>
        <ListaAulas aulas={aulas} />
      </DataLoader>
      <p>Has ingresado con tu email {user?.email}</p>
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default DashboardDirectivo;
