import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // Si no hay usuario -> al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifica un rol y no coincide -> redirigir a su dashboard correcto
  if (role && user.role !== role) {
    if (user.role === "DOCENTE") {
      return <Navigate to="/dashboard/docente" replace />;
    }
    if (user.role === "DIRECTIVO") {
      return <Navigate to="/dashboard/directivo" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // Usuario autorizado -> renderizar children
  return children;
};

export default ProtectedRoute;
