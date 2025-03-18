import React from 'react';

const MobileCard = ({ item, index, mode, handleChange }) => {
  return (
    <div className="md:hidden mb-4 p-4 bg-gray-800 rounded-lg shadow">
      <div className="space-y-3">
        <div className="border-b border-gray-700 pb-2">
          <h3 className="font-semibold text-white">{item.comunidad}</h3>
          <p className="text-gray-400 text-sm">{item.encargada}</p>
          <p className="text-gray-400 text-sm">{item.contacto}</p>
        </div>
        
        {[
          ['Con Costo', 'despensasConCosto'],
          ['Medio Costo', 'despensasMedioCosto'],
          ['Sin Costo', 'despensasSinCosto'],
          ['Apadrinadas', 'despensasApadrinadas']
        ].map(([label, field]) => (
          <div key={field} className="flex justify-between items-center">
            <span className="text-gray-400">{label}</span>
            {mode === 'view' ? (
              <span className="text-white">{item[field]}</span>
            ) : (
              <input
                type="number"
                min="0"
                value={item[field] || 0}
                onChange={(e) => handleChange(index, field, parseInt(e.target.value))}
                className="w-20 bg-gray-700 text-white rounded p-2 text-center"
              />
            )}
          </div>
        ))}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Arpilladas</span>
          {mode === 'view' ? (
            <span className="text-white">{item.arpilladas ? 'Sí' : 'No'}</span>
          ) : (
            <input
              type="checkbox"
              checked={item.arpilladas || false}
              onChange={(e) => handleChange(index, 'arpilladas', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded mr-8"
            />
          )}
        </div>

        <div className="border-t border-gray-700 pt-2">
          <span className="text-gray-400">Observaciones</span>
          {mode === 'view' ? (
            <p className="text-white">{item.observaciones || '-'}</p>
          ) : (
            <input
              type="text"
              value={item.observaciones || ''}
              onChange={(e) => handleChange(index, 'observaciones', e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2 mt-1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCard;