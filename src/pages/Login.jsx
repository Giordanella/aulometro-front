import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleClick}>Ir a la página de Home</button>
    </div>
  );
}

export default Login;
