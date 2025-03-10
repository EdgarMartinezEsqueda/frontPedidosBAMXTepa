import React from "react";

const TableComponent = ({ 
  mode = 'view', // 'view' | 'edit' | 'create'
  data = [],
  comunidades = [], // Solo necesario en modo create
  onDataChange 
}) => {
  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onDataChange(newData);
  };

  const handleComunidadChange = (index, comunidadId) => {
    const selectedComunidad = comunidades.find(c => c.id === comunidadId);
    if (!selectedComunidad) return;

    const newData = [...data];
    newData[index] = {
      ...newData[index],
      comunidad: selectedComunidad.nombre,
      encargada: selectedComunidad.encargada,
      contacto: selectedComunidad.contacto
    };
    onDataChange(newData);
  };

  return (
    <section className="container px-4 mx-auto md:py-4">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Nombre Comunidad
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Municipio
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Jefa de comunidad
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Contacto
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                      Dirección
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {!data || data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        {/* Comunidad */}
                        <td className="py-4 px-4 text-sm whitespace-nowrap">
                          {mode === 'create' ? (
                            <select
                              value={item.comunidadId || ''}
                              onChange={(e) => handleComunidadChange(index, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                              <option value="">Seleccionar</option>
                              {comunidades.map(comunidad => (
                                <option key={comunidad.id} value={comunidad.id}>
                                  {comunidad.nombre}
                                </option>
                              ))}
                            </select>
                          ) : item.comunidad}
                        </td>

                        {/* Encargada */}
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {mode === 'create' ? 
                            <input type="text" name={item.encargada} id={item.encargada} value={item.encargada} /> 
                            : item.encargada }
                        </td>

                        {/* Contacto */}
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {mode === 'create' ? 
                            <input type="text" name={item.contacto} id={item.contacto} value={item.contacto} /> 
                            : item.contacto }
                        </td>

                        {/* Dirección */}
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {mode === 'create' ? 
                            <input type="text" name={item.direccion} id={item.direccion} value={item.direccion} /> 
                            : item.direccion }
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableComponent;