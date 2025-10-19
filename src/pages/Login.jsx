import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonPrimario from "../components/BotonPrimario";
import { loginRequest } from "../api/auth";
import { useAuth } from "../contexts/useAuth";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(user.role === "DOCENTE" ? "/dashboard/docente" : "/dashboard/directivo");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      login(data); // guardar token y user en contexto
    } catch (err) {
      // Distinguir entre credenciales inválidas vs. problemas de red/offline
      let msg = "Credenciales inválidas";
      const axiosCode = err?.code; // e.g., 'ERR_NETWORK', 'ECONNABORTED'

      // Sin internet en el navegador
      if (typeof navigator !== "undefined" && navigator && navigator.onLine === false) {
        msg = "Sin conexión a internet. Verifica tu red.";
      }
      // Error de red (no hubo respuesta del servidor)
      else if (!err?.response && (axiosCode === "ERR_NETWORK" || axiosCode === "ECONNABORTED")) {
        msg = "No se pudo conectar con el servidor. Intenta nuevamente.";
      }
      // Respuesta del backend con mensaje específico
      else if (err?.response?.data?.error) {
        msg = err.response.data.error;
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" aria-busy={loading}>
      <div className="login">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <BotonPrimario type="submit" disabled={loading}>
            {loading ? "Ingresando…" : "Iniciar sesión"}
          </BotonPrimario>
        </form>
        {error && <p className="login-error">{error}</p>}
        {loading && (
          <div className="login-overlay" role="status" aria-live="polite">
            <div className="spinner" />
            <span className="sr-only">Procesando ingreso…</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
