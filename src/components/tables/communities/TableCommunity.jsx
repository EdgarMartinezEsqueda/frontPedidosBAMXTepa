import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import api from "lib/axios";
import { useAuth } from "context/AuthContext";

import { hasPermission, RESOURCES } from "utils/permisos";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const TableCommunities = ({ currentPage, pageSize, filters, setTotalCommunities }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Obtiene TODOS los datos paginados del servidor
  const { data: allCommunities, isLoading } = useQuery({
    queryKey: ["comunidades", currentPage, pageSize],
    queryFn: async () => {
      const { data } = await api.get("/comunidades", {
        params: { page: currentPage, pageSize }
      });
      setTotalCommunities(data.length);
      return data;
    }
  });

  // Filtrar datos localmente
  const filteredData = useMemo(() => {
    if (!allCommunities) return [];
    
    return allCommunities.filter(community => {
      const matchesCommunity = filters.comunidades.length === 0 ||  filters.comunidades.includes(community.nombre);
      
      const matchesRoute = filters.rutas.length === 0 ||  filters.rutas.includes(community.nombreRuta);
      
      const matchesMunicipality = filters.municipios.length === 0 ||  filters.municipios.includes(community.nombreMunicipio);
      
      return matchesCommunity && matchesRoute && matchesMunicipality;
    });
  }, [allCommunities, filters]);

  // Paginación local
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Mutación para eliminar comunidades
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/comunidades/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["comunidades"]);
      toast.success("Comunidad eliminada correctamente");
    },
    onError: () => {
      toast.error("Error eliminando la comunidad");
    }
  });
  
  return (
    <section className="container mx-auto m-6">
      <div className="flex flex-col items-center">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block md:min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800 hidden md:table-header-group">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      ID
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Comunidad
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Municipio
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Jefa Comunidad
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Ruta
                    </th>
                    <th className="relative py-3.5 px-4">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-black dark:text-white">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        {isLoading ? "Cargando..." : "No se encontraron comunidades con los filtros seleccionados"}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item,index) => (
                      <tr key={index} className="block md:table-row border-b border-gray-200 dark:border-gray-700 mb-4 md:mb-0 bg-white dark:bg-gray-800 shadow-sm md:shadow-none">
                        <td 
                          data-th="ID"
                          className="block md:table-cell py-4 px-4 text-sm whitespace-nowrap text-right md:text-left before:content-[attr(data-th)':_'] before:font-bold before:absolute before:left-4 before:text-gray-600 dark:before:text-gray-300 relative pl-28 md:before:content-none md:pl-4 even:bg-gray-50 dark:even:bg-gray-700/30">
                          {item.id}
                        </td>
                        <td 
                          data-th="Nombre"
                          className="block md:table-cell py-4 px-4 text-sm whitespace-nowrap text-right md:text-left before:content-[attr(data-th)':_'] before:font-bold before:absolute before:left-4 before:text-gray-600 dark:before:text-gray-300 relative pl-28 md:before:content-none md:pl-4 even:bg-gray-50 dark:even:bg-gray-700/30">
                          {item.nombre}
                        </td>
                        <td 
                          data-th="Municipio"
                          className="block md:table-cell py-4 px-4 text-sm whitespace-nowrap text-right md:text-left before:content-[attr(data-th)':_'] before:font-bold before:absolute before:left-4 before:text-gray-600 dark:before:text-gray-300 relative pl-28 md:before:content-none md:pl-4 even:bg-gray-50 dark:even:bg-gray-700/30">
                          {item.nombreMunicipio}
                        </td>
                        <td 
                          data-th="Jefa"
                          className="block md:table-cell py-4 px-4 text-sm whitespace-nowrap text-right md:text-left before:content-[attr(data-th)':_'] before:font-bold before:absolute before:left-4 before:text-gray-600 dark:before:text-gray-300 relative pl-28 md:before:content-none md:pl-4 even:bg-gray-50 dark:even:bg-gray-700/30">
                          {item.jefa == "" ? "Sin jefa asignada" : item.jefa}
                        </td>
                        <td 
                          data-th="Ruta"
                          className="block md:table-cell py-4 px-4 text-sm whitespace-nowrap text-right md:text-left before:content-[attr(data-th)':_'] before:font-bold before:absolute before:left-4 before:text-gray-600 dark:before:text-gray-300 relative pl-28 md:before:content-none md:pl-4 even:bg-gray-50 dark:even:bg-gray-700/30">
                          {item.nombreRuta}
                        </td>
                        <td className="block md:table-cell px-4 py-4 text-sm whitespace-nowrap relative even:bg-gray-50 dark:even:bg-gray-700/30">
                          <div className="flex justify-end md:justify-center gap-x-6 text-lg ">
                            <button
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none cursor-pointer"
                              onClick={() => navigate(`/comunidades/${item.id}`)}
                            >
                              <FaRegEye />
                            </button>
                            
                            {hasPermission(user.data, RESOURCES.COMUNIDADES, "update") && (
                              <button
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none cursor-pointer"
                                onClick={() => navigate(`/comunidades/editar/${item.id}`)}
                              >
                                <FaRegEdit />
                              </button>
                            )}

                            {hasPermission(user.data, RESOURCES.COMUNIDADES, "delete") && (
                              <button
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none cursor-pointer"
                                onClick={() => deleteMutation.mutate(item.id)}
                              >
                                <MdDeleteOutline />
                              </button>
                            )}
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

export default TableCommunities;