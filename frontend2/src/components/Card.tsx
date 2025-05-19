import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: string;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  bordered = true,
  hoverable = false,
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl overflow-hidden 
        transition-all duration-300
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}
        ${hoverable ? 'hover:shadow-lg' : 'shadow-sm'}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className={`p-5 ${bordered ? 'border-b dark:border-gray-700' : ''} ${headerClassName}`}>
          {title && (
            <div className="flex items-center mb-1">
              {icon && <i className={`${icon} mr-2 text-primary dark:text-blue-400 text-xl`}></i>}
              {typeof title === 'string' ? (
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </h2>
              ) : (
                title
              )}
            </div>
          )}
          {subtitle && (
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {subtitle}
            </div>
          )}
        </div>
      )}
      
      <div className={`p-5 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 ${bordered ? 'border-t dark:border-gray-700' : ''} bg-gray-50 dark:bg-gray-750 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;