import React, { ButtonHTMLAttributes, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Estilos base
  const baseClasses = 'font-medium rounded-lg transition-colors duration-300 flex items-center justify-center';
  
  // Variantes
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white'
  };
  
  // Tamaños
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Estado deshabilitado o cargando
  const stateClasses = (disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : '';
  
  // Ancho completo
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Clases combinadas
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${widthClasses} ${className}`;
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <i className="fi fi-rr-spinner animate-spin mr-2"></i>
          {children || 'Cargando...'}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <i className={`${icon} mr-2 group-hover:scale-110 transition-all duration-300`}></i>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <i className={`${icon} ml-2 group-hover:scale-110 transition-all duration-300`}></i>
          )}
        </>
      )}
    </button>
  );
};

export default memo(Button);