import { useState } from "react";
import BotonPrimario from "./BotonPrimario";
import "./styles/ReservaItem.css";
import ModalConfirmacion from "./ModalConfirmacion";
import { liberarReserva, liberarReservaExamen } from "../api/reservas";

const DIA_LABEL = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/**
 * Componente de card reutilizable para mostrar una reserva (regular o examen).
 *
 * Props principales:
 * - reserva: objeto DTO de reserva (incluye solicitanteId, estado, etc.)
 * - numeroAula: número a mostrar en el encabezado
 * - onRechazo: callback(error, compositeId) cuando se descarta/libera una reserva aprobada
 * - mostrarAutor: si true, muestra "Solicitada por: nombre (email)" si hay datos
 * - autor: objeto opcional { name, email } correspondiente al solicitante
 */
const ReservaItem = ({
  reserva,
  numeroAula,
  onRechazo,
  mostrarAutor = false,
  autor = null,
  // Modo "pendiente": muestra botones Aprobar/Rechazar en lugar de "Descartar" y oculta el badge de estado
  modoPendiente = false,
  onAprobar,
  onRechazar,
}) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!reserva) {return null;}

  const formatFecha = (iso) => {
    if (!iso || typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {return iso || "";}
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const formatHora = (h) => (typeof h === "string" ? h.slice(0, 5) : h);

  // Usamos el tipo ya asignado desde el padre, o la heurística como fallback
  const isExamen =
    reserva.__tipo === "examen" ||
    (reserva.fecha && (reserva.mesa || reserva.materia));

  // ID compuesto para distinguir reservas de distinto origen
  const compositeId = reserva.__compositeId || `${isExamen ? "E" : "N"}-${reserva.id}`;

  const descartar = async () => {
    setLoading(true);
    try {
      if (isExamen) {
        await liberarReservaExamen(reserva.id);
      } else {
        await liberarReserva(reserva.id);
      }
      if (onRechazo) {onRechazo(null, compositeId);} // enviamos compositeId
    } catch (error) {
      if (onRechazo) {onRechazo(error, compositeId);}
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
            {mostrarAutor && (
              <div className="reserva-detalle">
                {"Solicitada por: "}
                {autor?.name || ((reserva.solicitanteId !== null && reserva.solicitanteId !== undefined) ? `Usuario #${reserva.solicitanteId}` : "")} 
                {autor?.email ? ` (${autor.email})` : ""}
              </div>
            )}
            <div className="reserva-detalle">{formatFecha(reserva.fecha)}</div>
            <div className="reserva-detalle">
              {formatHora(reserva.horaInicio)}–{formatHora(reserva.horaFin)}
            </div>
            <div className="reserva-obs">
              {reserva.materia} {reserva.mesa ? `- ${reserva.mesa}` : ""}
            </div>
          </>
        ) : (
          <>
            {mostrarAutor && (
              <div className="reserva-detalle">
                {"Solicitada por: "}
                {autor?.name || ((reserva.solicitanteId !== null && reserva.solicitanteId !== undefined) ? `Usuario #${reserva.solicitanteId}` : "")} 
                {autor?.email ? ` (${autor.email})` : ""}
              </div>
            )}
            <div className="reserva-detalle">
              {DIA_LABEL[reserva.diaSemana]} {formatHora(reserva.horaInicio)}–
              {formatHora(reserva.horaFin)}
            </div>
          </>
        )}

        {reserva.observaciones && (
          <div className="reserva-obs">{reserva.observaciones}</div>
        )}
      </div>

      <div className="reserva-actions">
        {!modoPendiente && (
          <span className={`reserva-badge reserva-${(reserva.estado || "").toLowerCase()}`}>
            {reserva.estado}
          </span>
        )}

        {modoPendiente ? (
          <div className="reserva-buttons">
            {onAprobar && (
              <BotonPrimario onClick={onAprobar} disabled={loading} aria-disabled={loading}>
                Aprobar
              </BotonPrimario>
            )}
            {onRechazar && (
              <BotonPrimario onClick={onRechazar} disabled={loading} aria-disabled={loading}>
                Rechazar
              </BotonPrimario>
            )}
          </div>
        ) : (
          <BotonPrimario
            onClick={() => setMostrarConfirmacion(true)}
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Procesando..." : "Descartar"}
          </BotonPrimario>
        )}
      </div>

      {!modoPendiente && (
        <ModalConfirmacion
          abierto={mostrarConfirmacion}
          mensaje="¿Estás seguro de que querés descartar esta reserva?"
          onConfirmar={descartar}
          onCancelar={() => setMostrarConfirmacion(false)}
          loading={loading}
          confirmLabel="Descartar"
          cancelLabel="Cancelar"
        />
      )}
    </div>
  );
};

export default ReservaItem;
