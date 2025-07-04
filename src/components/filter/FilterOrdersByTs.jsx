import { useQuery } from "@tanstack/react-query";
import FilterDropdown from "components/filter/components/FilterDropdown";
import DateFilter from "components/filter/components/DateFilter";
import api from "lib/axios";

const FilterWrapper = ({
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
      return data;
    },
  });

  // Procesar datos para los filtros
  const availableRoutes = [ ...new Set( pedidosData?.map(u => u.ruta.nombre) ) ].reverse() || [];
  const statusOrders = ["pendiente", "finalizado"];
  
  return (
    <div className="flex flex-wrap gap-4 p-4 sm:gap-8 items-center justify-center">
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

      <DateFilter onDateChange={setDateRange} />
    </div>
  );
};

export default FilterWrapper;