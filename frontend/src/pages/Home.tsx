import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getRecentExpedientes, getExpedientes } from '../services/expedientesService'
import type { Expediente } from '../types'

const HomePage: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0 })
  const [currentDateTime, setCurrentDateTime] = useState('')
  const hasFetched = useRef(false) // Usar useRef para persistir entre renders

  useEffect(() => {
    // Evitar múltiples llamadas
    if (hasFetched.current) return

    const loadData = async () => {
      setIsLoading(true)
      hasFetched.current = true // Marcar inmediatamente para evitar duplicados
      
      try {
        // Cargar expedientes recientes
        const recentExpedientes = await getRecentExpedientes(3)
        console.log('Expedientes cargados:', recentExpedientes)
        setExpedientes(recentExpedientes)
        
        // Cargar todos los expedientes para estadísticas  
        const allExpedientes = await getExpedientes()
        
        // Actualizar estadísticas
        setStats({
          total: allExpedientes.length
        })

      } catch (error) {
        console.error('Error al cargar datos:', error)
        setExpedientes([])
        setStats({ total: 0 })
        hasFetched.current = false // Permitir reintentar en caso de error
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
  }, []) // Array de dependencias vacío
  
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white relative mb-2">
              Resumen de expedientes
              <span className="block h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mt-2 rounded-full"></span>
            </h2>
            <p className="text-gray-400 text-sm">
              Estadísticas generales de tus solicitudes de subvención
            </p>
          </div>
          <Button 
            variant="outline" 
            size="md"
            as={Link}
            to="/expedientes"
            className="hover:bg-blue-700/20 hover:border-blue-500 border-gray-600 text-gray-300 hover:text-blue-300 transition-all duration-300 self-start sm:self-center"
          >
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Ver todos</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Button>
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Total Expedientes */}
          <Card className="group bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-700/40 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/30 overflow-hidden">
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {isLoading ? (
                      <div className="h-8 w-12 bg-blue-700/30 animate-pulse rounded"></div>
                    ) : (
                      stats.total
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Total expedientes</p>
                <p className="text-blue-300/70 text-xs">Todas las solicitudes</p>
              </div>
              
              {/* Elemento decorativo */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Expedientes recientes */}
      <div className="fade-in" style={{ animationDelay: '400ms' }}>
        <Card 
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Expedientes Recientes</h3>
                  <p className="text-sm text-gray-400">Últimos 3 expedientes creados</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-400">{expedientes.length}</span>
                <p className="text-xs text-gray-500">expedientes</p>
              </div>
            </div>
          }
          className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 border-gray-800/50 backdrop-blur-sm shadow-2xl"
        >
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg animate-pulse">
                  <div className="w-12 h-12 bg-gray-700/50 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700/50 rounded w-32"></div>
                    <div className="h-3 bg-gray-700/50 rounded w-48"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-700/50 rounded"></div>
                </div>
              ))}
            </div>
          ) : expedientes.length > 0 ? (
            <div className="space-y-3">
              {expedientes.map((expediente, index) => (
                <div 
                  key={expediente.ID} 
                  className="group relative bg-gradient-to-r from-gray-800/40 to-gray-800/20 rounded-xl p-4 border border-gray-700/30 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Icono del expediente */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      
                      {/* Información del expediente */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                            {expediente.EXPEDIENTE}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {expediente.FECHA ? 
                              new Date(expediente.FECHA).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              }) : 
                              'Sin fecha'
                            }
                          </span>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {expediente.LOCALIDAD || 'Sin localidad'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Acciones */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        as={Link}
                        to={`/expedientes/${expediente.ID}`}
                        className="hover:bg-blue-600/20 hover:border-blue-500 border-gray-600 text-gray-300 hover:text-blue-300 transition-all duration-300 opacity-80 group-hover:opacity-100"
                      >
                        <span className="inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Ver</span>
                        </span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        as={Link}
                        to={`/expedientes/editar/${expediente.ID}`}
                        className="hover:bg-emerald-600/20 hover:border-emerald-500 border-gray-600 text-gray-300 hover:text-emerald-300 transition-all duration-300 opacity-80 group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Indicador de progreso sutil */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 group-hover:h-1.5" style={{ width: `${Math.min(100, (index + 1) * 33)}%` }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No hay expedientes recientes</h3>
              <p className="text-gray-500 mb-6">Cuando crees tu primer expediente, aparecerá aquí</p>
              <Button 
                variant="primary" 
                as={Link}
                to="/expedientes/nuevo"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              >
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Crear primer expediente
                </span>
              </Button>
            </div>
          )}
          
          {/* Footer de la tarjeta */}
          {expedientes.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-700/50 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando {expedientes.length} de {stats.total} expedientes totales
              </p>
              <Button 
                variant="outline" 
                size="sm"
                as={Link}
                to="/expedientes"
                className="hover:bg-blue-600/20 hover:border-blue-500 border-gray-600 text-gray-400 hover:text-blue-300 transition-all duration-300"
              >
                <span className="inline-flex items-center">
                  <span>Ver todos los expedientes</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default HomePage