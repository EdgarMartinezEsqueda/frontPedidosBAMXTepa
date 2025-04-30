import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router";
import api from "lib/axios";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const TableComponent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const { data } = await api.get("/usuarios");
      return data;
    },
    onError: () => toast.error("Error cargando usuarios")
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/usuarios/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["usuarios"]);
      toast.success("Usuario eliminado correctamente");
    },
    onError: () => {
      toast.error("Error eliminando al usuario");
    }
  });

  return (
    <section className="container mx-auto m-6">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg w-3/4 lg:w-1/2 m-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      ID
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Username
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Rol
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Verificado
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-black dark:text-white">
                  {!data || data.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        {/* ID */}
                        <td className="py-4 px-4 text-sm whitespace-nowrap">
                          {item.id}
                        </td>
                        {/* Nombre del Usuario */}
                        <td className="py-4 px-4 text-sm whitespace-nowrap">
                          {item.username}
                        </td>
                        {/* Nombre de la Usuario */}
                        <td className="py-4 px-4 text-sm whitespace-nowrap">
                          {item.rol}
                        </td>
                        {/* Nombre de la Usuario */}
                        <td className="py-4 px-4 text-sm whitespace-nowrap">
                          {item.verificado == 1 ? "Verificado" : "Sin Verificar"}
                        </td>
                        {/* Opciones */}
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex justify-center gap-x-6 text-lg">
                            {/* Ver mas sobre la Usuario */}
                            <button 
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none  cursor-pointer"
                              onClick={() => navigate(`/usuarios/${item.id}`)} 
                            >
                              <FaRegEye />
                            </button>
                            {/* Editar Usuario */}
                            <button 
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none  cursor-pointer"
                              onClick={() => navigate(`/usuarios/editar/${item.id}`)}
                            >
                              <FaRegEdit />
                            </button>
                            {/* Eliminar Usuario */}
                            <button 
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none  cursor-pointer"
                              onClick={() => deleteMutation.mutate(item.id)}
                            >
                              <MdDeleteOutline />
                            </button>
                          </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableComponent;