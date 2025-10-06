import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardDirectivo from "./pages/DashboardDirectivo";
import DashboardDocente from "./pages/DashboardDocente";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MisReservas from "./pages/ReservasDocente";
import ReservasPendientes from "./pages/ReservasPendientes";
const App = () => {
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
        {/* Mis reservas (DOCENTE) */}
        <Route
          path="/reservas/mias"
          element={
            <ProtectedRoute role="DOCENTE">
              <MisReservas />
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
        {/* Pendientes (DIRECTIVO) */}
        <Route
          path="/reservas/pendientes"
          element={
            <ProtectedRoute role="DIRECTIVO">
              <ReservasPendientes />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
