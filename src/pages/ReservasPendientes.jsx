import { useEffect, useState } from "react";
import BotonPrimario from "../components/BotonPrimario";
import CampoFormulario from "../components/CampoFormulario";
import Ruedita from "../components/Ruedita";
import {
  aprobarReserva,
  getPendientes,
  rechazarReserva,
} from "../api/reservas";
import "./styles/Reservas.css";

const DIA_LABEL = [
  "",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function ReservasPendientes() {
  const [items, setItems] = useState([]);
  const [motivos, setMotivos] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPendientes();
        setItems(data);
      } catch (e) {
        setMsg(
          e?.response?.data?.error || e.message || "Error al cargar pendientes."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onAprobar(id) {
    try {
      await aprobarReserva(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo aprobar.");
    }
  }

  async function onRechazar(id) {
    try {
      await rechazarReserva(id, motivos[id] || "");
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo rechazar.");
    }
  }

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Reservas pendientes</h1>
      {msg && <p className="reservas-error">{msg}</p>}
      {loading && <Ruedita />}

      {!loading && !items.length && (
        <p className="reservas-empty">No hay pendientes.</p>
      )}

      <div className="reservas-list">
        {items.map((r) => (
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
                <BotonPrimario onClick={() => onAprobar(r.id)}>
                  Aprobar
                </BotonPrimario>
                <BotonPrimario onClick={() => onRechazar(r.id)}>
                  Rechazar
                </BotonPrimario>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
