import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Ir a la página de Login</button>
    </div>
  );
}

export default Home;
