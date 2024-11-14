// ThemeToggle.js
import React, { useState, useEffect } from 'react';
import './Toggle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Toggle = () => {
  const [theme, setTheme] = useState('light'); // Default theme set to 'dark'

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // Apply theme to the root element
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to 'dark' if no theme is saved
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme); // Apply the saved theme on load
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme); // Save theme to localStorage
  }, [theme]);

  return (
    <div className="toggle-container" onClick={toggleTheme}>
      <div className={`toggle ${theme}`}>
        <div className="icon">
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Toggle;
