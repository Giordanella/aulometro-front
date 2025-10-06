import { useEffect, useState } from "react";
import BotonPrimario from "../components/BotonPrimario";
import Ruedita from "../components/Ruedita";
import { cancelarReserva, getMisReservas } from "../api/reservas";
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

export default function MisReservas() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMisReservas();
        setItems(data);
      } catch (e) {
        setMsg(
          e?.response?.data?.error || e.message || "Error al cargar reservas."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onCancelar(id) {
    try {
      await cancelarReserva(id);
      setItems((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: "CANCELADA" } : r))
      );
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message || "No se pudo cancelar.");
    }
  }

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Mis reservas</h1>
      {msg && <p className="reservas-error">{msg}</p>}
      {loading && <Ruedita />}

      {!loading && !items.length && (
        <p className="reservas-empty">No tenés reservas.</p>
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
    </div>
  );
}
