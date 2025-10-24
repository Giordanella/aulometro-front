import DirectivoItem from "./DirectivoItem";
import "./styles/ListaDocentes.css";

const ListaDirectivos = ({ directivos = [] }) => {
  return (
    <div className="docentes-container">
      <h1>Directivos</h1>

      {directivos.length === 0 ? (
        <p className="docentes-empty-message">No hay directivos disponibles.</p>
      ) : (
        directivos.map((directivo) => (
          <DirectivoItem key={directivo.id} directivo={directivo} />
        ))
      )}
    </div>
  );
};

export default ListaDirectivos;
