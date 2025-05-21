import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-emerald-900/10 py-2' 
        : 'bg-gray-900 dark:bg-gray-900 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md group-hover:bg-emerald-500/30 transition-all duration-300"></div>
              <img 
                src="/logo.png" 
                alt="Agua Nueva" 
                className="h-10 w-10 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                <span className="text-emerald-400">Agua</span> Nueva 2025
              </h1>
              <p className="text-xs text-gray-400">Cabildo de Fuerteventura</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              <li>
                <Link 
                  to="/" 
                  className={`py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                    isActive('/') 
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                      : 'text-gray-300 hover:bg-gray-800/80 border border-transparent'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/datos-personales" 
                  className={`py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                    isActive('/datos-personales') 
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                      : 'text-gray-300 hover:bg-gray-800/80 border border-transparent'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Datos Personales</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/expedientes" 
                  className={`py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                    isActive('/expedientes') 
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                      : 'text-gray-300 hover:bg-gray-800/80 border border-transparent'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Expedientes</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/expedientes/nuevo"
                  className="ml-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-1 shadow-md shadow-emerald-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Nueva Solicitud</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 py-3 bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                    : 'text-gray-300 hover:bg-gray-700 border border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/datos-personales" 
                className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 ${
                  isActive('/datos-personales') 
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                    : 'text-gray-300 hover:bg-gray-700 border border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Datos Personales</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/expedientes" 
                className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 ${
                  isActive('/expedientes') 
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
                    : 'text-gray-300 hover:bg-gray-700 border border-transparent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Expedientes</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/expedientes/nuevo" 
                className="flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nueva Solicitud</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header