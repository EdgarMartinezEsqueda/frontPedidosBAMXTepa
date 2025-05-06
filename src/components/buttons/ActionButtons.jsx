import React from "react";
import { useNavigate } from "react-router";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useAuth } from "context/AuthContext";
import { hasPermission } from "utils/permisos";

const ActionButtons = ({
  item,
  resource,
  basePath,
  onDelete,
  getEditCondition = () => false,
  showView = true
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-end md:justify-center gap-x-6 text-lg">
      {showView && (
        <button
          className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none cursor-pointer"
          onClick={() => navigate(`/${basePath}/${item.id}`)}
        >
          <FaRegEye />
        </button>
      )}

      {hasPermission(user.data, resource, "update") && (
        <button
          className={`text-gray-500 transition-colors duration-200 dark:text-gray-300 focus:outline-none ${
            getEditCondition(item) 
              ? "cursor-not-allowed" 
              : "cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-500"
          }`}
          onClick={() => !getEditCondition(item) && navigate(`/${basePath}/editar/${item.id}`)}
          disabled={getEditCondition(item)}
        >
          <FaRegEdit />
        </button>
      )}

      {hasPermission(user.data, resource, "delete") && (
        <button
          className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none cursor-pointer"
          onClick={() => onDelete(item.id)}
        >
          <MdDeleteOutline />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;