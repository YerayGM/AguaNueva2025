const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-200 rounded-md">
                <img 
                  src="../../public/vite.svg" 
                  alt="Agua Nueva" 
                  className="h-10 w-10 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  Agua Nueva 2025
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cabildo de Fuerteventura</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Plataforma de gestión para la subvención al agua agrícola, desarrollada por el Cabildo de Fuerteventura para optimizar recursos hídricos en el sector agrario de la isla.
            </p>
          </div>
          
          <div></div>
          
          <div>
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <address className="not-italic text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Cabildo de Fuerteventura</p>
              <p>C/ Primero de Mayo, 39</p>
              <p>35600 Puerto del Rosario</p>
              <p>Tel: 928 86 23 00</p>
              <p>aguanueva@cabildofuer.es</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {currentYear} Cabildo de Fuerteventura. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0 text-xs text-gray-500 dark:text-gray-400">
            <span>Desarrollo: Consejería de Agricultura, Ganadería y Pesca</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer