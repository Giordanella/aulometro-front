import { updateAulaById } from "../api/aulas";
import { useFormulario } from "../hooks/useFormulario";
import { validarNumeroAula, validarCapacidad, validarUbicacion, validarCantidadComputadoras, validarEstado } from "../utils/validarAula";
import BotonPrimario from "./BotonPrimario";
import CamposAula from "./CamposAula";

const FormularioEdicionAula = ({ aula, onAulaActualizada, onCancel }) => {
    
  const validators = {
    numero: validarNumeroAula,
    capacidad: validarCapacidad,
    ubicacion: validarUbicacion,
    computadoras: validarCantidadComputadoras,
    estado: validarEstado
  };

  const {
    formData,
    errores,
    mensaje,
    tipoMensaje,
    handleChange,
    handleSubmit
  } = useFormulario(
    aula,
    (data) => updateAulaById(aula.id, data),
    onAulaActualizada,
    validators,
    { resetOnSuccess: false }
  );

  return(
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <CamposAula
          formData={formData}
          handleChange={handleChange}
          errores={errores}
        />        
        {mensaje && <p className={`form-message ${tipoMensaje}`}>{mensaje}</p>}

        <div className="botones-edicion">
          <BotonPrimario type="submit">Guardar</BotonPrimario>
          <BotonPrimario type="button" onClick={onCancel}>Cancelar</BotonPrimario>
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionAula;