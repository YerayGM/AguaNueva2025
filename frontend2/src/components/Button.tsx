import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Classes based on variant
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    accent: 'bg-accent hover:bg-accent-hover text-white',
    outline: 'bg-transparent border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary',
    text: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
  };

  // Classes based on size
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  // Combine all classes
  const buttonClasses = `
    rounded-lg font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-70 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <span className="animate-spin">
            <i className="fi fi-rr-spinner"></i>
          </span>
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <i className={icon}></i>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && !loading && (
          <i className={icon}></i>
        )}
      </div>
    </button>
  );
};

export default Button;