import { useState } from "react";

export function useFormulario(
  initialState,
  submitFunc,
  onSuccess,
  validators = {},
  { resetOnSuccess = false } = {}
) {
  const [formData, setFormData] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const newFormData = {
      ...formData,
      [name]: newValue
    };

    setFormData(newFormData);

    const newErrors = {};
    for (const field in validators) {
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
      setSubmitting(true);
      const response = await submitFunc(formData);
      const entidad = response?.data ?? formData; // soporta create (devuelve data) o update (no devuelve nada)

      if (onSuccess) {onSuccess(entidad);}

      setErrores({});
      setMensaje("Operación realizada correctamente.");
      setTipoMensaje("success");

      if (resetOnSuccess) {
        setFormData(initialState);
      }

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);

    } catch (error) {
      console.error("Error en formulario:", error);
      setMensaje("Error al procesar la operación.");
      setTipoMensaje("error");

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errores,
    mensaje,
    tipoMensaje,
    submitting,
    handleChange,
    handleSubmit
  };
}