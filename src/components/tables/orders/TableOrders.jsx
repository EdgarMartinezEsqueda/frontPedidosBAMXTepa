import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "lib/axios";
import ActionButtons from "components/buttons/ActionButtons";
import { RESOURCES } from "utils/permisos";

const TableComponent = ({  currentPage, pageSize, filters, setTotalOrders }) => {
  const queryClient = useQueryClient();

  // Obtiene TODOS los datos paginados del servidor
  const { data: allOrders, isLoading } = useQuery({
    queryKey: ["pedidos", currentPage, pageSize],
    queryFn: async () => {
      const { data } = await api.get("/pedidos", {
        params: { page: currentPage, pageSize }
      });
      setTotalOrders(data.length);
      return data;
    }
  });

  // Filtrar datos localmente
  const filteredData = useMemo(() => {
    if (!allOrders || !filters) return [];
    
    return allOrders.filter(order => {
      const matchesUser = filters.usuarios.length === 0 ||  filters.usuarios.includes(order.usuario.username);
      const matchesRoute = filters.rutas.length === 0 ||  filters.rutas.includes(order.ruta.nombre);
      const matchesStatus = filters.estatusPedido.length === 0 ||  filters.estatusPedido.includes(order.estado);
      
      const { startDate, endDate } = filters.rangoFechas || {};
      const orderDate = order.fechaEntrega;  // formato "YYYY-MM-DD"
      const matchesDate = (!startDate || orderDate >= startDate) &&  (!endDate || orderDate <= endDate);
    
      return matchesUser && matchesRoute && matchesStatus && matchesDate;
    });
  }, [allOrders, filters]);

  // Paginación local
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/pedidos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pedidos"]);
      toast.success("Pedido eliminado correctamente");
    },
    onError: () => {
      toast.error("Error eliminando el pedido");
    }
  });

  const getStatusStyle = (estado) => {
    const styles = {
      finalizado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      pendiente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    };
    return styles[estado] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  };
  
  return (
    <section className="container mx-auto m-6">
      <div className="w-full overflow-hidden rounded-lg lg:border lg:border-gray-200 lg:dark:border-gray-700">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 text-black dark:text-white">
          <thead className="hidden lg:table-header-group bg-gray-50 dark:bg-gray-800">
            <tr>
              {["ID", "Ruta", "Fecha", "Estatus", "Trabajador social", "Opciones"].map((header) => (
                <th key={header} className="px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y lg:divide-gray-200 lg:dark:divide-gray-700 lg:dark:bg-gray-900">
            {paginatedData.length === 0 ? (
              <tr className="block lg:table-row dark:bg-gray-800 rounded-lg shadow p-4 mb-4 lg:p-0 lg:shadow-none lg:bg-transparent">
                <td colSpan="6" className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400 block lg:table-cell">
                  No hay datos disponibles.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={index} className="block lg:table-row dark:bg-gray-800 rounded-lg shadow p-4 mb-4 lg:p-0 lg:shadow-none lg:bg-transparent">
                  {/* ID */}
                  <td className="hidden lg:table-cell px-4 py-4 text-sm text-center">{item.id}</td>

                  {/* Ruta */}
                  <td className="block lg:table-cell px-4 py-4 text-sm text-center">{item.ruta.nombre}</td>

                  {/* Fecha */}
                  <td className="block lg:table-cell px-4 py-4 text-sm text-center">{item.fechaEntrega}</td>

                  {/* Estatus */}
                  <td className="block lg:table-cell px-4 py-4 text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(item.estado)}`}>
                      {item.estado}
                    </span>
                  </td>

                  {/* Trabajador */}
                  <td className="block lg:table-cell px-4 py-4 text-sm text-center">{item.usuario.username}</td>

                  {/* Opciones */}
                  <td className="block md:table-cell px-4 py-4 text-sm text-center">
                    <ActionButtons
                      item={item}
                      resource={RESOURCES.PEDIDOS}
                      basePath="pedido"
                      onDelete={deleteMutation.mutate}
                      getEditCondition={(item) => item.estado === "finalizado"}
                      getDeleteCondition={(item) => item.estado === "finalizado"}
                    />
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