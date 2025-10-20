import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import "./styles/ReservaItem.css";
import ModalConfirmacion from "./ModalConfirmacion";
import { rechazarReserva, rechazarReservaExamen } from "../api/reservas";

const DIA_LABEL = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ReservaItem = ({ reserva, numeroAula, onRechazo }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!reserva) {return null;}

  const formatFecha = (iso) => {
    if (!iso || typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {return iso || "";}
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const formatHora = (h) => (typeof h === "string" ? h.slice(0, 5) : h);

  const isExamen = reserva.fecha && (reserva.mesa || reserva.materia);

  const rechazar = async () => {
    setLoading(true);
    try {
      const motivo = "Liberación de aula";
      if (isExamen) {
        await rechazarReservaExamen(reserva.id, motivo);
      } else {
        await rechazarReserva(reserva.id, motivo);
      }
      if (onRechazo) {onRechazo(null, reserva.id);} // null = sin error
    } catch (error) {
      if (onRechazo) {onRechazo(error, reserva.id);}
    } finally {
      setLoading(false);
      setMostrarConfirmacion(false);
    }
  };

  return (
    <div className="reserva-card">
      <div className="reserva-info">
        <div className="reserva-aula">Aula {numeroAula}</div>

        {isExamen ? (
          <>
            <div className="reserva-detalle">
              <span className="reserva-badge reserva-examen">Examen</span>
            </div>
            <div className="reserva-detalle">{formatFecha(reserva.fecha)}</div>
            <div className="reserva-detalle">
              {formatHora(reserva.horaInicio)}–{formatHora(reserva.horaFin)}
            </div>
            <div className="reserva-obs">
              {reserva.materia} {reserva.mesa ? `- ${reserva.mesa}` : ""}
            </div>
          </>
        ) : (
          <div className="reserva-detalle">
            {DIA_LABEL[reserva.diaSemana]} {formatHora(reserva.horaInicio)}–{formatHora(reserva.horaFin)}
          </div>
        )}

        {reserva.observaciones && <div className="reserva-obs">{reserva.observaciones}</div>}
      </div>

      <div className="reserva-actions">
        <span className={`reserva-badge reserva-${(reserva.estado || "").toLowerCase()}`}>
          {reserva.estado}
        </span>

        <BotonPrimario onClick={() => setMostrarConfirmacion(true)}>Rechazar</BotonPrimario>
      </div>

      <ModalConfirmacion
        abierto={mostrarConfirmacion}
        mensaje="¿Estás seguro de que querés rechazar esta reserva?"
        onConfirmar={rechazar}
        onCancelar={() => setMostrarConfirmacion(false)}
        loading={loading}
        confirmLabel="Rechazar"
        cancelLabel="Cancelar"
      />
    </div>
  );
};

export default ReservaItem;
