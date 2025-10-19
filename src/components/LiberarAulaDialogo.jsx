import { useState, useEffect, Fragment } from "react";
import { getReservasAprobadasPorAula, getReservasExamenAprobadasPorAula } from "../api/reservas";
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

const compareReservas = (a, b) => {
  // Prioriza fecha (exam), luego por diaSemana, luego por horaInicio
  const timeA = a.fecha
    ? `${a.fecha} ${a.horaInicio ?? ""}`
    : `${String(a.diaSemana).padStart(2, "0")} ${a.horaInicio ?? ""}`;
  const timeB = b.fecha
    ? `${b.fecha} ${b.horaInicio ?? ""}`
    : `${String(b.diaSemana).padStart(2, "0")} ${b.horaInicio ?? ""}`;
  if (timeA < timeB) {return -1;}
  if (timeA > timeB) {return 1;}
  return 0;
};

const LiberarAulaDialogo = ({ numero, open, setOpen }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      setError(null);
      try {
        // Llamadas en paralelo
        const [res1, res2] = await Promise.all([
          getReservasAprobadasPorAula(Number(numero)),
          getReservasExamenAprobadasPorAula(Number(numero)),
        ]);

        const list1 = Array.isArray(res1?.data) ? res1.data : res1?.data?.rows ?? [];
        const list2 = Array.isArray(res2?.data) ? res2.data : res2?.data?.rows ?? [];

        // Combinar
        const combined = [...list1, ...list2];

        // Ordenar (opcional, adaptá la función si querés otro criterio)
        combined.sort(compareReservas);

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
    } else {
      // opcional: limpiar al cerrar
      setReservas([]);
      setError(null);
    }
  }, [numero, open]);

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
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
        ) : reservas.length === 0 ? (
          <Typography sx={{ m: 2 }} color="text.secondary">
            No hay reservas aprobadas para este aula.
          </Typography>
        ) : (
          <List>
            {reservas.map((reserva) => (
              <Fragment key={reserva.id}>
                <ReservaItem reserva={reserva} numeroAula={numero} />
                <Divider />
              </Fragment>
            ))}
          </List>
        )}
      </Dialog>
    </Fragment>
  );
};

export default LiberarAulaDialogo;
