import { useState } from "react";
import { createUser } from "../api/users";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";

const FormularioAlta = ({ setDocentes }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUser(formData);
      const nuevoDocente = response.data;

      setMensaje(`Usuario "${nuevoDocente.name}" creado correctamente.`);
      setTipoMensaje("success");

      if (nuevoDocente.role === "DOCENTE") {
        setDocentes((prevDocentes) => [...prevDocentes, nuevoDocente]);
      }

      setFormData({ name: "", email: "", password: "", role: "" });

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMensaje("Error al crear el usuario.");
      setTipoMensaje("error");

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="form-input"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar rol</option>
          <option value="DOCENTE">Docente</option>
          <option value="DIRECTIVO">Directivo</option>
        </select>

        <BotonPrimario>Dar de alta usuario</BotonPrimario>
      </form>

      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAlta;
