import { useState, useEffect, Fragment } from "react";
import {
  getReservasAprobadasPorAula,
  getReservasExamenAprobadasPorAula,
} from "../api/reservas";
import "./styles/LiberarAulaDialogo.css";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import ReservaItem from "./ReservaItem";

const Transition = (props) => <Slide direction="up" {...props} />;

const LiberarAulaDialogo = ({ numero, open, setOpen }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // "error" o "success"

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      setError(null);
      try {
        const [res1, res2] = await Promise.all([
          getReservasAprobadasPorAula(Number(numero)),
          getReservasExamenAprobadasPorAula(Number(numero)),
        ]);

        const list1 = Array.isArray(res1?.data) ? res1.data : res1?.data?.rows ?? [];
        const list2 = Array.isArray(res2?.data) ? res2.data : res2?.data?.rows ?? [];

        const combined = [...list1, ...list2];
        setReservas(combined);
      } catch (err) {
        console.error("Error al obtener reservas aprobadas:", err);
        setError("No se pudieron cargar las reservas.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchReservas();
      setMensaje("");
      setTipoMensaje("");
    } else {
      setReservas([]);
      setError(null);
      setMensaje("");
      setTipoMensaje("");
    }
  }, [numero, open]);

  const manejarRechazo = (error, idReserva) => {
    if (error) {
      setMensaje("Ocurrió un error al rechazar la reserva.");
      setTipoMensaje("error");
    } else {
      setMensaje("Reserva rechazada con éxito.");
      setTipoMensaje("success");
      // Actualizamos la lista quitando la reserva rechazada
      setReservas((prev) => prev.filter((r) => r.id !== idReserva));
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} slots={{ transition: Transition }}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Reservas aprobadas del aula {numero}
            </Typography>
          </Toolbar>
        </AppBar>

        {loading ? (
          <Typography sx={{ m: 2 }}>Cargando reservas...</Typography>
        ) : error ? (
          <Typography sx={{ m: 2 }} color="error">
            {error}
          </Typography>
        ) : (
          <>
            {mensaje && (
              <Typography
                sx={{ m: 2 }}
                color={tipoMensaje === "error" ? "error" : "success.main"}
                className={`form-message ${tipoMensaje}`}
              >
                {mensaje}
              </Typography>
            )}

            {reservas.length === 0 ? (
              <Typography sx={{ m: 2 }} color="text.secondary">
                No hay reservas aprobadas para este aula.
              </Typography>
            ) : (
              <List>
                {reservas.map((reserva) => (
                  <Fragment key={reserva.id}>
                    <ReservaItem
                      reserva={reserva}
                      numeroAula={numero}
                      onRechazo={manejarRechazo}
                    />
                    <Divider />
                  </Fragment>
                ))}
              </List>
            )}
          </>
        )}
      </Dialog>
    </Fragment>
  );
};

export default LiberarAulaDialogo;
