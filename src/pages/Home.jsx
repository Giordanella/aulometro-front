import FormularioAlta from "../components/FormularioAlta";
import ListaDocentes from "../components/ListaDocentes";
import "./styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      <FormularioAlta />
      <ListaDocentes />
    </div>
  );
}

export default Home;
