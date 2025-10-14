import "./styles/ModalConfirmacion.css";
import BotonPrimario from "./BotonPrimario";

export default function ModalConfirmacion({
  abierto,
  mensaje,
  onConfirmar,
  onCancelar,
  loading = false,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  children,
}) {
  if (!abierto) {return null;}

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{mensaje}</p>
        {children}
        <div className="modal-buttons">
          <BotonPrimario onClick={onConfirmar} disabled={loading}>
            {loading ? `${confirmLabel}...` : confirmLabel}
          </BotonPrimario>
          <BotonPrimario onClick={onCancelar} disabled={loading}>
            {cancelLabel}
          </BotonPrimario>
        </div>
      </div>
    </div>
  );
}
