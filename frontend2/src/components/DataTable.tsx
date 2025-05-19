import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Pagination from './Pagination'; // Ensure this module exists or create a placeholder

interface Column<T> {
  key: keyof T | string;
  header: string | ReactNode;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (key: string) => void;
  sortConfig?: {
    key: string | null;
    direction: 'ascending' | 'descending';
  };
  isLoading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
}

function DataTable<T>({
  data,
  columns,
  keyExtractor,
  pagination,
  onSort,
  sortConfig,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  searchable = false,
  onSearch,
  searchPlaceholder = 'Buscar...',
  actions
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 dark:text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 mb-4">
          <i className="fi fi-rr-info text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No hay resultados</h3>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar with search and actions */}
      {(searchable || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          {searchable && (
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fi fi-rr-search text-gray-400 dark:text-gray-600"></i>
              </div>
              <input
                type="text"
                className="form-control pl-10"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Data table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-elegant">
          <thead>
            <tr>
              {columns.map((column, idx) => (
                <th 
                  key={idx}
                  className={`
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750' : ''}
                  `}
                  style={{ width: column.width || 'auto' }}
                  onClick={() => column.sortable && onSort && onSort(column.key as string)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortConfig && column.sortable && sortConfig.key === column.key && (
                      <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-up' : 'angle-down'} text-primary`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                {columns.map((column, cellIdx) => (
                  <td key={cellIdx}>
                    {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center mt-4">
          <Pagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;