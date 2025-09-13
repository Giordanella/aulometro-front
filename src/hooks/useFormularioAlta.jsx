import { useState } from "react";

export function useFormularioAlta(initialState, createFunc, onCreated) {
  const [formData, setFormData] = useState(initialState);
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
      const response = await createFunc(formData);
      const nuevaEntidad = response.data;

      setMensaje("Entidad creada correctamente.");
      setTipoMensaje("success");

      if (onCreated) {
        onCreated(nuevaEntidad);
      }

      setFormData(initialState);

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);

    } catch (error) {
      console.error("Error al crear entidad:", error);
      setMensaje("Error al crear la entidad.");
      setTipoMensaje("error");

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    }
  };

  return {
    formData,
    setFormData,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  };
}