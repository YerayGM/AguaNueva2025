import React, { ReactNode, memo } from 'react';

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
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${className}`}>
      {(title || subtitle) && (
        <div className={`p-6 border-b ${headerClassName}`} style={{ borderColor: 'var(--card-border)' }}>
          {title && (
            <div className="flex items-center">
              {icon && <i className={`${icon} mr-2 text-primary dark:text-blue-400`}></i>}
              {typeof title === 'string' ? (
                <h2 className="text-xl font-bold text-primary dark:text-blue-400">
                  {title}
                </h2>
              ) : (
                title
              )}
            </div>
          )}
          {subtitle && (
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              {subtitle}
            </div>
          )}
        </div>
      )}
      
      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-6 py-4 border-t ${footerClassName}`} style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--info-section-bg-from)' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default memo(Card);