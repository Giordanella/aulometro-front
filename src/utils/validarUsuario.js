export function validarNombreUsuario(nombre) {
  const regex = /^[a-zA-Z\s]+$/;
  if (!nombre || nombre.trim().length === 0) {return "El nombre no puede estar vacío.";}
  if (nombre.length < 3 || nombre.length > 50) {return "El nombre debe tener entre 3 y 50 caracteres.";}
  if (!regex.test(nombre)) {return "El nombre solo puede contener letras y espacios.";}
  return null;
}

export function validarEmail(email) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  if (!email || email.trim().length === 0) {return "El correo electrónico no puede estar vacío.";}
  if (email.length < 7 || email.length > 100) {return "El correo electrónico debe tener entre 5 y 100 caracteres.";}
  if (!regex.test(email)) {return "El correo electrónico no es válido.";}
  return null;
}

export function validarPassword(password) {
  if (!password || password.trim().length === 0) {return "La contraseña no puede estar vacía.";}
  if (password.length < 6) {return "La contraseña debe tener al menos 6 caracteres.";}
  if (password.length > 50) {return "La contraseña no puede exceder los 50 caracteres.";}
  return null;
}

export function validarRole(role) {
  if (!role || role.trim().length === 0) {return "El rol no puede estar vacío.";}
  if (role.length < 3 || role.length > 20) {return "El rol debe tener entre 3 y 20 caracteres.";}
  if (role !== "DOCENTE" && role !== "DIRECTIVO") {return "El rol debe ser 'DOCENTE' o 'DIRECTIVO'.";}
  return null;
}