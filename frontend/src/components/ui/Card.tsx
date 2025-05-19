import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string | React.ReactNode
  actions?: React.ReactNode
  className?: string
  footer?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, title, actions, className = '', footer }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${className}`}>
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          {title && (
            typeof title === 'string' ? (
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
            ) : (
              title
            )
          )}
          
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-3 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-slate-700">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card