import { useState } from "react";
import { useParams } from "react-router";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/TableOrder";
import GroupButtons from "components/buttons/ButtonsForOrderEdit";

const HomePage = ( props ) => {
  const { id } = useParams();
  const disabled = props || props.lenght == 0;
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
        
        <div className="flex justify-center items-center flex-col max-w-md m-auto">
          <h2 htmlFor="regresadas" className="block font-bold text-2xl text-rojoLogo">Despensas regresadas</h2>
          <div className="relative flex items-center mt-2">
              <input type="text" placeholder="0" className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 
              ${ disabled
                ? "text-gray-400 cursor-not-allowed dark:text-gray-500"
                : "focus:border-amarilloLogo dark:focus:border-amarilloLogo focus:ring-amarilloLogo focus:outline-none focus:ring focus:ring-opacity-40"
              }`} />
          </div>
        </div>
        
        <div className="flex justify-center py-6">
          <GroupButtons disabled={disabled} />
        </div>
      </main>
      <Footer />
      </div>
  );
};

export default HomePage;