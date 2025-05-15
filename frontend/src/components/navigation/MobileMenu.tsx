import React, { memo } from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <nav className="flex flex-col space-y-4">
        <NavLink 
          to="/" 
          icon="fi fi-rr-home"
          iconClassName="mr-3"
          onClick={onClose}
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/expedientes" 
          icon="fi fi-rr-document"
          iconClassName="mr-3"
          onClick={onClose}
        >
          Expedientes
        </NavLink>
        <NavLink 
          to="/datos-personales" 
          icon="fi fi-rr-user"
          iconClassName="mr-3"
          onClick={onClose}
        >
          Datos Personales
        </NavLink>
        <Link 
          to="/expedientes/new" 
          className="flex items-center bg-primary dark:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          <i className="fi fi-rr-file-add mr-3"></i>
          <span>Nuevo Expediente</span>
        </Link>
      </nav>
    </div>
  );
};

export default memo(MobileMenu);