import React from 'react';
import MobileCard from 'components/tables/orders/MobileCard';

const MobileOrder = ({ mode, data, handleChange }) => {
  return (
    <div className="md:hidden space-y-4">
      {data.length === 0 ? (
        <div className="text-center text-gray-400 p-4">
          No hay datos disponibles
        </div>
      ) : (
        data.map((item, index) => (
          <MobileCard 
            key={index} 
            item={item} 
            index={index}
            mode={mode}
            handleChange={handleChange}
          />
        ))
      )}
    </div>
  );
};

export default MobileOrder;