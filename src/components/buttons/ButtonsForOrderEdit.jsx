import { GrStatusGood } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const ButtonGroup = ({ disabled = true }) => {  // Recibimos prop disabled
  const buttons = [
    {
      label: "Finalizar",
      icon: <GrStatusGood className="text-2xl" />,
      bg: "hover:bg-verdeLogo",
    }, {
      label: "Borrar",
      icon: <MdDeleteOutline className="text-2xl" />,
      bg: "hover:bg-rojoLogo",
    },
  ];

  return (
    <div className="flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
      {buttons.map((button, index) => (
        <button
          key={index}
          disabled={disabled}
          className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 sm:text-base sm:px-6 gap-x-3
            ${
              disabled
                ? "text-gray-400 cursor-not-allowed opacity-50 dark:text-gray-500"
                : `text-gray-600 dark:text-white cursor-pointer ${button.bg}`
            }`}
        >
          {button.icon}
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;