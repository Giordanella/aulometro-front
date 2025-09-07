import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/DashboardDirectivo"; // podriamos renombrar home a dashboarddirectivo
import DashboardDocente from "./pages/DashboardDocente";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/docente" element={<DashboardDocente />} />
        <Route path="/dashboard/directivo" element={<Home />} />

        {/*fallback: otra ruta -> login*/}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
