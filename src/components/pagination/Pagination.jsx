const Pagination = ({ 
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Calcular números de página
  const getPageNumbers = () => {
    const threshold = 7;
    const pages = [];
    
    if (totalPages <= threshold) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      const startWindow = Math.max(2, currentPage - 2);
      const endWindow = Math.min(totalPages - 1, currentPage + 2);
      
      if (startWindow > 2) pages.push("...");
      for (let i = startWindow; i <= endWindow; i++) pages.push(i);
      if (endWindow < totalPages - 1) pages.push("...");
      
      pages.push(totalPages);
    }
    return pages;
  };


  return (
    <div className="flex flex-col items-center gap-4">      
      <div className="flex items-center gap-1 flex-nowrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex-shrink-0 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-xs sm:text-sm rounded-md py-1 px-2 sm:py-2 sm:px-4 ${
            currentPage === 1 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-stone-800/5 hover:border-stone-800/5 cursor-pointer"
          }`}
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Atras</span>
          <span className="sm:hidden">←</span>
        </button>
        
        {/* Números de página */}
        {getPageNumbers().map((page, index) => (
          page === "..." 
            ? <span
                key={`ellipsis-${index}`}
                className="flex-shrink-0 px-2 py-1 text-stone-800 dark:text-white cursor-default"
              >
                ...
              </span>
            : <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex-shrink-0 inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-xs sm:text-sm min-w-[28px] min-h-[28px] sm:min-w-[38px] sm:min-h-[38px] rounded-md ${
                  currentPage === page
                    ? "bg-stone-800 border-stone-800 text-stone-50 shadow-sm hover:shadow-md hover:bg-stone-700"
                    : "bg-transparent border-transparent text-stone-800 dark:text-white hover:bg-stone-800/5 dark:hover:bg-white/5 cursor-pointer"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex-shrink-0 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-xs sm:text-sm rounded-md py-1 px-2 sm:py-2 sm:px-4 ${
            currentPage === totalPages 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-stone-800/5 hover:border-stone-800/5 cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;