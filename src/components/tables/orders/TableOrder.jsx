import React, { useEffect } from "react";

import DesktopOrder from "components/tables/orders/DesktopOrder";
import MobileOrder from "components/tables/orders/MobileOrder";

const TableComponent = ({ 
  mode = 'view',
  data = [],
  comunidades = [], 
  onDataChange 
}) => {
  useEffect(() => {
    if (mode === 'create' && comunidades.length > 0 && data.length === 1) {
      const initialData = comunidades.map(comunidad => ({
        idComunidad: comunidad.id,
        comunidad: comunidad.nombre,
        encargada: comunidad.jefa,
        contacto: comunidad.contacto,
        despensasConCosto: 0,
        despensasMedioCosto: 0,
        despensasSinCosto: 0,
        despensasApadrinadas: 0,
        arpilladas: false,
        observaciones: ''
      }));
      onDataChange(initialData);
    }
  }, [mode, comunidades, data, onDataChange]);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onDataChange(newData);
  };

  return (
    <section className="container px-4 mx-auto md:py-4">
      {/* Tabla de escritorio */}
      <DesktopOrder 
        mode={mode} 
        data={data} 
        handleChange={handleChange}
      />
      {/* Tabla Versión móvil */}
      <MobileOrder 
        mode={mode} 
        data={data} 
        handleChange={handleChange}
      />
    </section>
  );
};

export default TableComponent;