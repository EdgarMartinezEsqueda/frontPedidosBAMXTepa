import React, { useState } from "react";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Navbar = ({ rol, username }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Definición de enlaces y permisos
  const menuItems = [
    { text: "Ver pedidos", roles: ["Direccion", "Ts", "Almacen"] },
    { text: "Nuevo pedido", roles: ["Direccion", "Ts"] },
    { text: "Generar reportes", roles: ["Direccion"] },
    { text: "Gestión de usuarios", roles: ["Direccion"] },
  ];

  // Filtrar enlaces según el rol
  const filteredLinks = menuItems.filter(item => item.roles.includes(rol));

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <a href="/">
            <picture>
              <source srcSet= "https://bamxtepatitlan.org/assets/logoModoOscuro-BZP1mUxE.png" media="(prefers-color-scheme: dark)" />
              <img className="w-auto h-7" src="https://bamxtepatitlan.org/assets/logo-B5cTjWox.png" alt="BAMX Tepatitlán Logo" />
            </picture>
            </a>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu" >
                { isOpen ? ( < IoMdClose /> ) : ( < HiOutlineMenuAlt4/> )}
              </button>
            </div>
          </div>
          {/* Menú dinámico */}
          <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"}`}>
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {filteredLinks.map((link) => (
                <a
                  key={link.text}
                  href="#"
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {link.text}
                </a>
              ))}
            </div>
            <div className="flex items-center mt-4 lg:mt-0">
              <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown" >
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="object-cover w-full h-full" alt="avatar" />
                </div>
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                  { username ?? "Usuario"}
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;