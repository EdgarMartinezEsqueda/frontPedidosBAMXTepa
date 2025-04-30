import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router";
import api from "lib/axios";
import { hasPermission, RESOURCES } from "utils/permisos";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const TableComponent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rutas"],
    queryFn: async () => {
      const { data } = await api.get("/rutas");
      return data;
    },
    onError: () => toast.error("Error cargando rutas")
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/rutas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["rutas"]);
      toast.success("Ruta eliminada correctamente");
    },
    onError: () => {
      toast.error("Error eliminando la ruta");
    }
  });

  return (
    <section className="container mx-auto m-6">
      <div className="w-full overflow-hidden rounded-lg lg:border lg:border-gray-200 lg:dark:border-gray-700">
        <table className="w-full divide-y lg:divide-gray-200 lg:dark:divide-gray-700 text-black dark:text-white">
          {/* Cabecera solo para desktop */}
          <thead className="hidden lg:table-header-group bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white text-center">ID</th>
              <th className="px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white text-center">Nombre de la Ruta</th>
              <th className="px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white text-center">Acciones</th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200 lg:dark:divide-gray-700 lg:dark:bg-gray-900">
            {!data || data.length === 0 ? (
              <tr className="block lg:table-row dark:bg-gray-800 rounded-lg shadow p-4 mb-4 lg:p-0 lg:shadow-none lg:bg-transparent">
                <td 
                  colSpan="3" 
                  className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400 block lg:table-cell"
                >
                  No hay datos disponibles.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr 
                  key={index}
                  className="block lg:table-row dark:bg-gray-800 rounded-lg shadow p-4 mb-4 lg:p-0 lg:shadow-none lg:bg-transparent"
                >
                  {/* ID */}
                  <td data-th="ID" className="hidden lg:table-cell px-4 py-4 text-sm whitespace-nowrap lg:!bg-inherit bg-gray-50 dark:bg-gray-800 text-center" >
                    <div className="flex justify-between items-center lg:block gap-2">
                      <span className="text-gray-400 lg:hidden">ID</span>
                      <span className="dark:text-white">{item.id}</span>
                    </div>
                  </td>

                  {/* Nombre de la Ruta */}
                  <td data-th="Nombre" className="block lg:table-cell px-4 py-4 text-sm whitespace-nowrap lg:!bg-inherit bg-gray-50 dark:bg-gray-800 text-center" >
                    <div className="flex justify-between items-center lg:block gap-2">
                      <span className="text-gray-400 lg:hidden">Nombre</span>
                      <span className="dark:text-white">{item.nombre}</span>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="block lg:table-cell px-4 py-4 text-sm whitespace-nowrap lg:!bg-inherit bg-gray-50 dark:bg-gray-800 text-center" >
                    <div className="flex justify-between lg:justify-center items-center gap-x-6 text-lg">
                      <span className="text-gray-400 lg:hidden"></span>
                      <div className="flex gap-x-6">
                        {/* Ver más */}
                        <button 
                          className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none cursor-pointer"
                          onClick={() => navigate(`/rutas/${item.id}`)} 
                        >
                          <FaRegEye />
                        </button>

                        {/* Editar */}
                        {hasPermission(user.data, RESOURCES.RUTAS, "update") && (
                          <button 
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none cursor-pointer"
                            onClick={() => navigate(`/rutas/editar/${item.id}`)}
                          >
                            <FaRegEdit />
                          </button>
                        )}

                        {/* Eliminar */}
                        {hasPermission(user.data, RESOURCES.RUTAS, "delete") && (
                          <button 
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none cursor-pointer"
                            onClick={() => deleteMutation.mutate(item.id)}
                          >
                            <MdDeleteOutline />
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableComponent;