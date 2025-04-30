import { useState, useEffect } from "react";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableCommunity from "components/tables/communities/TableCommunity";
import NewCommunityButton from "components/buttons/ButtonsForCommunityPage";
import FilterCommunities from "components/filter/FilterCommunities";
import Pagination from "components/pagination/Pagination";
import { hasPermission, RESOURCES } from "utils/permisos";
import { useAuth } from "context/AuthContext";

const AllRoutes = () => {
  const { user } = useAuth();
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Estados de filtros
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);

  // Estado para el total de elementos
  const [totalCommunities, setTotalCommunities] = useState(0);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalCommunities / pageSize);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCommunities, selectedRoutes, selectedMunicipalities]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h2 className="text-2xl font-bold text-verdeLogo m-3 text-center">
          Gestión de comunidades actuales
        </h2>

        {hasPermission(user.data, RESOURCES.COMUNIDADES, "create") && (
          <NewCommunityButton />
        )}

        <FilterCommunities
          selectedCommunities={selectedCommunities}
          setSelectedCommunities={setSelectedCommunities}
          selectedRoutes={selectedRoutes}
          setSelectedRoutes={setSelectedRoutes}
          selectedMunicipalities={selectedMunicipalities}
          setSelectedMunicipalities={setSelectedMunicipalities}
        />

        <TableCommunity
          currentPage={currentPage}
          pageSize={pageSize}
          filters={{
            comunidades: selectedCommunities,
            rutas: selectedRoutes,
            municipios: selectedMunicipalities
          }}
          setTotalCommunities={setTotalCommunities}
        />

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

export default AllRoutes;