import { useParams } from "react-router";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/TableOrder";
import GroupButtons from "components/buttons/ButtonsForOrderPage";

const HomePage = ( props ) => {
  const { id } = useParams();
  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h2 className="font-bold text-2xl w-full text-center pt-4 text-verdeLogo">Pedido Ruta { id }</h2>
        <TableOrder 
          mode="view"
          data={pedidoData} 
        />
        <div className="flex justify-center">
          <GroupButtons disabled={props || props.lenght == 0}/>
        </div>
      </main>
      <Footer />
      </div>
  );
};

export default HomePage;