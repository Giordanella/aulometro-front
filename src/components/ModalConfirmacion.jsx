import "./styles/ModalConfirmacion.css";
import BotonPrimario from "./BotonPrimario";

export default function ModalConfirmacion({ abierto, mensaje, onConfirmar, onCancelar, loading = false }) {
  if (!abierto) {return null;}

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <BotonPrimario onClick={onConfirmar} disabled={loading}>
            {loading ? "Borrando..." : "Confirmar"}
          </BotonPrimario>
          <BotonPrimario onClick={onCancelar} disabled={loading}>
                Cancelar
          </BotonPrimario>
        </div>
      </div>
    </div>
  );
}
