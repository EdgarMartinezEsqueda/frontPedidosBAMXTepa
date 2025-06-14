import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "lib/axios";
import { hasPermission, RESOURCES } from "utils/permisos";
import { useAuth } from "context/AuthContext";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/orders/TableOrder";
import GroupButtons from "components/buttons/ButtonsForOrderPage";
import ExportSingleOrderButton from "components/buttons/ExportSingleOrderButton";

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: pedidoData, isLoading, isError, error: errorPedido } = useQuery({
    queryKey: ["pedido", id],
    queryFn: async () => {
      const { data } = await api.get(`/pedidos/${id}`);
      return data;
    },
    retry: false, // Evitar reintentos automáticos
  });
  
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {errorPedido.message}</div>;

  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
          <div className="container px-4 mx-auto mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="text-center md:text-left">
                <h2 className="font-bold text-2xl text-verdeLogo">Pedido #{id}</h2>
                <h2 className="text-md text-rojoLogo">{pedidoData.ruta.nombre}</h2>
                <h3 className="text-sm">Hecho por: {pedidoData.usuario.username}</h3>
              </div>
              <div className="self-center md:self-start">
                <ExportSingleOrderButton pedido={pedidoData} />
              </div>
            </div>
          </div>
        <TableOrder 
          mode="view"
          data={pedidoData} 
        />
        <div className="flex justify-center items-center flex-col max-w-md m-auto">
          <h2 htmlFor="devueltas" className="block font-bold text-2xl text-rojoLogo">Total despensas</h2>
          <h3 className="relative flex items-center text-amarilloLogo text-xl font-bold">
            {pedidoData.pedidoComunidad.reduce((total, pedido) => {
              return total + 
              (pedido.despensasCosto || 0) + 
              (pedido.despensasMedioCosto || 0) + 
              (pedido.despensasSinCosto || 0) + 
              (pedido.despensasApadrinadas || 0);
            }, 0)}
          </h3>
          <h2 htmlFor="devueltas" className="block text-md text-grisLogo dark:text-white">
            <strong className="text-amarilloLogo">
              {pedidoData.pedidoComunidad.reduce((total, pedido) => {
                return pedido.arpilladas 
                ? total + 
                (pedido.despensasCosto || 0) + 
                (pedido.despensasMedioCosto || 0) + 
                (pedido.despensasSinCosto || 0) + 
                (pedido.despensasApadrinadas || 0)
                : total;
              }, 0)}
            </strong> Arpilladas</h2>
        </div>
        {hasPermission(user.data, RESOURCES.PEDIDOS, "update", pedidoData.idTs) && pedidoData.estado !== "finalizado" && 
          <div className="flex justify-center">
            <GroupButtons disabled={ pedidoData.estado === "finalizado" } id={id}/>
          </div>
        }
        {pedidoData.estado === "finalizado" && 
          <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow-sm mt-4">
            <h3 className="text-center text-xl font-bold text-verdeLogo mb-4">
              Detalles finales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                <span className="font-semibold text-gray-600">
                  Despensas retornadas:
                </span>
                <span className="text-rojoLogo font-bold text-lg">
                  {pedidoData.devoluciones ?? 0}
                </span>
              </div>
              
              <div className="flex items-center gap-2 justify-center">
                <span className="font-semibold text-gray-600">
                  Hora de llegada:
                </span>
                <span className="text-amarilloLogo font-bold text-lg">
                  {pedidoData.horaLlegada 
                    ? new Date(`2000-01-01T${pedidoData.horaLlegada}`)
                        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : <span className="text-gray-400">N/A</span>}
                </span>
              </div>
            </div>
          </div>
        }
      </main>
      <Footer />
      </div>
  );
};

export default OrderPage;