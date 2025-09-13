import { useState } from "react";

export function useFormularioAlta(initialState, createFunc, onCreated, validators = {}) {
  const [formData, setFormData] = useState(initialState);
  const [ errores, setErrores ] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (validators[name]) {
      const error = validators[name](newValue);
      setErrores((prevErrores) => ({
        ...prevErrores,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const field in validators) {
      const error = validators[field](formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      setMensaje("Por favor corrige los errores en el formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      const response = await createFunc(formData);
      const nuevaEntidad = response.data;

      setMensaje("Entidad creada correctamente.");
      setTipoMensaje("success");

      if (onCreated) {
        onCreated(nuevaEntidad);
      }

      setFormData(initialState);

      setErrores({});

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
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  };
}