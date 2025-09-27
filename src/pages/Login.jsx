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

    try {
      const data = await loginRequest(email, password);
      login(data); // guardar token y user en contexto
    } catch (err) {
      const msg = err?.response?.data?.error || "Credenciales inválidas";
      setError(msg);
    }
  };

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
