import { useState } from "react";

export function useFormularioEdicion(initialState, updateFunc, onUpdated, validators = {}) {
  const [formData, setFormData] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const newFormData = {
      ...formData,
      [name]: newValue
    };

    setFormData(newFormData);

    const newErrors = {};
    for(const field in validators) {
      const error = validators[field](newFormData);
      if (error) {newErrors[field] = error;}
    }

    setErrores(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in validators) {
      const error = validators[field](formData);
      if (error) {newErrors[field] = error;}
    }

    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      setMensaje("Por favor corrige los errores en el formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      await updateFunc(formData);
      if (onUpdated) {onUpdated(formData);}

      setErrores({});
      setMensaje("Entidad actualizada correctamente.");
      setTipoMensaje("success");

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    } catch (error) {
      console.error("Error al actualizar entidad:", error);
      setMensaje("Error al actualizar la entidad.");
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
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  };
}