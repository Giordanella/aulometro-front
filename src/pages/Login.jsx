import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>

      <button onClick={handleClick} className="home-button">
        Ir a la página de Home
      </button>
    </div>
  );
}

export default Login;
