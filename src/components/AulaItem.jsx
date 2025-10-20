import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { can } from "../permissions";
import "./styles/AulaItem.css";
import "./styles/FormularioAlta.css";
import useBorrarItem from "../hooks/useBorrarItem";
import BotonPrimario from "./BotonPrimario";
import FormularioEdicionAula from "./FormularioEdicionAula";
import ModalConfirmacion from "./ModalConfirmacion";
import { deleteAulaById } from "../api/aulas";
import FormReserva from "./FormularioReserva";
import FormularioReservaExamen from "./FormularioReservaExamen"; 
import LiberarAulaDialogo from "./LiberarAulaDialogo";

const AulaItem = ({
  aulaId,
  numero,
  capacidad,
  ubicacion,
  computadoras,
  tieneProyector,
  estado,
  onUpdate,
  onDelete,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { showDeleteModal, setShowDeleteModal, handleDelete, loading } =
    useBorrarItem(deleteAulaById, onDelete);

  const [abrirReserva, setAbrirReserva] = useState(false);
  const [abrirReservaExamen, setAbrirReservaExamen] = useState(false);

  const [showLiberarAulaDialogo, setShowLiberarAulaDialogo] = useState(false);

  const puedeReservar =
    (typeof can === "function" && can(user, "crearReservas")) ||
    user?.role === "DOCENTE";

  const puedeLiberarAula = user?.role === "DIRECTIVO";

  if (isEditing) {
    return (
      <FormularioEdicionAula
        aula={{
          id: aulaId,
          numero,
          capacidad,
          ubicacion,
          computadoras,
          tieneProyector,
          estado,
        }}
        onAulaActualizada={(updated) => {
          onUpdate({ id: aulaId, ...updated });
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="aula-container">
      <span className="numeroAula">Aula {numero}</span>
      <span className="aula-data">Capacidad: {capacidad}</span>
      <span className="aula-data">{ubicacion}</span>
      <span className="aula-data">Cantidad de computadoras: {computadoras}</span>
      <span className="aula-data">Con proyector: {tieneProyector ? "Sí" : "No"}</span>

      <div className="aula-acciones">
        {puedeLiberarAula && (
          <BotonPrimario type="button" onClick={() => setShowLiberarAulaDialogo(true)}>
            Liberar
          </BotonPrimario>
        )}
        {can(user, "modificarAulas") && (
          <BotonPrimario type="button" onClick={() => setIsEditing(true)}>
            Modificar
          </BotonPrimario>
        )}
        {can(user, "borrarAulas") && (
          <BotonPrimario type="button" onClick={() => setShowDeleteModal(true)}>
            Borrar
          </BotonPrimario>
        )}
        {puedeReservar && (
          <BotonPrimario
            type="button"
            onClick={() => {
              setAbrirReserva((prev) => {
                const next = !prev; // toggle
                if (next) { setAbrirReservaExamen(false); } // mutual exclusión
                return next;
              });
            }}
          >
            Reservar
          </BotonPrimario>
        )}
        {puedeReservar && (
          <BotonPrimario
            type="button"
            onClick={() => {
              setAbrirReservaExamen((prev) => {
                const next = !prev; // toggle
                if (next) { setAbrirReserva(false); } // mutual exclusión
                return next;
              });
            }}
          >
            Reservar para Examen
          </BotonPrimario>
        )}
      </div>

      {abrirReserva && (
        <FormReserva
          aulaId={aulaId}
          aulaNumero={numero}
          onOk={() => {
            setAbrirReserva(false);
            // opcional: toast / navegar a “Mis reservas”
          }}
          onCancel={() => setAbrirReserva(false)}
        />
      )}

      {abrirReservaExamen && (
        <FormularioReservaExamen
          aulaId={aulaId}
          aulaNumero={numero}
          titulo="Solicitar reserva de examen"
          onOk={() => {
            setAbrirReservaExamen(false);
            // opcional: toast / navegar a “Mis reservas”
          }}
          onCancel={() => setAbrirReservaExamen(false)}
        />
      )}

      <ModalConfirmacion
        abierto={showDeleteModal}
        mensaje={"¿Estás seguro de que deseas borrar esta aula?"}
        onConfirmar={() => handleDelete(aulaId)}
        onCancelar={() => setShowDeleteModal(false)}
        loading={loading}
      />

      <LiberarAulaDialogo
        numero={numero}
        open={showLiberarAulaDialogo}
        setOpen={setShowLiberarAulaDialogo}
      />
    </div>
  );
};

export default AulaItem;
