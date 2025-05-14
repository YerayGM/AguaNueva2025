import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  className?: string;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  to,
  type = 'button',
  disabled = false
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none';
  
  // Variantes
  const variantStyles = {
    primary: 'bg-verdeCabildo dark:bg-blue-600 text-white hover:bg-verdeCabildo-hover dark:hover:bg-blue-700 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
    outline: 'border border-verdeCabildo dark:border-blue-500 text-verdeCabildo dark:text-blue-400 hover:bg-verdeCabildo hover:text-white dark:hover:bg-blue-600',
    text: 'text-verdeCabildo dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  // Tamaños
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  
  // Estilos para estado deshabilitado
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  // Combinación de estilos
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;
  
  // Si hay una ruta, renderizar como Link
  if (to) {
    return (
      <Link to={to} className={buttonStyles}>
        {icon && <i className={`${icon} mr-2`}></i>}
        {children}
      </Link>
    );
  }
  
  // De lo contrario, renderizar como botón
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`${icon} mr-2`}></i>}
      {children}
    </button>
  );
};

export default Button;