import { useParams } from "react-router";
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

  const { data: pedidoData, isLoading, isError } = useQuery({
    queryKey: ["pedido"],
    queryFn: async () => {
      const { data } = await api.get(`/pedidos/${id}`);
      return data;
    },
    onError: () => toast.error("Error cargando el pedido")
  });
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-md text-center">
          Cargando datos del pedido...
        </main>
        <Footer />
      </div>
    );
  }
  
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
        { pedidoData.estado === "finalizado" && 
          <div className="flex justify-center">
            <h3>Despensas retornadas a BAMX Tepatitlán <strong className="text-rojoLogo"> {pedidoData.devoluciones ?? 0 }</strong> </h3>
          </div>
        }
      </main>
      <Footer />
      </div>
  );
};

export default OrderPage;