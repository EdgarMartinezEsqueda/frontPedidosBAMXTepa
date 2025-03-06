import { useState } from "react";
import { useParams } from "react-router";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/TableOrder";
import GroupButtons from "components/buttons/ButtonsForOrderEdit";

const HomePage = ( props ) => {
  const { id } = useParams();
  const initialData = "";   // AQUI ESTARÁ LA DATA DEL PEDIDO
  const [editableData, setEditableData] = useState(initialData);

  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h2 className="font-bold text-2xl w-full text-center pt-4 text-verdeLogo"> Editar pedido Ruta { id }</h2>
        <TableOrder
          mode="edit"
          data={editableData}
          onDataChange={setEditableData}
        />
        <div className="flex justify-center">
          <GroupButtons disabled={props /*|| props.lenght == 0*/} />
        </div>
      </main>
      <Footer />
      </div>
  );
};

export default HomePage;