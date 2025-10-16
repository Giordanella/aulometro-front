import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import "./styles/Navbar.css";
import { useTheme } from "../contexts/useTheme";

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
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);

  const handleChange = (id) => {
    setVista(id);
    setOpen(false);
    setProfileOpen(false);
  };

  // Close profile menu on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [profileOpen]);

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
          <span className="brand__logo" aria-hidden="true" />
          <span className="brand__title">Aulómetro</span>
        </div>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() =>
            setOpen((s) => {
              const next = !s;
              if (next) {setProfileOpen(false);} // toggle between menus
              return next;
            })
          }
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
            {user?.role === "DIRECTIVO" ? "Gestión de reservas" : "Reservas"}
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <div
            className="user"
            ref={menuRef}
            role="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            aria-label="Abrir menú de usuario"
            onClick={() =>
              setProfileOpen((v) => {
                const next = !v;
                if (next) {setOpen(false);} // toggle between menus
                return next;
              })
            }
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              setProfileOpen((v) => {
                const next = !v;
                if (next) {setOpen(false);}
                return next;
              })
            }
          >
            <div className="avatar" aria-hidden>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user__meta">
              <div className="user__name">{user?.name ?? "Usuario"}</div>
              <div className="user__role">{user?.role}</div>
            </div>

            {/* Floating profile menu */}
            <div
              className={`profile-menu ${profileOpen ? "open" : ""}`}
              role="menu"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                role="menuitem"
                className="profile-menu__item"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {isDark ? "Modo claro" : "Modo oscuro"}
              </button>
              <button
                role="menuitem"
                className="profile-menu__item"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(false);
                  logout();
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
