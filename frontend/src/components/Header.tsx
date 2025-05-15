import React, { useState, memo } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import NavLink from './navigation/NavLink';
import MobileMenu from './navigation/MobileMenu';
import Logo from './navigation/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-md transition-colors duration-300 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y título */}
          <Logo />

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon="fi fi-rr-home">Inicio</NavLink>
            <NavLink to="/expedientes" icon="fi fi-rr-document">Expedientes</NavLink>
            <NavLink to="/datos-personales" icon="fi fi-rr-user">Datos Personales</NavLink>
          </nav>

          {/* Botones móviles */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggleButton />
            <button 
              className="text-gray-600 dark:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? (
                <i className="fi fi-rr-cross text-xl"></i>
              ) : (
                <i className="fi fi-rr-menu-burger text-xl"></i>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
};

export default memo(Header);