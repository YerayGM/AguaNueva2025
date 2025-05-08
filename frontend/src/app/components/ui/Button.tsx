import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-verdeCabildo text-white hover:bg-opacity-90',
  secondary: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export const Button = ({ 
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={twMerge(`
        rounded-md
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
