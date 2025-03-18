import { useState } from "react";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableOrder from "components/tables/orders/TableOrder";
import AcceptButton from "components/buttons/Accept";
import SelectRuta from "components/selects/SelectRuta";

const NewOrder = ( props ) => {
  const [selectedRutaId, setSelectedRutaId] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [newPedido, setNewPedido] = useState([{
    comunidad: '',
    encargada: '',
    contacto: '',
    despensasConCosto: 0,
    despensasMedioCosto: 0,
    despensasSinCosto: 0,
    despensasApadrinadas: 0,
    arpilladas: false,
    observaciones: ''
  }]);

  const comunidadesList = [
    { id: 1, nombre: 'Comunidad 1', jefa: "Encargada 1", contacto: "123-456-7890" },
    { id: 2, nombre: 'Comunidad 2', jefa: "Encargada 2", contacto: "123-456-7890" },
    { id: 3, nombre: 'Comunidad 3', jefa: "Encargada 3", contacto: "123-456-7890" },
  ];

  const rutas = [
    { id: 1, nombre: '1' },
    { id: 2, nombre: '2' },
    { id: 3, nombre: '3' },
  ];

  // Obtener idTs (ejemplo usando useParams)
  const idTs = "1";

  // Función de envío
  const handleSubmit = async () => {
    if (!idTs || !selectedRutaId || !fechaEntrega ) {
      alert("Completa todos los campos requeridos");
      return;
    }
    const comunidadesData = newPedido.map(pedido => ({
      idComunidad: pedido.idComunidad,
      comunidad: pedido.comunidad,
      despensasCosto: pedido.despensasConCosto,
      despensasMedioCosto: pedido.despensasMedioCosto,
      despensasSinCosto: pedido.despensasSinCosto,
      despensasApadrinadas: pedido.despensasApadrinadas,
      arpilladas: pedido.arpilladas,
      observaciones: pedido.observaciones
    }));

    console.log(comunidadesData);
  };

  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h2 className="font-bold text-2xl w-full text-center pt-4 text-verdeLogo">Crear pedido para Ruta 
          <SelectRuta rutas={rutas} /* Mostrar la lista de rutas */
            value={selectedRutaId} 
            onChange={(e) => setSelectedRutaId(Number(e.target.value))} />
        </h2>
        {/* Fecha de entrega */}
        <div className="flex justify-center items-center my-4">
          <label htmlFor="fechaEntrega" className="block text-md px-2">Fecha de entrega: </label>
          <input 
            type="date" 
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            className="border p-2 rounded text-center"
            required
          />
        </div>
        {/* Tabla del pedido */}
        <TableOrder 
          mode="create"
          data={newPedido}
          comunidades={comunidadesList}
          onDataChange={setNewPedido}
        />
        
        <div className="flex justify-center items-center flex-col max-w-md m-auto">
          <h2 htmlFor="devueltas" className="block font-bold text-2xl text-rojoLogo">Total despensas</h2>
          <h3 className="relative flex items-center text-amarilloLogo text-xl font-bold">
            {newPedido.reduce((total, pedido) => {
              return total + 
                (pedido.despensasConCosto || 0) + 
                (pedido.despensasMedioCosto || 0) + 
                (pedido.despensasSinCosto || 0) + 
                (pedido.despensasApadrinadas || 0);
            }, 0)}
          </h3>
          <h2 htmlFor="devueltas" className="block text-md text-grisLogo">
            <strong className="text-amarilloLogo">
              {newPedido.reduce((total, pedido) => {
                return pedido.arpilladas 
                  ? total + 
                    (pedido.despensasConCosto || 0) + 
                    (pedido.despensasMedioCosto || 0) + 
                    (pedido.despensasSinCosto || 0) + 
                    (pedido.despensasApadrinadas || 0)
                  : total;
              }, 0)}
            </strong> Arpilladas</h2>
        </div>

        <div className="flex justify-center py-4">
          <AcceptButton disabled={false} onClick={handleSubmit}/>
        </div>
      </main>
      <Footer />
      </div>
  );
};

export default NewOrder;