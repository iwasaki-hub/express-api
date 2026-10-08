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

        <button className="navbar-profile" type="button">
          <span>U</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
