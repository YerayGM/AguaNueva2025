import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Enlaces rápidos y contacto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center group mb-4">
              <img src="/images/logo2.png" alt="Logo" className="h-50 w-100" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg">
              Sistema integral para la gestión de subvenciones al agua agrícola del Cabildo de Fuerteventura. 
              Simplificamos el proceso de solicitud y tramitación de ayudas para los agricultores de la isla.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                aria-label="Facebook"
              >
                <i className="fi fi-brands-facebook text-lg"></i>
              </a>
              <a 
                href="#" 
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                aria-label="Twitter"
              >
                <i className="fi fi-brands-twitter text-lg"></i>
              </a>
              <a 
                href="#" 
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                aria-label="Instagram"
              >
                <i className="fi fi-brands-instagram text-lg"></i>
              </a>
            </div>
          </div>

          <div></div>

          {/* Contacto */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <i className="fi fi-rr-envelope"></i>
                </div>
                <span>soporte@cabildofuer.es</span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <i className="fi fi-rr-phone-call"></i>
                </div>
                <span>928 123 456</span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <i className="fi fi-rr-marker"></i>
                </div>
                <span>C/ Primero de Mayo, 39<br />Puerto del Rosario</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Línea separadora */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Cabildo de Fuerteventura. Todos los derechos reservados.
            </p>
            
            {/* Enlaces legales */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacidad" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Política de Cookies
              </Link>
              <Link to="/terminos" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Términos de Uso
              </Link>
              <Link to="/accesibilidad" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Accesibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;