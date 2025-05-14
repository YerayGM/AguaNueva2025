import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300 ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
          {icon && <i className={`${icon} text-verdeCabildo dark:text-blue-400 mr-3 text-xl`}></i>}
          {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;