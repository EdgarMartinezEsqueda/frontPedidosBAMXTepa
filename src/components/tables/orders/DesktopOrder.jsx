import React from 'react';

const DesktopOrder = ({ mode, data, handleChange }) => {
  return (
    <div className="hidden md:block">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 px-4 text-md text-gray-500 dark:text-gray-300" >
                    Comunidad
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Encargada
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Contacto
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Despensas con costo
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Despensas medio costo
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Despensas sin costo
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Despensas apadrinadas
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Arpilladas
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-md text-gray-500 dark:text-gray-300" >
                    Observaciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                { !data || data.length === 0 
                ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                      No hay datos disponibles.
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      {/* Comunidad */}
                      <td className="py-4 px-4 text-sm whitespace-nowrap text-white">
                        <h3> {item.comunidad } </h3>
                      </td>

                      {/* Encargada */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-white">
                        <h3> { item.encargada } </h3>
                      </td>

                      {/* Contacto */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-white">
                        <h3> { item.contacto } </h3>
                      </td>

                      {/* Campos numéricos editables */}
                      {['despensasConCosto', 'despensasMedioCosto', 'despensasSinCosto', 'despensasApadrinadas'].map((field) => (
                        <td className="px-4 py-4 text-sm whitespace-nowrap" key={field}>
                          {mode === 'view' ? (
                            item[field]
                          ) : (
                            <input
                              type="number"
                              min="0"
                              value={item[field] || 0}
                              onChange={(e) => handleChange(index, field, parseInt(e.target.value))}
                              className="w-20 bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:text-white text-center m-auto"
                            />
                          )}
                        </td>
                      ))}

                      {/* Arpilladas */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {mode === 'view' ? (
                          item.arpilladas ? 'Sí' : 'No'
                        ) : (
                          <input
                            type="checkbox"
                            checked={item.arpilladas || false}
                            onChange={(e) => handleChange(index, 'arpilladas', e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 m-auto"
                          />
                        )}
                      </td>

                      {/* Observaciones */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {mode === 'view' ? (
                          item.observaciones
                        ) : (
                          <input
                            type="text"
                            value={item.observaciones || ''}
                            onChange={(e) => handleChange(index, 'observaciones', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        )}
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
  );
};

export default DesktopOrder;