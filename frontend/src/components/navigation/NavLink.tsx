import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  children,
  onClick,
  className = '',
  iconClassName = 'mr-2',
  activeClassName = 'text-primary dark:text-blue-400 font-medium',
  inactiveClassName = 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400',
}) => {
  const location = useLocation();
  
  // Verificar si una ruta está activa
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <Link 
      to={to} 
      className={`flex items-center transition-colors ${isActive ? activeClassName : inactiveClassName} ${className}`}
      onClick={onClick}
    >
      {icon && <i className={`${icon} ${iconClassName}`}></i>}
      <span>{children}</span>
    </Link>
  );
};

export default memo(NavLink);