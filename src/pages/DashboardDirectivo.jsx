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
import DataLoader from "../components/DataLoader.jsx";
import Ruedita from "../components/Ruedita.jsx";

import { useLista } from "../hooks/useLista.jsx";
import "./styles/Home.css";
import "./styles/Reservas.css";
import NavBarAdmin from "../components/NavBarAdmin";

const getPendientesRows = () =>
  getPendientes().then(({ data }) => ({
    data: { rows: Array.isArray(data) ? data : (data?.rows ?? []) },
  }));

const DashboardDirectivo = () => {
  

  
  const [vista, setVista] = useState("usuario"); 

 
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
  const [msg, setMsg] = useState("");

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

  async function onRechazar(r) {
    try {
      if (r.tipo === "EXAMEN") {
        await rechazarReservaExamen(r.id, motivos[r.id] || "");
      } else {
        await rechazarReserva(r.id, motivos[r.id] || "");
      }
      setPendientes((prev) => prev.filter((x) => x.id !== r.id));
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo rechazar.");
    }
  }
  

  return (
    <div className="home-container">
      <NavBarAdmin vista={vista} onChange={setVista} />
      <h1>Dashboard Directivo</h1>

     

      {vista === "usuario" && (
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

      {vista === "aula" && (
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
                    <div className="reserva-aula">Aula #{r.aulaId}</div>
                    {r.tipo === "EXAMEN" ? (
                      <>
                        <div className="reserva-detalle">
                          {new Date(r.fecha + "T00:00:00").toLocaleDateString()}
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
                        {[
                          "",
                          "Lunes",
                          "Martes",
                          "Miércoles",
                          "Jueves",
                          "Viernes",
                          "Sábado",
                          "Domingo",
                        ][r.diaSemana]} {r.horaInicio}–{r.horaFin}
                      </div>
                    )}
                    {r.observaciones && (
                      <div className="reserva-obs">{r.observaciones}</div>
                    )}
                  </div>

                  <div className="reserva-actions">
                    <CampoFormulario
                      placeholder="Motivo de rechazo (opcional)"
                      name={`motivo_${r.id}`}
                      as="textarea"
                      value={motivos[r.id] || ""}
                      onChange={(e) =>
                        setMotivos((m) => ({ ...m, [r.id]: e.target.value }))
                      }
                    />
                    <div className="reserva-buttons">
                      <BotonPrimario onClick={() => onAprobar(r)}>
                        Aprobar
                      </BotonPrimario>
                      <BotonPrimario onClick={() => onRechazar(r)}>
                        Rechazar
                      </BotonPrimario>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DataLoader>
        </div>
      )}

      
    </div>
  );
};

export default DashboardDirectivo;
