import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardDirectivo from "./pages/DashboardDirectivo";
import DashboardDocente from "./pages/DashboardDocente";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta solo para docentes */}
        <Route
          path="/dashboard/docente"
          element={
            <ProtectedRoute role="DOCENTE">
              <DashboardDocente />
            </ProtectedRoute>
          }
        />

        {/* Ruta solo para directivos */}
        <Route
          path="/dashboard/directivo"
          element={
            <ProtectedRoute role="DIRECTIVO">
              <DashboardDirectivo />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
