import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import BotonPrimario from "../components/BotonPrimario";
import ListaAulas from "../components/ListaAulas";
import { useLista } from "../hooks/useLista.jsx";
import DataLoader from "../components/DataLoader.jsx";
import Ruedita from "../components/Ruedita.jsx";
import BusquedaAulas from "../components/BusquedaAulas.jsx";
import { getAulas } from "../api/aulas";
import { getMisReservas, cancelarReserva } from "../api/reservas";
import "./styles/Home.css";
import "./styles/Reservas.css";

const DIA_LABEL = [
  "",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const getMisReservasRows = () =>
  getMisReservas().then(({ data }) => ({
    data: { rows: Array.isArray(data) ? data : (data?.rows ?? []) },
  }));
const DashboardDirectivo = () => {
  const { user, logout } = useAuth();
  const [vista, setVista] = useState("aulas");
  const { items: aulas, fetchItems: fetchAulas } = useLista(getAulas);

  const {
    items: reservas,
    setItems: setReservas,
    fetchItems: fetchReservas,
  } = useLista(getMisReservasRows);
  const [msg, setMsg] = useState("");
  async function onCancelar(id) {
    try {
      await cancelarReserva(id);
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: "CANCELADA" } : r))
      );
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo cancelar.");
    }
  }
  return (
    <div className="home-container">
      <h1>Bienvenido/a {user?.role}</h1>
      <div
        className="home-actions"
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <BotonPrimario onClick={() => setVista("aulas")}>Aulas</BotonPrimario>
        <BotonPrimario onClick={() => setVista("reservas")}>
          Mis reservas
        </BotonPrimario>
      </div>
      {vista === "aulas" && (
        <>
          <BusquedaAulas />
          <DataLoader
            fetchData={fetchAulas}
            fallbackLoading={<Ruedita />}
            fallbackError="Error al cargar aulas"
          >
            <ListaAulas aulas={aulas} title="Lista de aulas" />
          </DataLoader>
        </>
      )}
      {vista === "reservas" && (
        <div className="reservas-container">
          {msg && <p className="reservas-error">{msg}</p>}
          <DataLoader
            fetchData={fetchReservas}
            fallbackLoading={<Ruedita />}
            fallbackError="Error al cargar reservas"
          >
            {!reservas?.length && (
              <p className="reservas-empty">No tenés reservas.</p>
            )}

            <div className="reservas-list">
              {(reservas || []).map((r) => (
                <div key={r.id} className="reserva-card">
                  <div className="reserva-info">
                    <div className="reserva-aula">Aula #{r.aulaId}</div>
                    <div className="reserva-detalle">
                      {DIA_LABEL[r.diaSemana]} {r.horaInicio}–{r.horaFin}
                    </div>
                    {r.observaciones && (
                      <div className="reserva-obs">{r.observaciones}</div>
                    )}
                  </div>

                  <div className="reserva-actions">
                    <span
                      className={`reserva-badge reserva-${r.estado?.toLowerCase()}`}
                    >
                      {r.estado}
                    </span>
                    {(r.estado === "PENDIENTE" || r.estado === "APROBADA") && (
                      <BotonPrimario onClick={() => onCancelar(r.id)}>
                        Cancelar
                      </BotonPrimario>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DataLoader>
        </div>
      )}

      <p>Has ingresado con tu email {user?.email}</p>
      <BotonPrimario onClick={logout}>Cerrar sesión</BotonPrimario>
    </div>
  );
};

export default DashboardDirectivo;
