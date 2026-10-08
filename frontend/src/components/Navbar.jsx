import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-mark">✦</span>
          <span className="navbar-logo-text">bokki</span>
        </NavLink>

        {/* PC Navigation */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="navbar-icon">⌂</span>
            <span>ホーム</span>
          </NavLink>

          <NavLink
            to="/study"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="navbar-icon">✎</span>
            <span>学習</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="navbar-icon">○</span>
            <span>ユーザー</span>
          </NavLink>
        </div>

        {/* PC Authentication */}
        <div className="navbar-auth">
          <NavLink to="/login" className="navbar-login">
            ログイン
          </NavLink>

          <NavLink to="/register" className="navbar-register">
            サインイン
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`navbar-menu-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar-mobile-link ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <span className="navbar-mobile-icon">⌂</span>
          <span>ホーム</span>
        </NavLink>

        <NavLink
          to="/study"
          className={({ isActive }) =>
            `navbar-mobile-link ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <span className="navbar-mobile-icon">✎</span>
          <span>学習</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `navbar-mobile-link ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <span className="navbar-mobile-icon">○</span>
          <span>ユーザー</span>
        </NavLink>

        <div className="navbar-mobile-divider"></div>

        <div className="navbar-mobile-auth">
          <NavLink
            to="/login"
            className="navbar-mobile-login"
            onClick={closeMenu}
          >
            ログイン
          </NavLink>

          <NavLink
            to="/register"
            className="navbar-mobile-register"
            onClick={closeMenu}
          >
            サインイン
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
