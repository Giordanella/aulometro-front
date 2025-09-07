import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonPrimario from "../components/BotonPrimario";
import { loginRequest } from "../api/auth";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginRequest(email, password);
      const role = data.user?.role; //rol para saber a donde redirigir cada usuario
      if (role === "DOCENTE") {
        navigate("/dashboard/docente");
      } else if (role === "DIRECTIVO") {
        navigate("/dashboard/directivo");
      }
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
