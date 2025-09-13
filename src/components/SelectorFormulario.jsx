import BotonPrimario from "./BotonPrimario";

const SelectorFormulario = ({ formularioActivo, setFormularioActivo }) => (
  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
    <BotonPrimario
      onClick={() => setFormularioActivo("usuario")}
      style={{ background: formularioActivo === "usuario" ? "#ccc" : undefined }}
    >
      Dar de alta usuario
    </BotonPrimario>
    <BotonPrimario
      onClick={() => setFormularioActivo("aula")}
      style={{ background: formularioActivo === "aula" ? "#ccc" : undefined }}
    >
      Dar de alta aula
    </BotonPrimario>
  </div>
);

export default SelectorFormulario;