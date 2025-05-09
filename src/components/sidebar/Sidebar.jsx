import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaUsers,
  FaMapMarked,
  FaHeart,
  FaMoneyBill
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Resumen", icon: <FaHome />, to: "/reportes" },
    { label: "Despensas", icon: <FaBoxOpen />, to: "/reportes/despensas" },
    { label: "Rutas", icon: <FaTruck />, to: "/reportes/rutas" },
    { label: "Trabajadores Sociales", icon: <FaUsers />, to: "/reportes/ts" },
    { label: "Comunidades", icon: <FaMapMarked />, to: "/reportes/comunidades" },
    { label: "Apadrinadas", icon: <FaHeart />, to: "/reportes/apadrinadas" },
    { label: "Económico", icon: <FaMoneyBill />, to: "/reportes/economico" },
  ];

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-20 left-4 z-50 text-2xl text-gray-700 ${ isOpen ? 'left-68' : 'left-4' }`}
      >
        {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>

      {/* Sidebar */}
      <div
        id="sideNav"
        className={`${
          isOpen ? "block" : "hidden"
        } z-10 lg:block w-64 fixed lg:static h-full lg:h-auto bg-white dark:bg-gray-800 shadow dark:shadow-lg`}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === (item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`px-4 py-3 flex items-center space-x-4 rounded-md transition-colors ${
                  isActive
                    ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
