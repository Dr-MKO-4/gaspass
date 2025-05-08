import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn btn-outline-light"
      style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
    >
      {darkMode ? "Mode clair" : "Mode sombre"}
    </button>
  );
};

export default ThemeToggle;
