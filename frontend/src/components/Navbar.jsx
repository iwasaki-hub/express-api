import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-mark">✦</span>
          <span className="navbar-logo-text">bokki</span>
        </NavLink>

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

        <div className="navbar-auth">
          <NavLink to="/login" className="navbar-login">
            ログイン
          </NavLink>

          <NavLink to="/register" className="navbar-register">
            サインイン
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
