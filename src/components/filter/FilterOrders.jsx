import React, { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import DateFilter from './DateFilter';

const FilterWrapper = () => {
  // Estado para todos los filtros
  const [workers, setWorkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [statusOrder, setStatusOrder] = useState([]);

  // Datos de ejemplo vendrán de la API al final 
  const [availableWorkers] = useState(['Ana Pérez', 'Carlos Rojas', 'María Gómez']);
  const [availableRoutes] = useState(['Ruta 01', 'Ruta 05', 'Ruta 12']);
  const [availableMunicipalities] = useState(['Municipio A', 'Municipio B']);
  const [availableCommunities] = useState(['Comunidad X', 'Comunidad Y']);

  // Estatus de los pedidos
  const [statusOrders] = useState(['Pendiente', 'Finalizado']);

  // Efecto para cambios en los filtros
  useEffect(() => {
    // Aquí iría la lógica para actualizar resultados
    console.log('Filtros actualizados:', {
      workers,
      routes,
      municipalities,
      communities,
      statusOrder,
      dateRange
    });
  }, [workers, routes, municipalities, communities, statusOrder, dateRange]);

  return (
    <div className="flex flex-wrap gap-4 p-4 sm:gap-8 items-center justify-center">
      <FilterDropdown
        title="Trabajadores"
        allItems={availableWorkers}
        selectedItems={workers}
        onSelectionChange={setWorkers}
      />

      <FilterDropdown
        title="Rutas"
        allItems={availableRoutes}
        selectedItems={routes}
        onSelectionChange={setRoutes}
      />

      <FilterDropdown
        title="Municipios"
        allItems={availableMunicipalities}
        selectedItems={municipalities}
        onSelectionChange={setMunicipalities}
      />

      <FilterDropdown
        title="Comunidades"
        allItems={availableCommunities}
        selectedItems={communities}
        onSelectionChange={setCommunities}
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