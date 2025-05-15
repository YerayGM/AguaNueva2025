import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;

  // Crear array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1);
      
      // Calcular rango de páginas alrededor de la página actual
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar si estamos cerca del inicio o final
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Añadir elipsis si es necesario
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Añadir páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Añadir elipsis si es necesario
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-4">
      {/* Botón anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md flex items-center ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-primary hover:bg-blue-50 dark:hover:bg-gray-700'
        }`}
        aria-label="Página anterior"
      >
        <i className="fi fi-rr-angle-left text-sm"></i>
      </button>
      
      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      ))}
      
      {/* Botón siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md flex items-center ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-primary hover:bg-blue-50 dark:hover:bg-gray-700'
        }`}
        aria-label="Página siguiente"
      >
        <i className="fi fi-rr-angle-right text-sm"></i>
      </button>
    </div>
  );
};

export default Pagination;