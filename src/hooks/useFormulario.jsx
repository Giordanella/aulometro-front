import { useState, useRef, useEffect } from "react";

export function useFormulario(
  initialState,
  submitFunc,
  onSuccess,
  validators = {},
  { resetOnSuccess = false } = {},
) {
  const [formData, setFormData] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const newFormData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newFormData);

    if (validators && typeof validators[name] === "function") {
      const error = validators[name](newFormData);

      setErrores((prev) => {
        const next = { ...prev };
        if (error) {next[name] = error;}
        else {delete next[name];}
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") {e.preventDefault();}

    const newErrors = {};
    for (const field in validators) {
      const error = validators[field](formData);
      if (error) {
        newErrors[field] = error;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      setMensaje("Por favor corrige los errores en el formulario.");
      setTipoMensaje("error");
      timeoutRef.current = setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitFunc(formData);
      // Soporta: axios response (response.data) o entidad directa (response)
      const entidad =
        response && response.data ? response.data : (response ?? formData);

      if (onSuccess) {
        onSuccess(entidad);
      }

      setErrores({});
      setMensaje("Operación realizada correctamente.");
      setTipoMensaje("success");

      if (resetOnSuccess) {
        setFormData(initialState);
      }

      timeoutRef.current = setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
    } catch (error) {
      console.error("Error en formulario:", error);

      const serverMsg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Error al procesar la operación.";
      setMensaje(serverMsg);
      setTipoMensaje("error");

      timeoutRef.current = setTimeout(() => {
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
    handleSubmit,
  };
}
