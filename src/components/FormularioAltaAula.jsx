import { useState } from "react";
import { createAula } from "../api/aulas";
import "./styles/FormularioAlta.css";
import BotonPrimario from "./BotonPrimario";

const FormularioAltaAula = ({ onAulaCreada }) => {
  const [formData, setFormData] = useState({
    numeroAula: "",
    capacidad: "",
    ubicacion: "",
    cantidadComputadoras: "",
    tieneProyector: false,
    franjaHoraria: "disponible",
  });
    
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
    
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
        
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
        
    try {
      const response = await createAula(formData);
      const nuevaAula = response.data;

      setMensaje(`Aula "${nuevaAula.numeroAula}" creada correctamente.`);
      setTipoMensaje("success");

      if (onAulaCreada) {
        onAulaCreada(nuevaAula);
      }
      setFormData({
        numeroAula: "",
        capacidad: "",
        ubicacion: "",
        cantidadComputadoras: "",
        tieneProyector: false,
        franjaHoraria: "disponible",
      });

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);

    } catch (error) {
      console.error("Error al crear aula:", error);
      setMensaje("Error al crear el aula.");
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
        <h2>Alta de Aula</h2>
        <input
          type="number"
          name="numeroAula"
          placeholder="Número de aula"
          className="form-input"
          value={formData.numeroAula}
          onChange={handleChange}
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          className="form-input"
          value={formData.capacidad}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          className="form-input"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidadComputadoras"
          placeholder="Cantidad de computadoras"
          className="form-input"
          value={formData.cantidadComputadoras}
          onChange={handleChange}
        />
        <label className="form-label">
          <input 
            type="checkbox"
            name="tieneProyector"
            className="form-input"
            checked={formData.tieneProyector}
            onChange={handleChange}
          />
            ¿Tiene proyector?</label>
        <BotonPrimario>Dar de alta Aula</BotonPrimario>
      </form>
      {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}
    </div>
  );
};

export default FormularioAltaAula;