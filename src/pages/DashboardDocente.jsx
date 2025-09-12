import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";

const DashboardDirectivo = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido {user?.email}</h1>
      <p>Tu rol es: {user?.role}</p>
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default DashboardDirectivo;
