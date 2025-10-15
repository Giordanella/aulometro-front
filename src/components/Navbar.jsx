import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import "./styles/Navbar.css";

const NavLink = ({ id, children, active, onClick }) => (
  <button
    className={`nav-link ${active ? "active" : ""}`}
    onClick={() => onClick(id)}
    aria-current={active ? "page" : undefined}
  >
    {children}
  </button>
);

export default function Navbar({ vista, setVista }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleChange = (id) => {
    setVista(id);
    setOpen(false);
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar__container">
        <div
          className="brand"
          role="link"
          tabIndex={0}
          onClick={() => handleChange("aulas")}
          onKeyDown={(e) => (e.key === "Enter" ? handleChange("aulas") : null)}
        >
          <svg
            className="brand__logo"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 8h12M6 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="brand__title">Aulómetro</span>
        </div>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${open ? "open" : ""}`} role="navigation" aria-label="Main">
          {user?.role === "DIRECTIVO" && (
            <NavLink id="usuarios" active={vista === "usuarios"} onClick={handleChange}>
              Gestión de usuarios
            </NavLink>
          )}

          <NavLink id="aulas" active={vista === "aulas"} onClick={handleChange}>
            {user?.role === "DIRECTIVO" ? "Gestión de aulas" : "Aulas"}
          </NavLink>

          <NavLink id="reservas" active={vista === "reservas"} onClick={handleChange}>
            {user?.role === "DIRECTIVO" ? "Gestión de reservas" : "Mis reservas"}
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <div className="user">
            <div className="avatar" aria-hidden>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user__meta">
              <div className="user__name">{user?.name ?? "Usuario"}</div>
              <div className="user__role">{user?.role}</div>
            </div>
          </div>

          <button className="btn btn--ghost logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
