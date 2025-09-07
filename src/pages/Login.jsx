import BotonPrimario from "../components/BotonPrimario";
import "./styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
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
          <BotonPrimario>Iniciar sesión</BotonPrimario>
        </form>
      </div>
    </div>
  );
};

export default Login;
