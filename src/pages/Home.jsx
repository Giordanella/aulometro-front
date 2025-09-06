import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUsers } from "../api/users";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [usersJson, setUsersJson] = useState(null);

  const handleClick = () => {
    navigate("/login");
  };

  const handleGetUsers = async () => {
    try {
      const res = await getUsers();
      console.log("Usuarios:", res.data);
      setUsersJson(JSON.stringify(res.data, null, 2)); // lo guardo como string bonito
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button onClick={handleClick}>Ir a la página de Login</button>
      <button onClick={handleGetUsers}>Obtener usuarios</button>

      {/* 👇 Aquí mostramos el JSON en la página */}
      {usersJson && (
        <pre style={{ textAlign: "left", background: "#f4f4f4", padding: "10px" }}>
          {usersJson}
        </pre>
      )}
    </div>
  );
}

export default Home;
