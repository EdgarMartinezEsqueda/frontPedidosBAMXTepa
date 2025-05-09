import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "lib/axios";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import Sidebar from "components/sidebar/Sidebar";
import ChartComponent from "components/charts/Chart";
import Pagination from "components/pagination/Pagination";
import SearchInput from "components/search/Search";
import KPICard from "components/cards/KPICard";
import TableComponent from "components/tables/reports/Summary";

const ReportEconomico = () => {
  const [currentComPage, setCurrentComPage] = useState(1);
  const [currentMunPage, setCurrentMunPage] = useState(1);
  const [currentRutaPage, setCurrentRutaPage] = useState(1);
  const [searchCom, setSearchCom] = useState("");
  const [searchMun, setSearchMun] = useState("");
  const [searchRuta, setSearchRuta] = useState("");
  const itemsPerPage = 10;

  const { data: reportesData, isLoading, error } = useQuery({
    queryKey: ["reportesEconomia"],
    queryFn: async () => {
      const { data } = await api.get("/reportes/economicos");
      return data;
    }
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div> && toast.error("Error cargando los reportes");

  const {
    resumenGlobal,
    evolucionMensual,
    distribucionComunidades,
    distribucionMunicipios,
    distribucionRutas
  } = reportesData;

  // Funciones de transformación
  const transformarEvolucionMensual = (data) => {
    if (!data) return [];
    return data.map(item => ({
      ...item,
      mes: new Date(item.mes).toLocaleDateString("es-MX", {
        month: "short",
        year: "2-digit"
      }).replace(/\./g, ""),
      costoTotal: item.costoTotal || 0,
      ingresosRecaudados: item.ingresosRecaudados || 0,
      balance: item.balance || 0
    }));
  };

  // Funciones de filtrado y paginación
  const filterData = (data, searchTerm) => 
    data.filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.municipio?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const paginate = (data, page) => ({
    data: data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    totalPages: Math.ceil(data.length / itemsPerPage)
  });

  // Datos filtrados
  const comunidadesFiltradas = filterData(distribucionComunidades, searchCom);
  const municipiosFiltrados = filterData(distribucionMunicipios, searchMun);
  const rutasFiltradas = filterData(distribucionRutas, searchRuta);
  console.log(reportesData)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          {/* Sección de KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Costo Total"
              value={`$${resumenGlobal.costoTotal.toLocaleString()}`}
              trend={resumenGlobal.costoTotal > resumenGlobal.ingresosRecaudados ? "negative" : "positive"}
            />
            <KPICard
              title="Ingresos Recaudados"
              value={`$${resumenGlobal.ingresosRecaudados.toLocaleString()}`}
            />
            <KPICard
              title="Despensas Subsidiadas"
              value={`$${resumenGlobal.despensasSubsidiadas.toLocaleString()}`}
            />
            <KPICard
              title="Balance Neto"
              value={`$${resumenGlobal.balanceNeto.toLocaleString()}`}
              trend={resumenGlobal.balanceNeto >= 0 ? "positive" : "negative"}
            />
          </div>

          {/* Gráficos principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartComponent
              type="line"
              title="Evolución Mensual ($)"
              data={transformarEvolucionMensual(evolucionMensual)}
              bars={[
                { dataKey: "costoTotal", name: "Costo Total", color: "#E09E00" },
                { dataKey: "ingresosRecaudados", name: "Ingresos", color: "#00E10C" },
                { dataKey: "despensasSubsidiadas", name: "Subsidiadas", color: "#E0005C" },
                { dataKey: "balance", name: "Balance", color: "#0044E0" }
              ]}
            />
            <ChartComponent
              type="comparative"
              title="Distribución de Tipos de Despensas ($)"
              data={transformarTiposDespensasBar(resumenGlobal?.detalle)}
              bars={[
                { 
                  dataKey: "valor",
                  name: "Cantidad",
                  color: "#F59E0B" // Color base, se sobreescribe con el color de cada barra
                }
              ]}
              
            />
          </div>

          {/* Distribución por Comunidades */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Distribución por Comunidades</h2>
              <SearchInput
                value={searchCom}
                onChange={(e) => setSearchCom(e.target.value)}
                placeholder="Buscar comunidad..."
                className="w-64"
              />
            </div>
            <TableComponent
              columns={[
                { key: "nombre", title: "Comunidad" },
                { key: "municipio", title: "Municipio" },
                { key: "costoTotal", title: "Costo Total", render: (v) => `$${v}` },
                { key: "ingresosRecaudados", title: "Ingresos", render: (v) => `$${v}` },
                { key: "balance", title: "Balance", 
                  render: (v) => (
                    <span className={`${v >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${v}
                    </span>
                  ) 
                }
              ]}
              data={paginate(comunidadesFiltradas, currentComPage).data}
            />
            <Pagination
              currentPage={currentComPage}
              totalPages={paginate(comunidadesFiltradas, currentComPage).totalPages}
              onPageChange={setCurrentComPage}
            />
          </div>

          {/* Distribución por Municipios */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Distribución por Municipios</h2>
              <SearchInput
                value={searchMun}
                onChange={(e) => setSearchMun(e.target.value)}
                placeholder="Buscar municipio..."
                className="w-64"
              />
            </div>
            <ChartComponent
              type="line"
              title="Tendencias Financieras por Municipio"
              data={transformarComparativaMunicipiosLine(distribucionMunicipios)}
              bars={[
                { 
                  dataKey: "CostoTotal", 
                  name: "Costo Total", 
                  color: "#F59E0B" // Naranja
                },
                { 
                  dataKey: "Ingresos", 
                  name: "Ingresos Recaudados", 
                  color: "#10B981" // Verde
                },
                { 
                  dataKey: "Subsidiado", 
                  name: "Subsidiado", 
                  color: "#3B82F6" // Azul
                }
              ]}
            />
            <TableComponent
              columns={[
                { key: "nombre", title: "Municipio" },
                { key: "costoTotal", title: "Costo Total", render: (v) => `$${v}` },
                { key: "ingresosRecaudados", title: "Ingresos", render: (v) => `$${v}` },
                { key: "balance", title: "Balance", 
                  render: (v) => (
                    <span className={`${v >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${v}
                    </span>
                  ) 
                }
              ]}
              data={paginate(municipiosFiltrados, currentMunPage).data}
            />
            <Pagination
              currentPage={currentMunPage}
              totalPages={paginate(municipiosFiltrados, currentMunPage).totalPages}
              onPageChange={setCurrentMunPage}
            />
          </div>

          {/* Distribución por Rutas */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Distribución por Rutas</h2>
              <SearchInput
                value={searchRuta}
                onChange={(e) => setSearchRuta(e.target.value)}
                placeholder="Buscar ruta..."
                className="w-64"
              />
            </div>
            <ChartComponent
              type="line"
              title="Comparativa Financiera por Ruta"
              data={transformarDatosRutasLine(distribucionRutas)}
              bars={[
                { 
                  dataKey: "CostoTotal", 
                  name: "Costo Total", 
                  color: "#F59E0B" // Naranja
                },
                { 
                  dataKey: "Ingresos", 
                  name: "Ingresos Recaudados", 
                  color: "#10B981" // Verde
                },
                { 
                  dataKey: "Subsidiado", 
                  name: "Subsidiado", 
                  color: "#3B82F6" // Azul
                }
              ]}
            />
            <TableComponent
              columns={[
                { key: "nombre", title: "Ruta" },
                { key: "costoTotal", title: "Costo Total", render: (v) => `$${v}` },
                { key: "ingresosRecaudados", title: "Ingresos", render: (v) => `$${v}` },
                { key: "balance", title: "Balance",
                  render: (v) => (
                    <span className={`${v >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${v}
                    </span>
                  )
                }
              ]}
              data={paginate(rutasFiltradas, currentRutaPage).data}
            />
            <Pagination
              currentPage={currentRutaPage}
              totalPages={paginate(rutasFiltradas, currentRutaPage).totalPages}
              onPageChange={setCurrentRutaPage}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const transformarTiposDespensasBar = (detalle) => {
  if (!detalle) return [];
  
  return [
    {
      ruta: "Costo Completo",
      valor: detalle.costoCompleto || 0,
      color: "#F59E0B"
    },
    {
      ruta: "Medio Costo",
      valor: detalle.medioCosto || 0,
      color: "#10B981"
    },
    {
      ruta: "Sin Costo",
      valor: detalle.sinCosto || 0,
      color: "#FB7185"
    },
    {
      ruta: "Apadrinadas", 
      valor: detalle.apadrinadas || 0,
      color: "#0F766E"
    }
  ];
};

const transformarTiposDespensas = (detalle) => {
  if (!detalle) return [];
  return [
    { name: "Costo Completo", value: detalle.costoCompleto || 0 },
    { name: "Medio Costo", value: detalle.medioCosto || 0 },
    { name: "Sin Costo", value: detalle.sinCosto || 0 },
    { name: "Apadrinadas", value: detalle.apadrinadas || 0 }
  ];
};

const transformarComparativaMunicipiosLine = (data) => {
  if (!data) return [];
  
  return data.map(municipio => ({
    mes: municipio.nombre, // Usaremos 'mes' como key para el eje X
    CostoTotal: municipio.costoTotal || 0,
    Ingresos: municipio.ingresosRecaudados || 0,
    Subsidiado: municipio.despensasSubsidiadas || 0
  }));
};

const transformarDatosRutasLine = (data) => {
  if (!data) return [];
  
  return data.map(ruta => ({
    mes: ruta.nombre, // El nombre de la ruta irá en el eje X
    CostoTotal: ruta.costoTotal,
    Ingresos: ruta.ingresosRecaudados,
    Subsidiado: ruta.despensasSubsidiadas
  }));
};

export default ReportEconomico;