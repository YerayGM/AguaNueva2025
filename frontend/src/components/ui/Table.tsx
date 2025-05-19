import React from 'react'

interface Column {
  header: string
  accessor: string
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
  className?: string
}

interface TableProps {
  columns: Column[]
  data: Record<string, unknown>[]
  className?: string
  emptyMessage?: string
  isLoading?: boolean
  onRowClick?: (row: Record<string, unknown>) => void
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = '',
  emptyMessage = 'No hay datos disponibles',
  isLoading = false,
  onRowClick
}) => {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
          {isLoading ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500 dark:text-slate-400"
              >
                <div className="flex justify-center items-center py-4">
                  <svg className="animate-spin h-6 w-6 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500 dark:text-slate-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            Array.isArray(data) ? data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={onRowClick ? 'hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer transition' : ''}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200 ${column.className || ''}`}
                  >
                    {column.render
                      ? column.render(row[column.accessor], row)
                      : (row[column.accessor] as React.ReactNode) || '—'}
                  </td>
                ))}
              </tr>
            )) : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table