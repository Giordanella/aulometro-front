// src/pages/DashboardDirectivo.jsx
import { useState, useEffect, useRef } from "react";
import { getDocentes, getUsers } from "../api/users";
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
import ListaDirectivos from "../components/ListaDirectivos";
import ListaAulas from "../components/ListaAulas";
import BotonPrimario from "../components/BotonPrimario";
import CampoFormulario from "../components/CampoFormulario";
import ModalConfirmacion from "../components/ModalConfirmacion";
import DataLoader from "../components/DataLoader.jsx";
import Ruedita from "../components/Ruedita.jsx";
import ReservaItem from "../components/ReservaItem.jsx";

import { useLista } from "../hooks/useLista.jsx";
import "./styles/Home.css";
import "./styles/Reservas.css";
import Navbar from "../components/Navbar.jsx";
import FormularioCambioClave from "../components/FormularioCambioClave.jsx";

const getPendientesRows = () =>
  getPendientes().then(({ data }) => ({
    data: { rows: Array.isArray(data) ? data : (data?.rows ?? []) },
  }));

const getDirectivosRows = () =>
  getUsers().then(({ data }) => ({
    data: {
      rows: (Array.isArray(data) ? data : data?.rows ?? []).filter(
        (u) => u.role === "DIRECTIVO"
      ),
    },
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
    items: directivos,
    fetchItems: fetchDirectivos,
  } = useLista(getDirectivosRows);

  const {
    items: pendientes,
    setItems: setPendientes,
    fetchItems: fetchPendientes,
  } = useLista(getPendientesRows);
  const [motivos, setMotivos] = useState({});
  const [rechazoAbierto, setRechazoAbierto] = useState(null); // guarda reserva r a rechazar o null
  const [rechazando, setRechazando] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState(""); // 'success' | 'error'
  const msgTimeoutRef = useRef(null);

  // Limpieza de timeout de mensajes al desmontar o cuando cambian
  useEffect(() => {
    return () => {
      if (msgTimeoutRef.current) {
        clearTimeout(msgTimeoutRef.current);
        msgTimeoutRef.current = null;
      }
    };
  }, []);

  const aulaNumMap = Object.fromEntries((aulas || []).map((a) => [a.id, a.numero]));
  const userMap = Object.fromEntries(
    ([...(docentes || []), ...(directivos || [])]).map((u) => [u.id, u])
  );
  // Nota: las tarjetas de pendientes usan el componente ReservaItem para formateo y layout

  async function onAprobar(r) {
    try {
      if (r.tipo === "EXAMEN") {
        await aprobarReservaExamen(r.id);
      } else {
        await aprobarReserva(r.id);
      }
      setPendientes((prev) => prev.filter((x) => x.id !== r.id));
      setMsg("Reserva aprobada correctamente.");
      setMsgTipo("success");
      if (msgTimeoutRef.current) { clearTimeout(msgTimeoutRef.current); }
      msgTimeoutRef.current = setTimeout(() => { setMsg(""); setMsgTipo(""); }, 5000);
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo aprobar.");
      setMsgTipo("error");
      if (msgTimeoutRef.current) { clearTimeout(msgTimeoutRef.current); }
      msgTimeoutRef.current = setTimeout(() => { setMsg(""); setMsgTipo(""); }, 7000);
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
      // Mensaje de éxito al rechazar
      setMsg("Reserva rechazada correctamente.");
      setMsgTipo("success");
      if (msgTimeoutRef.current) { clearTimeout(msgTimeoutRef.current); }
      msgTimeoutRef.current = setTimeout(() => { setMsg(""); setMsgTipo(""); }, 5000);
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo rechazar.");
      setMsgTipo("error");
      if (msgTimeoutRef.current) { clearTimeout(msgTimeoutRef.current); }
      msgTimeoutRef.current = setTimeout(() => { setMsg(""); setMsgTipo(""); }, 7000);
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
            <DataLoader
              fetchData={fetchDirectivos}
              fallbackLoading={<Ruedita />}
              fallbackError="Error al cargar directivos"
            >
              <ListaDirectivos directivos={directivos} />
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
            {msg && (
              <p className={`reservas-message ${msgTipo === "success" ? "success" : "error"}`}>
                {msg}
              </p>
            )}
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
                    <ReservaItem
                      key={`P-${r.id}`}
                      reserva={r}
                      numeroAula={aulaNumMap[r.aulaId] ?? r.aulaId}
                      mostrarAutor
                      autor={userMap[r.solicitanteId]}
                      modoPendiente
                      onAprobar={() => onAprobar(r)}
                      onRechazar={() => setRechazoAbierto(r)}
                    />
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

        {vista === "config" && (
          <div className="home-container">
            <FormularioCambioClave />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardDirectivo;
