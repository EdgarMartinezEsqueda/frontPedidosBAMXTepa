import React, { useState, useEffect } from "react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Banco Diocesano de Alimentos de los Altos
        </p>

        <div className="flex -mx-2">
          <a href="https://facebook.com/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook" >
            <FaFacebook />
          </a>

          <a href="https://instagram.com/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Instagram" >
            <FaInstagram />
          </a>

          <a href="https://linkedin.com/company/bamxtepatitlan" target="_blank" rel="noreferrer" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Linkedin" >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;