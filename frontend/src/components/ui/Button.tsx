import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  as?: React.ComponentType<any> | string;
  to?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  type = 'button', 
  className = '', 
  onClick, 
  disabled = false,
  isLoading = false,
  as,
  to,
  icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white border border-gray-700',
    outline: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/10 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5'
  };
  
  const classes = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''} 
    ${className}
  `;

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Cargando...</span>
        </>
      );
    }
    
    return (
      <>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </>
    );
  };

  // Si es un componente Link
  if (as === Link && to) {
    return (
      <Link to={to} className={classes} {...props}>
        {renderContent()}
      </Link>
    );
  }

  // Si es un componente personalizado
  if (as) {
    const Component = as;
    return (
      <Component className={classes} {...props}>
        {renderContent()}
      </Component>
    );
  }

  // Botón normal
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;