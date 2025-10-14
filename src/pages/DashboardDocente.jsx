import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";
import ListaAulas from "../components/ListaAulas";
import { useLista } from "../hooks/useLista.jsx";
import DataLoader from "../components/DataLoader.jsx";
import Ruedita from "../components/Ruedita.jsx";
import { getAulas } from "../api/aulas";
import { getMisReservas, cancelarReserva, cancelarReservaExamen } from "../api/reservas";
import "./styles/Home.css";
import "./styles/Reservas.css";
import NavBar from "../components/NavBar.jsx";

const DIA_LABEL = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const getMisReservasRows = () =>
  getMisReservas().then(({ data }) => ({
    data: { rows: Array.isArray(data) ? data : (data?.rows ?? []) },
  }));

const DashboardDirectivo = () => {
  const { user } = useAuth();
  const [vista, setVista] = useState("aulas");
  const { items: aulas, fetchItems: fetchAulas } = useLista(getAulas);

  const { items: reservas, setItems: setReservas, fetchItems: fetchReservas } =
    useLista(getMisReservasRows);

  const [msg, setMsg] = useState("");

  async function onCancelar(r) {
    try {
      if (r.tipo === "EXAMEN") {
        await cancelarReservaExamen(r.id);
      } else {
        await cancelarReserva(r.id);
      }
      setReservas((prev) => prev.map((x) => (x.id === r.id ? { ...x, estado: "CANCELADA" } : x)));
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo cancelar.");
    }
  }

  const aulaNumMap = Object.fromEntries((aulas || []).map((a) => [a.id, a.numero]));
  const formatFecha = (iso) => {
    if (!iso || typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {return iso || "";}
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <>
 
      <NavBar vista={vista} onChange={setVista} />

      <div className="home-container">
        <h1>Bienvenido/a {user?.role}</h1>

        {vista === "aulas" && (
          <>
          
            <DataLoader fetchData={fetchAulas} fallbackLoading={<Ruedita />} fallbackError="Error al cargar aulas">
              <ListaAulas aulas={aulas} title="Lista de aulas" />
            </DataLoader>
          </>
        )}

        {vista === "reservas" && (
          <div className="reservas-container">
            {msg && <p className="reservas-error">{msg}</p>}
            <DataLoader fetchData={fetchReservas} fallbackLoading={<Ruedita />} fallbackError="Error al cargar reservas">
              {!reservas?.length && <p className="reservas-empty">No tenés reservas.</p>}
              <div className="reservas-list">
                {(reservas || []).map((r) => (
                  <div key={r.id} className="reserva-card">
                    <div className="reserva-info">
                      <div className="reserva-aula">Aula {aulaNumMap[r.aulaId] ?? r.aulaId}</div>
                      {r.tipo === "EXAMEN" ? (
                        <>
                          <div className="reserva-detalle">
                            {formatFecha(r.fecha)}
                          </div>
                          <div className="reserva-detalle">
                            {r.horaInicio}–{r.horaFin}
                          </div>
                          <div className="reserva-obs">
                            {r.materia} {r.mesa ? `- ${r.mesa}` : ""}
                          </div>
                        </>
                      ) : (
                        <div className="reserva-detalle">
                          {DIA_LABEL[r.diaSemana]} {r.horaInicio}–{r.horaFin}
                        </div>
                      )}
                      {r.observaciones && <div className="reserva-obs">{r.observaciones}</div>}
                    </div>
                    <div className="reserva-actions">
                      <span className={`reserva-badge reserva-${r.estado?.toLowerCase()}`}>{r.estado}</span>
                      {(r.estado === "PENDIENTE" || r.estado === "APROBADA") && (
                        <BotonPrimario onClick={() => onCancelar(r)}>Cancelar</BotonPrimario>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DataLoader>
          </div>
        )}

        <p>Has ingresado con tu email {user?.email}</p>
        
      </div>
    </>
  );
};

export default DashboardDirectivo;
