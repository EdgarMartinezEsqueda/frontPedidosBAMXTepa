import { useState, useEffect } from "react";

import { loadFiltros } from "utils/filtrosPedidos"

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrders from "components/tables/orders/TableOrders";
import FilterOrders from "components/filter/FilterOrders";
import Pagination from "components/pagination/Pagination";
import ExportButton from "../components/buttons/ExportButton";

const HomePage = () => {
  const filtrosIniciales = loadFiltros();

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Estado para los filtros seleccionados
  const [workers, setWorkers] = useState(filtrosIniciales.workers || []);
  const [routes, setRoutes] = useState(filtrosIniciales.routes || []);
  const [dateRange, setDateRange] = useState(filtrosIniciales.dateRange || {});
  const [statusOrder, setStatusOrder] = useState(filtrosIniciales.statusOrder || []);

  // Estado para el total de elementos
  const [totalOrders, setTotalOrders] = useState(0);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalOrders / pageSize);

  // Cargar filtros desde localStorage al montar el componente
  useEffect(() => {
    const filtrosGuardados = localStorage.getItem("filtrosPedidos");
    if (filtrosGuardados) {
      const parsed = JSON.parse(filtrosGuardados);
      setWorkers(parsed.workers || []);
      setRoutes(parsed.routes || []);
      setDateRange(parsed.dateRange || {});
      setStatusOrder(parsed.statusOrder || []);
    }
  }, []);

  // Guardar filtros en localStorage cada vez que cambian
  useEffect(() => {
    const filtros = {
      workers,
      routes,
      dateRange,
      statusOrder,
    };
    localStorage.setItem("filtrosPedidos", JSON.stringify(filtros));
  }, [workers, routes, dateRange, statusOrder]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [workers, routes, statusOrder, dateRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 mx-auto mt-4 flex justify-between items-center">
          <h2 className="font-bold text-2xl text-verdeLogo">Pedidos</h2>
          <ExportButton
            filters={{
              usuarios: workers,
              rutas: routes,
              estatusPedido: statusOrder,
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            }}
          />
        </div>

        <FilterOrders
          workers={workers}
          setWorkers={setWorkers}
          routes={routes}
          setRoutes={setRoutes}
          dateRange={dateRange}
          setDateRange={setDateRange}
          statusOrder={statusOrder}
          setStatusOrder={setStatusOrder}
        />

        <div className="container px-4 mx-auto md:py-4">
          <TableOrders
            currentPage={currentPage}
            pageSize={pageSize}
            filters={{
              usuarios: workers,
              rutas: routes,
              estatusPedido: statusOrder,
              rangoFechas: dateRange,
            }}
            setTotalOrders={setTotalOrders}
          />
        </div>

        <div className="my-4">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
