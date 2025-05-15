import React, { ReactNode, memo } from 'react';
import Pagination from './Pagination';

interface Column<T> {
  key: keyof T | string;
  header: string | ReactNode;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  sortConfig?: {
    key: string | null;
    direction: 'ascending' | 'descending';
  };
  onSort?: (key: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

function Table<T>({
  data,
  columns,
  keyExtractor,
  sortConfig,
  onSort,
  pagination,
  emptyMessage = 'No hay datos disponibles',
  loading = false,
  className = '',
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-8 rounded-lg border animate-fade-in-down" 
        style={{ backgroundColor: 'var(--info-section-bg-from)', borderColor: 'var(--info-border)', color: 'var(--text-secondary)' }}>
        <i className="fi fi-rr-info-circle text-4xl mb-3" style={{ color: 'var(--text-muted)' }}></i>
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg shadow-inner animate-fade-in">
        <table className={`min-w-full divide-y ${className}`} style={{ borderColor: 'var(--card-border)', divideColor: 'var(--card-border)' }}>
          <thead style={{ backgroundColor: 'var(--info-section-bg-from)' }}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${column.sortable ? 'cursor-pointer' : ''} transition duration-300`}
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => column.sortable && onSort && onSort(column.key as string)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {sortConfig && column.sortable && sortConfig.key === column.key && (
                      <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ backgroundColor: 'var(--card-bg)', divideColor: 'var(--card-border)' }}>
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((column, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-color)' }}>
                    {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}

export default memo(Table) as typeof Table;