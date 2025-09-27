import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/axios";
import { getCurrentUser } from "../api/users";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar: cargar token y obtener usuario
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setAuthToken(storedToken);

      getCurrentUser()
        .then(({ data }) => setUser(data))
        .catch(() => logout()) // token inválido o expirado
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Guardar token en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    setAuthToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
