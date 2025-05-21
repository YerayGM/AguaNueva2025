import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getRecentExpedientes, getExpedientes } from '../services/expedientesService'
import type { Expediente } from '../types'

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentDateTime, setCurrentDateTime] = useState<string>('')
  const [expedientes, setExpedientes] = useState<Expediente[]>([])
  const [stats, setStats] = useState({
    total: 0
  })
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Cargar expedientes recientes
        const recentExpedientes = await getRecentExpedientes(3)
        setExpedientes(recentExpedientes)
        
        // Cargar todos los expedientes para estadísticas
        const allExpedientes = await getExpedientes()
        
        // Actualizar estadísticas
        setStats({
          total: allExpedientes.length
        })

      } catch (error) {
        console.error('Error al cargar datos:', error)
        // Establecer valores predeterminados en caso de error
        setExpedientes([])
        setStats({ total: 0 })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
    
    // Establece la fecha y hora actual
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    setCurrentDateTime(new Intl.DateTimeFormat('es-ES', options).format(now))
  }, [])
  
  return (
    <div className="fade-in">
      {/* Encabezado con paralax y overlay mejorado */}
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://www.cabildofuer.es/wp-content/uploads/2021/02/presa-las-penitas-fuerteventura.jpg')] bg-cover bg-center slow-zoom"></div>
        <div className="relative p-8 md:p-12 flex flex-col justify-end min-h-80">
          <div className="slide-up">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-700/70 text-blue-100 text-sm mb-4 backdrop-blur-sm">
              {currentDateTime}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tighter">
              Agua Nueva 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl font-light">
              Sistema de gestión de subvenciones para el agua agrícola
            </p>
          </div>
        </div>
      </div>

      {/* Acceso rápido con animaciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger-fade">
        <Link to="/datos-personales" className="group">
          <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20 group-hover:border-blue-500 overflow-hidden">
            <div className="p-4 flex flex-col items-center text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-blue-400 transition-colors duration-300">Datos Personales</h3>
              <p className="text-gray-400 mb-4">Consulta y edita tu información personal</p>
              <Button variant="outline" size="sm" className="mt-auto group-hover:bg-blue-700 group-hover:border-blue-700 transition-all duration-300">
                <span className="inline-flex items-center">
                  <span>Acceder</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Button>
              
              {/* Elemento decorativo */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tr from-blue-900/40 to-blue-700/0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            </div>
          </Card>
        </Link>
        
        <Link to="/expedientes" className="group">
          <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-900/20 group-hover:border-green-500 overflow-hidden">
            <div className="p-4 flex flex-col items-center text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-900 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-green-500/40 transition-all duration-500 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-50 group-hover:text-green-400 transition-colors duration-300">Expedientes</h3>
              <p className="text-gray-400 mb-4">Gestiona tus expedientes de subvención</p>
              <Button variant="outline" size="sm" className="mt-auto group-hover:bg-green-700 group-hover:border-green-700 transition-all duration-300">
                <span className="inline-flex items-center">
                  <span>Acceder</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Button>
              
              {/* Elemento decorativo */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tr from-green-900/40 to-green-700/0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            </div>
          </Card>
        </Link>
        
        <Link to="/expedientes/nuevo" className="group">
          <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-900/20 group-hover:border-amber-500 overflow-hidden">
            <div className="p-4 flex flex-col items-center text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-900 to-amber-600 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-amber-500/40 transition-all duration-500 group-hover:scale-110 group-hover:animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-amber-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-50 group-hover:text-amber-400 transition-colors duration-300">Nueva Solicitud</h3>
              <p className="text-gray-400 mb-4">Inicia una nueva solicitud de subvención</p>
              <Button variant="primary" size="sm" className="mt-auto bg-amber-800 border-amber-800 hover:bg-amber-700 hover:border-amber-700 transition-all duration-300">
                <span className="inline-flex items-center">
                  <span>Crear nueva</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </Button>
              
              {/* Elemento decorativo */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tr from-amber-900/40 to-amber-700/0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Resumen de expedientes */}
      <div className="mb-12 fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold relative">
            Resumen de expedientes
            <span className="block h-1 w-24 bg-blue-700 mt-1 rounded-full"></span>
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            as={Link}
            to="/expedientes"
            className="hover:bg-blue-800 hover:border-blue-800 transition-all duration-300"
          >
            <span className="inline-flex items-center">
              <span>Ver todos</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Button>
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-800/30">
            <div className="p-4">
              <p className="text-blue-300 text-sm">Total expedientes</p>
              <p className="text-white text-3xl font-bold">{stats.total}</p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Expedientes recientes */}
      <div className="fade-in" style={{ animationDelay: '400ms' }}>
        <Card 
          title={
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-semibold">Expedientes Recientes</span>
            </div>
          }
          className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800"
        >
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-800/60 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 text-left text-sm font-medium text-gray-400 tracking-wider">Expediente</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-400 tracking-wider">Fecha</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-400 tracking-wider">Localidad</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-400 tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="stagger-fade">
                  {expedientes.length > 0 ? (
                    expedientes.map((expediente) => (
                      <tr key={expediente.ID} className="hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-800">
                        <td className="py-4 px-2 whitespace-nowrap font-medium">{expediente.EXPEDIENTE}</td>
                        <td className="py-4 px-2 whitespace-nowrap">
                          {expediente.FECHA ? 
                            new Date(expediente.FECHA).toLocaleDateString('es-ES') : 
                            'Sin fecha'}
                        </td>
                        <td className="py-4 px-2 whitespace-nowrap">
                          {expediente.LOCALIDAD}
                        </td>
                        <td className="py-4 px-2 whitespace-nowrap">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            as={Link}
                            to={`/expedientes/${expediente.ID}`}
                            className="hover:bg-blue-800/40 hover:border-blue-700 transition-all duration-300"
                          >
                            <span className="inline-flex items-center">
                              <span>Ver</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 px-2 text-center text-gray-400">
                        No hay expedientes recientes
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Home