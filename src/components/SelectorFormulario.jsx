import BotonPrimario from "./BotonPrimario";

const SelectorFormulario = ({ formularioActivo, setFormularioActivo }) => (
  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
    <BotonPrimario
      onClick={() => setFormularioActivo("usuario")}
      style={{ background: formularioActivo === "usuario" ? "#ccc" : undefined }}
    >
      Gestionar Usuarios
    </BotonPrimario>
    <BotonPrimario
      onClick={() => setFormularioActivo("aula")}
      style={{ background: formularioActivo === "aula" ? "#ccc" : undefined }}
    >
      Gestionar Aulas
    </BotonPrimario>
  </div>
);

export default SelectorFormulario;