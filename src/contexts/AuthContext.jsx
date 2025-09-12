import { createContext, useState, useEffect } from "react";
import { setAuthRole } from "../api/axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Al montar: cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAuthRole(parsedUser.role); // configurar axios con su rol
    }
  }, []);

  // Cada vez que cambia el usuario: actualizar localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setAuthRole(null); // limpiamos header en axios
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
