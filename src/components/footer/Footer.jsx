import React, { useState, useEffect } from 'react';

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to check if dark mode is enabled
  const checkDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  // Update state when dark mode changes
  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(checkDarkMode());
    };

    // Initial check
    handleDarkModeChange();

    // Watch for changes in dark mode
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <a href="/">
          <img className="w-auto h-7" src={isDarkMode ? 'https://bamxtepatitlan.org/assets/logoModoOscuro-BZP1mUxE.png' : 'https://bamxtepatitlan.org/assets/logo-B5cTjWox.png'}
            alt="BAMX Tepatitlán Logo"
          />
        </a>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Banco Diocesano de Alimentos de los Altos
        </p>

        <div className="flex -mx-2">
          <a href="facebook.com/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook" >
            <FaFacebook />
          </a>

          <a href="instagram.com/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Instagram" >
            <FaInstagram />
          </a>

          <a href="linkedin.com/company/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Linkedin" >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;