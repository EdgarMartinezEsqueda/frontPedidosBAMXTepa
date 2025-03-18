import { useParams } from "react-router";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/orders/TableOrder";
import GroupButtons from "components/buttons/ButtonsForOrderPage";

const HomePage = ( props ) => {
  const { id } = useParams();
  const editable = props?.lenght == 0 || props?.status == "finalizado";
  const pedidoData = props.data ?? [];
  
  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h2 className="font-bold text-2xl w-full text-center pt-4 text-verdeLogo">Pedido Ruta { id }</h2>
        <h3 className="text-sm w-full text-center">Hecho por: {props.idTs ?? "lorem ipsum"}</h3>
        <TableOrder 
          mode="view"
          data={pedidoData} 
        />
        <div className="flex justify-center">
          <GroupButtons disabled={ !editable }/>
        </div>
      </main>
      <Footer />
      </div>
  );
};

export default HomePage;