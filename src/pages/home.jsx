import { useState, useEffect } from "react";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrders from "components/tables/orders/TableOrders";
import FilterOrders from "components/filter/FilterOrders";
import Pagination from "components/pagination/Pagination";

const HomePage = () => {  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Estado para los filtros seleccionados
  const [workers, setWorkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [statusOrder, setStatusOrder] = useState([]);

  // Estado para el total de elementos
  const [totalOrders, setTotalOrders] = useState(0);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalOrders / pageSize);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [workers, routes, statusOrder, dateRange] );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
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
              rangoFechas: dateRange
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