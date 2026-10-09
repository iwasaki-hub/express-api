import { useState, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();

    setIsMenuOpen(false);

    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-mark">✦</span>
          <span className="navbar-logo-text">bokki</span>
        </NavLink>

        {/* Desktop Navigation */}
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

        {/* Desktop Authentication */}
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-user-name">{user.name}さん</span>

              <button
                type="button"
                className="navbar-login"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-login">
                ログイン
              </NavLink>

              <NavLink to="/register" className="navbar-register">
                サインイン
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`navbar-menu-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <NavLink to="/" end className="navbar-mobile-link" onClick={closeMenu}>
          <span className="navbar-mobile-icon">⌂</span>
          ホーム
        </NavLink>

        <NavLink to="/study" className="navbar-mobile-link" onClick={closeMenu}>
          <span className="navbar-mobile-icon">✎</span>
          学習
        </NavLink>

        <NavLink to="/users" className="navbar-mobile-link" onClick={closeMenu}>
          <span className="navbar-mobile-icon">○</span>
          ユーザー
        </NavLink>

        <div className="navbar-mobile-divider"></div>

        <div className="navbar-mobile-auth">
          {user ? (
            <>
              <p className="navbar-mobile-user">{user.name}さん</p>

              <button
                type="button"
                className="navbar-mobile-login"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
