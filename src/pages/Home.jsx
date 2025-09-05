import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button onClick={handleClick}>Ir a la página de Login</button>
    </div>
  );
}

export default Home;
