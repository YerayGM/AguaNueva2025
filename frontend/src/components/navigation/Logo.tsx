import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  title = 'Agua Nueva 2025',
  subtitle = 'Cabildo de Fuerteventura',
  className = '',
}) => {
  return (
    <Link to="/" className={`flex items-center space-x-3 group ${className}`}>
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        className="h-12 transition-transform duration-300 group-hover:scale-105" 
      />
      <div>
        <h1 className="text-xl font-bold text-primary dark:text-blue-400 group-hover:text-primary-hover dark:group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

export default memo(Logo);