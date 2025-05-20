import type { HTMLAttributes } from 'react'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | React.ReactNode
  subtitle?: string
  actions?: React.ReactNode
  footer?: React.ReactNode
  noPadding?: boolean
  bordered?: boolean
  shadow?: boolean
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  className = '',
  noPadding = false,
  bordered = true,
  shadow = false,
  ...props
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg 
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} 
        ${shadow ? 'shadow-sm' : ''}
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {(title || actions) && (
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-between">
          <div>
            {typeof title === 'string' ? (
              <h3 className="text-base font-medium text-blue-800 dark:text-blue-300">{title}</h3>
            ) : (
              title
            )}
            
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={`${!noPadding ? 'p-5' : ''}`}>
        {children}
      </div>
      
      {footer && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card