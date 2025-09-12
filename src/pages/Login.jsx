import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonPrimario from "../components/BotonPrimario";
import { loginRequest } from "../api/auth";
import { useAuth } from "../contexts/useAuth";
import { setAuthRole } from "../api/axios";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // Si ya hay usuario logueado, redirigir a su dashboard
  useEffect(() => {
    if (user) {
      navigate(user.role === "DOCENTE" ? "/dashboard/docente" : "/dashboard/directivo");
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginRequest(email, password);

      // Guardar usuario en contexto + configurar rol en axios
      setUser(data.user);
      setAuthRole(data.user.role);

      // No hace falta redirigir acá, el useEffect se encarga
    } catch (err) {
      const msg = err?.response?.data?.message || "Credenciales inválidas";
      setError(msg);
    }
  }

  return (
    <div className="login-container">
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
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BotonPrimario type="submit">Iniciar sesión</BotonPrimario>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
