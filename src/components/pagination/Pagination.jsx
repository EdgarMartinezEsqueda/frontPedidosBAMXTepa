import { useState } from "react";

const Pagination = ({ totalPages = 1 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Generate visible page numbers
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-sm rounded-md py-2 px-4 ${
            currentPage === 1 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-stone-800/5 hover:border-stone-800/5"
          }`}
          aria-label="Previous page"
        >
          Atras
        </button>
        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-sm min-w-[38px] min-h-[38px] rounded-md ${
              currentPage === page
                ? "bg-stone-800 border-stone-800 text-stone-50 shadow-sm hover:shadow-md hover:bg-stone-700"
                : "bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-sm rounded-md py-2 px-4 ${
            currentPage === totalPages 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-stone-800/5 hover:border-stone-800/5"
          }`}
          aria-label="Next page"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;