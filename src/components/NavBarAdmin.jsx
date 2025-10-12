import "./styles/NavBarAdmin.css";
import BotonPrimario from "./BotonPrimario";
import { useAuth } from "../contexts/useAuth";
export default function NavBarAdmin({ vista, onChange }) {
  const {  logout } = useAuth();
  return (
    <nav className="nav-admin">
         
      <div className="nav-admin-inner">
        <div className="nav-brand">Aulómetro</div>
        <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
        <div className="nav-admin-actions">
          <BotonPrimario
            className={`nav-admin-btn ${vista === "usuario" ? "active" : ""}`}
            onClick={() => onChange("usuario")}
          >
            Gestión de usuarios
          </BotonPrimario>

          <BotonPrimario
            className={`nav-admin-btn ${vista === "aula" ? "active" : ""}`}
            onClick={() => onChange("aula")}
          >
            Gestión de aulas
          </BotonPrimario>

          <BotonPrimario
            className={`nav-admin-btn ${vista === "reservas" ? "active" : ""}`}
            onClick={() => onChange("reservas")}
          >
            Reservas pendientes
          </BotonPrimario>
        </div>
      </div>
    </nav>
  );
}
