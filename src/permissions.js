export const permissions = {
  DIRECTIVO: ["verAulas", "modificarAulas", "verUsuarios", "modificarUsuarios"],
  DOCENTE: ["verAulas"]
};

export const can = (user, action) => user && permissions[user.role]?.includes(action);