import BotonPrimario from "./BotonPrimario";
import "./styles/ReservaItem.css";

const DIA_LABEL = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ReservaItem = ({ reserva, numeroAula }) => {
  if (!reserva) {return null;}

  const formatFecha = (iso) => {
    if (!iso || typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {return iso || "";}
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const formatHora = (h) => (typeof h === "string" ? h.slice(0, 5) : h);

  // Detectar examen: heurística por "mesa"
  const isExamen = reserva.fecha && (reserva.mesa || reserva.materia);

  const onEliminar = () => {
    console.log("Eliminar reserva:", reserva);
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

        <BotonPrimario onClick={onEliminar}>Eliminar</BotonPrimario>
      </div>
    </div>
  );
};

export default ReservaItem;
