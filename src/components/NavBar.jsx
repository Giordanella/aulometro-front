import BotonPrimario from "./BotonPrimario";
import "./styles/NavBar.css";
import BusquedaAulas from "../components/BusquedaAulas.jsx";
import { useAuth } from "../contexts/useAuth";
export default function NavBar({ vista, onChange }) {
  const {  logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-inner">
   
        <div className="nav-left">
          <div className="nav-brand">Aulómetro</div>
        </div>

   
        <div className="nav-center">
          <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
          <div className="nav-search-wrap">
            <BusquedaAulas />
          </div>
        </div>

        <div className="nav-right">
          <BotonPrimario
            className={`nav-btn ${vista === "aulas" ? "active" : ""}`}
            onClick={() => onChange("aulas")}
          >
            Aulas
          </BotonPrimario>

          <BotonPrimario
            className={`nav-btn ${vista === "reservas" ? "active" : ""}`}
            onClick={() => onChange("reservas")}
          >
            Mis reservas
          </BotonPrimario>
        </div>
      </div>
    </nav>
  );
}
