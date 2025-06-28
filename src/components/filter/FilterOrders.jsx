import { useQuery } from "@tanstack/react-query";
import FilterDropdown from "components/filter/components/FilterDropdown";
import DateFilter from "components/filter/components/DateFilter";
import api from "lib/axios";

const FilterWrapper = ({
  workers,
  setWorkers,
  routes,
  setRoutes,
  dateRange,
  setDateRange,
  statusOrder,
  setStatusOrder
}) => {
  // Fetch para trabajadores
  const { data: pedidosData } = useQuery({
    queryKey: ["pedidos"],
    queryFn: async () => {
      const { data } = await api.get("/pedidos");
      return data.pedidos;
    },
  });

  // Procesar datos para los filtros
  const availableRoutes = [ ...new Set( pedidosData?.map(u => u.ruta.nombre) ) ].reverse() || [];
  const availableWorkers = [ ...new Set( pedidosData?.map(u => u.usuario.username) ) ] || [];
  const statusOrders = ["pendiente", "finalizado"];
  
  return (
    <div className="flex flex-wrap gap-4 p-4 sm:gap-8 items-center justify-center">
      <FilterDropdown
        title="Trabajadores"
        allItems={availableWorkers}
        selectedItems={workers}
        onSelectionChange={setWorkers}
        loading={!pedidosData}
      />

      <FilterDropdown
        title="Rutas"
        allItems={availableRoutes}
        selectedItems={routes}
        onSelectionChange={setRoutes}
        loading={!pedidosData}
      />

      <FilterDropdown
        title="Estatus"
        allItems={statusOrders}
        selectedItems={statusOrder}
        onSelectionChange={setStatusOrder}
      />

      <DateFilter 
        onDateChange={setDateRange}
        dateRange={dateRange}
      />
    </div>
  );
};

export default FilterWrapper;