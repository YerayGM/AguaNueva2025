import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }
  
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Agua Nueva" 
              className="h-8 w-8 object-contain" 
            />
            <div>
              <h1 className="text-lg font-medium text-white">
                Agua Nueva 2025
              </h1>
              <p className="text-xs text-gray-400">Cabildo de Fuerteventura</p>
            </div>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`py-2 px-3 rounded-md ${
                    isActive('/') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/datos-personales" 
                  className={`py-2 px-3 rounded-md ${
                    isActive('/datos-personales') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Datos Personales
                </Link>
              </li>
              <li>
                <Link 
                  to="/expedientes" 
                  className={`py-2 px-3 rounded-md ${
                    isActive('/expedientes') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Expedientes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="px-4 py-3">
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 px-3 rounded-md ${
                    isActive('/') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/datos-personales" 
                  className={`block py-2 px-3 rounded-md ${
                    isActive('/datos-personales') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Datos Personales
                </Link>
              </li>
              <li>
                <Link 
                  to="/expedientes" 
                  className={`block py-2 px-3 rounded-md ${
                    isActive('/expedientes') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Expedientes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header