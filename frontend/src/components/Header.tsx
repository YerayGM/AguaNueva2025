import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
            <div>
              <h1 className="text-xl font-bold text-verdeCabildo dark:text-blue-400">Agua Nueva 2025</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cabildo de Fuerteventura</p>
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center text-verdeCabildo dark:text-blue-400 font-medium hover:text-verdeCabildo-hover dark:hover:text-blue-300 transition-colors">
              <i className="fi fi-rr-home mr-2"></i>
              <span>Inicio</span>
            </Link>
            <Link to="/expedientes" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-verdeCabildo dark:hover:text-blue-400 transition-colors">
              <i className="fi fi-rr-document mr-2"></i>
              <span>Expedientes</span>
            </Link>
            <Link to="/datos-personales" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-verdeCabildo dark:hover:text-blue-400 transition-colors">
              <i className="fi fi-rr-user mr-2"></i>
              <span>Datos Personales</span>
            </Link>
          </nav>

          {/* Botones móviles */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              className="text-gray-600 dark:text-gray-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center text-verdeCabildo dark:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fi fi-rr-home mr-3"></i>
                <span>Inicio</span>
              </Link>
              <Link 
                to="/expedientes" 
                className="flex items-center text-gray-600 dark:text-gray-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fi fi-rr-document mr-3"></i>
                <span>Expedientes</span>
              </Link>
              <Link 
                to="/datos-personales" 
                className="flex items-center text-gray-600 dark:text-gray-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fi fi-rr-user mr-3"></i>
                <span>Datos Personales</span>
              </Link>
              <Link 
                to="/expedientes/new" 
                className="flex items-center bg-verdeCabildo dark:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fi fi-rr-file-add mr-3"></i>
                <span>Nuevo Expediente</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;