export const permissions = {
  DIRECTIVO: ["verAulas", "modificarAulas", "borrarAulas", "verUsuarios", "modificarUsuarios", "borrarUsuarios"],
  DOCENTE: ["verAulas", "reservarAulas"]
};

export const can = (user, action) => user && permissions[user.role]?.includes(action);