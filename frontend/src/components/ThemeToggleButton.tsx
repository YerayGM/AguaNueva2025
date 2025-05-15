import React, { memo } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleButtonProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fixed?: boolean;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  className = '',
  showLabel = false,
  size = 'md',
  fixed = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  // Tamaños
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };
  
  // Posición fija
  const positionClasses = fixed ? 'fixed bottom-6 right-6 z-50' : '';
  
  return (
    <button 
      onClick={toggleTheme}
      className={`flex items-center justify-center ${sizeClasses[size]} rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ${positionClasses} ${className}`}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? (
        <>
          <i className="fi fi-rr-sun text-yellow-400"></i>
          {showLabel && <span className="ml-2">Modo claro</span>}
        </>
      ) : (
        <>
          <i className="fi fi-rr-moon text-blue-600"></i>
          {showLabel && <span className="ml-2">Modo oscuro</span>}
        </>
      )}
    </button>
  );
};

export default memo(ThemeToggleButton);