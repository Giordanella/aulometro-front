import { useState, useEffect, Fragment } from "react";
import {
  getReservasAprobadasPorAula,
  getReservasExamenAprobadasPorAula,
} from "../api/reservas";
import { getUsers } from "../api/users";
import "./styles/LiberarAulaDialogo.css";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import ReservaItem from "./ReservaItem";
import Ruedita from "./Ruedita";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Transition = (props) => <Slide direction="up" {...props} />;

const LiberarAulaDialogo = ({ numero, open, setOpen }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        const [res1, res2, usersResp] = await Promise.all([
          getReservasAprobadasPorAula(Number(numero)),
          getReservasExamenAprobadasPorAula(Number(numero)),
          getUsers(),
        ]);

        const list1 = Array.isArray(res1?.data)
          ? res1.data
          : res1?.data?.rows ?? [];
        const list2 = Array.isArray(res2?.data)
          ? res2.data
          : res2?.data?.rows ?? [];
        const usersList = Array.isArray(usersResp?.data)
          ? usersResp.data
          : usersResp?.data?.rows ?? [];

        // Normalizamos con identificadores únicos
        const mapped1 = list1.map((r) => ({
          ...r,
          __tipo: "normal",
          __compositeId: `N-${r.id}`,
        }));

        const mapped2 = list2.map((r) => ({
          ...r,
          __tipo: "examen",
          __compositeId: `E-${r.id}`,
        }));

        const combined = [...mapped1, ...mapped2];
        setReservas(combined);
        // Crear mapa de usuarios para autor por id
        setUserMap(Object.fromEntries(usersList.map((u) => [u.id, u])));
      } catch {
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
      setUserMap({});
    }
  }, [numero, open]);

  const manejarRechazo = (error, compositeId) => {
    if (error) {
      setMensaje(
        typeof error === "string"
          ? error
          : "Ocurrió un error al descartar la reserva."
      );
      setTipoMensaje("error");
    } else {
      setMensaje("Reserva descartada con éxito.");
      setTipoMensaje("success");
      setReservas((prev) => prev.filter((r) => r.__compositeId !== compositeId));
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
        PaperProps={{
          className: "liberar-aula-dialog",
          sx: {
            backgroundColor: "var(--bg)",
            width: fullScreen ? "100%" : "min(92vw, 860px)",
            maxWidth: "100%",
            margin: fullScreen ? 0 : "32px auto",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "var(--philippine-red)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Reservas del aula {numero}
            </Typography>
          </Toolbar>
        </AppBar>

        {loading ? (
          <Ruedita />
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
                role="status"
                aria-live="polite"
              >
                {mensaje}
              </Typography>
            )}

            {reservas.length === 0 ? (
              <Typography sx={{ m: 2 }} color="error">
                No hay reservas aprobadas para este aula.
              </Typography>
            ) : (
              <List>
                {reservas.map((reserva) => (
                  <Fragment key={reserva.__compositeId}>
                    <ReservaItem
                      reserva={reserva}
                      numeroAula={numero}
                      mostrarAutor
                      autor={userMap?.[reserva.solicitanteId]}
                      onRechazo={manejarRechazo}
                    />
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
