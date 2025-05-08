import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbarcss.css"; 
import "./../darkTheme.css"; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string): string => {
    return location.pathname === path || location.pathname.startsWith(path) ? "active" : "";
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"} rounded`} aria-label="Main navigation">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Home">
          <img
            src="https://framerusercontent.com/images/2xfRRBJJsxBMq1pROrYTs4iA0.png"
            alt="Company Logo"
            className="navbar-logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarContent"
          aria-expanded={isOpen ? "true" : "false"}  
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${isActive("/Home")}`}>
              <Link className="nav-link" to="/Home">Home</Link>
            </li>
            <li className={`nav-item ${isActive("/Products")}`}>
              <Link className="nav-link" to="/Products">Products</Link>
            </li>
            <li className={`nav-item ${isActive("/About")}`}>
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className={`nav-item ${isActive("/Cart")}`}>
              <Link className="nav-link" to="/Cart">Cart</Link>
            </li>
            <li className={`nav-item ${isActive("/Blog")}`}>
              <Link className="nav-link" to="/Blog">Blog</Link>
            </li>
            <li className={`nav-item ${isActive("/Contact")}`}>
              <Link className="nav-link" to="/Contact">Contact Us</Link>
            </li>
          </ul>

          <form role="search" className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
          </form>

          <div className="form-check form-switch text-danger">
            <input
              className="form-check-input"
              type="checkbox"
              id="themeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="themeSwitch">
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;