import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/logo2.png"
                alt="Logo Cabildo"
                width={200}
                height={50}
                className="filter dark:brightness-110"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-4 text-gray-300 dark:text-gray-200">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fi fi-rr-interrogation mr-2"></i>Ayuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fi fi-rr-envelope mr-2"></i>Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-300 dark:text-gray-200">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fi fi-rr-shield-check mr-2"></i>Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fi fi-rr-document-signed mr-2"></i>Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-800 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Cabildo de Fuerteventura. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;