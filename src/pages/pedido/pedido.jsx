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
        <h2 className="font-bold text-2xl w-full text-center pt-4 text-verdeLogo">Pedido #{ id }</h2>
        <h2 className="text-md w-full text-center text-rojoLogo">{ pedidoData.ruta.nombre}</h2>
        <h3 className="text-sm w-full text-center">Hecho por: {pedidoData.usuario.username}</h3>
        <TableOrder 
          mode="view"
          data={pedidoData} 
        />
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