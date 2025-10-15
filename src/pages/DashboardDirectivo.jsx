// src/pages/DashboardDirectivo.jsx
import { useState } from "react";
import { getDocentes } from "../api/users";
import { getAulas } from "../api/aulas";
import {
  getPendientes,
  aprobarReserva,
  rechazarReserva,
  aprobarReservaExamen,
  rechazarReservaExamen,
} from "../api/reservas";
import FormularioAltaUsuario from "../components/FormularioAltaUsuario";
import FormularioAltaAula from "../components/FormularioAltaAula";
import ListaDocentes from "../components/ListaDocentes";
import ListaAulas from "../components/ListaAulas";
import BotonPrimario from "../components/BotonPrimario";
import CampoFormulario from "../components/CampoFormulario";
import ModalConfirmacion from "../components/ModalConfirmacion";
import DataLoader from "../components/DataLoader.jsx";
import Ruedita from "../components/Ruedita.jsx";

import { useLista } from "../hooks/useLista.jsx";
import "./styles/Home.css";
import "./styles/Reservas.css";
import Navbar from "../components/Navbar.jsx";

const getPendientesRows = () =>
  getPendientes().then(({ data }) => ({
    data: { rows: Array.isArray(data) ? data : (data?.rows ?? []) },
  }));

const DashboardDirectivo = () => {
  

  
  const [vista, setVista] = useState("usuarios"); 

 
  const {
    items: aulas,
    setItems: setAulas,
    fetchItems: fetchAulas,
  } = useLista(getAulas);


  const {
    items: docentes,
    setItems: setDocentes,
    fetchItems: fetchDocentes,
  } = useLista(getDocentes);

  const {
    items: pendientes,
    setItems: setPendientes,
    fetchItems: fetchPendientes,
  } = useLista(getPendientesRows);
  const [motivos, setMotivos] = useState({});
  const [rechazoAbierto, setRechazoAbierto] = useState(null); // guarda reserva r a rechazar o null
  const [rechazando, setRechazando] = useState(false);
  const [msg, setMsg] = useState("");

  const aulaNumMap = Object.fromEntries((aulas || []).map((a) => [a.id, a.numero]));
  const formatFecha = (iso) => {
    if (!iso || typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {return iso || "";}
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };
  const formatHora = (h) => (typeof h === "string" ? h.slice(0,5) : h);

  async function onAprobar(r) {
    try {
      if (r.tipo === "EXAMEN") {
        await aprobarReservaExamen(r.id);
      } else {
        await aprobarReserva(r.id);
      }
      setPendientes((prev) => prev.filter((x) => x.id !== r.id));
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo aprobar.");
    }
  }

  async function onRechazarConfirmado() {
    if (!rechazoAbierto) {return;}
    try {
      setRechazando(true);
      const r = rechazoAbierto;
      const motivo = motivos[r.id] || "";
      if (r.tipo === "EXAMEN") {
        await rechazarReservaExamen(r.id, motivo);
      } else {
        await rechazarReserva(r.id, motivo);
      }
      setPendientes((prev) => prev.filter((x) => x.id !== r.id));
      setRechazoAbierto(null);
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo rechazar.");
    } finally {
      setRechazando(false);
    }
  }
  

  return (
    <>
      <Navbar vista={vista} setVista={setVista} />
      <div className="home-container">
        <h1>Dashboard Directivo</h1>
        {vista === "usuarios" && (
          <div className="home-container">
            <FormularioAltaUsuario setDocentes={setDocentes} />
            <DataLoader
              fetchData={fetchDocentes}
              fallbackLoading={<Ruedita />}
              fallbackError="Error al cargar docentes"
            >
              <ListaDocentes docentes={docentes} setDocentes={setDocentes} />
            </DataLoader>
          </div>
        )}

        {vista === "aulas" && (
          <div className="home-container">
            <FormularioAltaAula
              onAulaCreada={(nuevaAula) =>
                setAulas((prev) => [...prev, nuevaAula])
              }
            />
            <DataLoader
              fetchData={fetchAulas}
              fallbackLoading={<Ruedita />}
              fallbackError="Error al cargar aulas"
            >
              <ListaAulas aulas={aulas} setAulas={setAulas} title="Aulas" />
            </DataLoader>
          </div>
        )}

        {vista === "reservas" && (
          <div className="home-container">
            {msg && <p className="reservas-error">{msg}</p>}
            {/* Cargamos aulas primero para poder mostrar el número */}
            <DataLoader fetchData={fetchAulas} fallbackLoading={<Ruedita />} fallbackError="Error al cargar aulas">
              <DataLoader
                fetchData={fetchPendientes}
                fallbackLoading={<Ruedita />}
                fallbackError="Error al cargar pendientes"
              >
                {!pendientes?.length && (
                  <p className="reservas-empty">No hay pendientes.</p>
                )}

                <div className="reservas-list">
                  {(pendientes || []).map((r) => (
                    <div key={r.id} className="reserva-card">
                      <div className="reserva-info">
                        <div className="reserva-aula">Aula {aulaNumMap[r.aulaId] ?? r.aulaId}</div>
                        {r.tipo === "EXAMEN" ? (
                          <>
                            <div className="reserva-detalle">
                              <span className="reserva-badge reserva-examen">Examen</span>
                            </div>
                            <div className="reserva-detalle">
                              {formatFecha(r.fecha)}
                            </div>
                            <div className="reserva-detalle">
                              {formatHora(r.horaInicio)}–{formatHora(r.horaFin)}
                            </div>
                            <div className="reserva-obs">
                              {r.materia} {r.mesa ? `- ${r.mesa}` : ""}
                            </div>
                          </>
                        ) : (
                          <div className="reserva-detalle">
                            {[
                              "",
                              "Lunes",
                              "Martes",
                              "Miércoles",
                              "Jueves",
                              "Viernes",
                              "Sábado",
                              "Domingo",
                            ][r.diaSemana]} {formatHora(r.horaInicio)}–{formatHora(r.horaFin)}
                          </div>
                        )}
                        {r.observaciones && (
                          <div className="reserva-obs">{r.observaciones}</div>
                        )}
                      </div>

                      <div className="reserva-actions">
                        <div className="reserva-buttons">
                          <BotonPrimario onClick={() => onAprobar(r)}>
                          Aprobar
                          </BotonPrimario>
                          <BotonPrimario onClick={() => setRechazoAbierto(r)}>
                          Rechazar
                          </BotonPrimario>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DataLoader>
            </DataLoader>
            <ModalConfirmacion
              abierto={!!rechazoAbierto}
              mensaje={rechazoAbierto?.tipo === "EXAMEN" ? "¿Seguro que desea rechazar la solicitud de reserva de examen?" : "¿Seguro que desea rechazar la solicitud de reserva?"}
              onConfirmar={onRechazarConfirmado}
              onCancelar={() => setRechazoAbierto(null)}
              loading={rechazando}
              confirmLabel="Rechazar"
              cancelLabel="Cancelar"
            >
              <CampoFormulario
                placeholder="Motivo del rechazo (opcional)"
                name={`motivo_${rechazoAbierto?.id ?? ""}`}
                as="textarea"
                value={(rechazoAbierto && motivos[rechazoAbierto.id]) || ""}
                onChange={(e) =>
                  setMotivos((m) => ({ ...m, [rechazoAbierto.id]: e.target.value }))
                }
              />
            </ModalConfirmacion>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardDirectivo;
