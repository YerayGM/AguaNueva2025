import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Table from '../components/ui/Table'
import type { Expediente, Municipio } from '../types'
import { getExpedientes, getExpedientesByDni, getExpedientesByMunicipio } from '../services/expedientesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const ExpedientesPage: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([])
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchDni, setSearchDni] = useState('')
  const [searchMunicipio, setSearchMunicipio] = useState('')
  const [searchExpediente, setSearchExpediente] = useState('')
  const [searchLugar, setSearchLugar] = useState('')
  const [searchLocalidad, setSearchLocalidad] = useState('')
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [searchTecnico, setSearchTecnico] = useState('')
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [estadisticas, setEstadisticas] = useState({
    total: 0
  })
  const navigate = useNavigate()
  
  const loadMunicipios = async () => {
    try {
      const data = await getMunicipios()
      console.log('Datos de municipios recibidos en Expedientes:', data)
      // Verificar la estructura de los datos y extraer el array de municipios
      if (Array.isArray(data)) {
        setMunicipios(data)
      } else {
        console.error('Formato de datos de municipios inesperado:', data)
        setMunicipios([])
      }
    } catch (error) {
      console.error('Error al cargar municipios:', error)
      toast.error('Error al cargar municipios')
    }
  }
  
  const handleSearchByDni = async () => {
    if (!searchDni) {
      toast.error('Debe ingresar un DNI para buscar');
      return;
    }
    
    setIsLoading(true);
    try {
      const expedientesData = await getExpedientesByDni(searchDni);
      setExpedientes(expedientesData);
      setCurrentPage(1);
    } catch (error) {
      toast.error('Error al buscar expedientes por DNI');
      console.error('Error al buscar expedientes por DNI:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleSearchByMunicipio = async () => {
    if (!searchMunicipio) {
      toast.error('Debe seleccionar un municipio para buscar');
      return;
    }
    
    setIsLoading(true);
    try {
      const expedientesData = await getExpedientesByMunicipio(parseInt(searchMunicipio));
      setExpedientes(expedientesData);
      setCurrentPage(1);
    } catch (error) {
      toast.error('Error al buscar expedientes por municipio');
      console.error('Error al buscar expedientes por municipio:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const loadExpedientes = async () => {
    setIsLoading(true)
    try {
      const expedientesData = await getExpedientes();
      setExpedientes(expedientesData);
      
      // Actualizar estadísticas
      setEstadisticas({
        total: expedientesData.length
      });
    } catch (error) {
      toast.error('Error al cargar expedientes')
      console.error('Error al cargar expedientes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchByExpediente = async () => {
    if (!searchExpediente) {
      toast.error('Debe ingresar un número de expediente para buscar')
      return
    }
    
    setIsLoading(true)
    try {
      const expedientesData = await getExpedientes()
      const filtered = expedientesData.filter(exp => 
        exp.EXPEDIENTE?.toLowerCase().includes(searchExpediente.toLowerCase())
      )
      setExpedientes(filtered)
      setCurrentPage(1)
    } catch (error) {
      toast.error('Error al buscar por expediente')
      console.error('Error al buscar por expediente:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdvancedSearch = async () => {
    setIsLoading(true)
    try {
      let expedientesData = await getExpedientes()
      
      // Aplicar filtros
      if (searchDni) {
        expedientesData = expedientesData.filter(exp => 
          exp.DNI?.toLowerCase().includes(searchDni.toLowerCase())
        )
      }
      
      if (searchMunicipio) {
        expedientesData = expedientesData.filter(exp => 
          exp.ID_MUN?.toString() === searchMunicipio
        )
      }
      
      if (searchExpediente) {
        expedientesData = expedientesData.filter(exp => 
          exp.EXPEDIENTE?.toLowerCase().includes(searchExpediente.toLowerCase())
        )
      }
      
      if (searchLugar) {
        expedientesData = expedientesData.filter(exp => 
          exp.LUGAR?.toLowerCase().includes(searchLugar.toLowerCase())
        )
      }
      
      if (searchLocalidad) {
        expedientesData = expedientesData.filter(exp => 
          exp.LOCALIDAD?.toLowerCase().includes(searchLocalidad.toLowerCase())
        )
      }
      
      if (searchTecnico) {
        expedientesData = expedientesData.filter(exp => 
          exp.TECNICO?.toLowerCase().includes(searchTecnico.toLowerCase())
        )
      }
      
      if (fechaDesde) {
        expedientesData = expedientesData.filter(exp => {
          if (!exp.FECHA) return false
          const fechaExp = new Date(exp.FECHA)
          const fechaMin = new Date(fechaDesde)
          return fechaExp >= fechaMin
        })
      }
      
      if (fechaHasta) {
        expedientesData = expedientesData.filter(exp => {
          if (!exp.FECHA) return false
          const fechaExp = new Date(exp.FECHA)
          const fechaMax = new Date(fechaHasta)
          return fechaExp <= fechaMax
        })
      }
      
      setExpedientes(expedientesData)
      setCurrentPage(1)
    } catch (error) {
      toast.error('Error al realizar la búsqueda avanzada')
      console.error('Error en búsqueda avanzada:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSearchDni('')
    setSearchMunicipio('')
    setSearchExpediente('')
    setSearchLugar('')
    setSearchLocalidad('')
    setFechaDesde('')
    setFechaHasta('')
    setSearchTecnico('')
    loadExpedientes()
    setCurrentPage(1)
  }
  
  useEffect(() => {
    loadExpedientes()
    loadMunicipios()
  }, [])
  
  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedData = expedientes.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(expedientes.length / itemsPerPage)
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es })
    } catch {
      return '—'
    }
  }
  

  
  const columns = [
    {
      header: 'Expediente',
      accessor: 'EXPEDIENTE',
    },
    {
      header: 'DNI',
      accessor: 'DNI',
    },
    {
      header: 'Solicitante',
      accessor: 'NOMBREC',
      render: (_: unknown, row: Record<string, unknown>) => {
        return `${row.NOMBREC || ''} ${row.APELLIDOS || ''}`.trim() || '—';
      }
    },
    {
      header: 'Fecha',
      accessor: 'FECHA',
      render: (value: unknown) => formatDate(value as string),
    },
    {
      header: 'Localidad',
      accessor: 'LOCALIDAD',
    },
    {
      header: 'Acciones',
      accessor: 'actions',
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex space-x-2">
          <Link to={`/expedientes/${row.ID}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-amber-800/40 hover:border-amber-700/50 transition-all duration-300"
            >
              <span className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Ver</span>
              </span>
            </Button>
          </Link>
          <Link to={`/expedientes/editar/${row.ID}`}>
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-700 hover:bg-blue-600 transition-all duration-300"
            >
              <span className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
                <span>Editar</span>
              </span>
            </Button>
          </Link>
        </div>
      ),
    },
  ]
  
  return (
    <div className="space-y-6 fade-in">
      {/* Encabezado con estadísticas */}
      <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-amber-900 to-amber-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Gestión de Expedientes
              </h1>
              <p className="text-amber-100 max-w-2xl">
                Administre las solicitudes de subvención para agua agrícola en la isla.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to="/expedientes/nuevo">
                <Button
                  variant="primary"
                  className="bg-white/90 hover:bg-white text-amber-900 hover:text-amber-800 shadow-lg transition-all duration-300 border-none"
                >
                  <span className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Nuevo Expediente</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Resumen estadísticas */}
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-amber-200 text-sm">Total expedientes</p>
              <p className="text-white text-2xl font-bold count-up">{estadisticas.total}</p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60">
            <path fill="#111827" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,21.3C1120,11,1280,21,1360,26.7L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Filtros de búsqueda mejorados */}
      <div className="grid grid-cols-1 gap-6 stagger-fade">
        <Card 
          className="hover:shadow-xl transition-all duration-300 border-amber-800/30 bg-gradient-to-br from-amber-900/20 to-gray-900"
        >
          <div className="space-y-6">
            {/* Header de búsqueda */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-800/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-amber-600/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Búsqueda de Expedientes</h3>
                  <p className="text-sm text-gray-400">
                    {showAdvancedSearch ? 'Combine múltiples criterios para encontrar expedientes específicos' : 'Búsqueda rápida por DNI o municipio'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {showAdvancedSearch ? 'Avanzada' : 'Simple'}
                </span>
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    showAdvancedSearch ? 'bg-amber-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      showAdvancedSearch ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {!showAdvancedSearch ? (
              // Búsqueda simple mejorada
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <Input
                      label="DNI/NIE del solicitante"
                      value={searchDni}
                      onChange={(e) => setSearchDni(e.target.value)}
                      placeholder="Introducir DNI sin guiones ni espacios"
                      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="absolute left-3 top-9 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <Select
                      label="Seleccione un municipio"
                      value={searchMunicipio}
                      onChange={(value) => setSearchMunicipio(value)}
                      options={[
                        { label: 'Todos los municipios', value: '' },
                        ...municipios.map((municipio) => ({
                          label: municipio.MUNICIPIO,
                          value: municipio.ID_MUN.toString(),
                        })),
                      ]}
                      className="transition-all duration-300 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Búsqueda avanzada mejorada
              <div className="space-y-6">
                {/* Sección: Identificación */}
                <div className="bg-amber-900/10 rounded-lg p-6 border border-amber-800/30">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-amber-500 rounded-full mr-3"></div>
                    <h4 className="text-md font-semibold text-white">Identificación del Expediente</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative group">
                      <Input
                        label="DNI/NIE"
                        value={searchDni}
                        onChange={(e) => setSearchDni(e.target.value)}
                        placeholder="DNI del solicitante"
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Input
                        label="Nº Expediente"
                        value={searchExpediente}
                        onChange={(e) => setSearchExpediente(e.target.value)}
                        placeholder="Código de expediente"
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Input
                        label="Técnico Responsable"
                        value={searchTecnico}
                        onChange={(e) => setSearchTecnico(e.target.value)}
                        placeholder="Nombre del técnico"
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Ubicación */}
                <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-800/30">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
                    <h4 className="text-md font-semibold text-white">Ubicación del Proyecto</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative group">
                      <Input
                        label="Lugar"
                        value={searchLugar}
                        onChange={(e) => setSearchLugar(e.target.value)}
                        placeholder="Lugar del expediente"
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Input
                        label="Localidad"
                        value={searchLocalidad}
                        onChange={(e) => setSearchLocalidad(e.target.value)}
                        placeholder="Localidad"
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Select
                        label="Municipio"
                        value={searchMunicipio}
                        onChange={(value) => setSearchMunicipio(value)}
                        options={[
                          { label: 'Todos los municipios', value: '' },
                          ...municipios.map((municipio) => ({
                            label: municipio.MUNICIPIO,
                            value: municipio.ID_MUN.toString(),
                          })),
                        ]}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Fechas */}
                <div className="bg-green-900/10 rounded-lg p-6 border border-green-800/30">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                    <h4 className="text-md font-semibold text-white">Rango de Fechas</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <Input
                        label="Fecha Desde"
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div className="relative group">
                      <Input
                        label="Fecha Hasta"
                        type="date"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Botones de acción mejorados */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-amber-800/30">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 sm:flex-none hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Limpiar Filtros</span>
                </span>
              </Button>
              
              <Button
                variant="primary"
                onClick={showAdvancedSearch ? handleAdvancedSearch : (searchDni ? handleSearchByDni : handleSearchByMunicipio)}
                isLoading={isLoading}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{isLoading ? 'Buscando...' : 'Buscar Expedientes'}</span>
                </span>
              </Button>
              
              {!showAdvancedSearch && searchExpediente && (
                <Button
                  variant="secondary"
                  onClick={handleSearchByExpediente}
                  isLoading={isLoading}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                >
                  Buscar por Expediente
                </Button>
              )}
            </div>

            {/* Indicador de filtros activos */}
            {(searchDni || searchExpediente || searchLugar || searchLocalidad || searchMunicipio || searchTecnico || fechaDesde || fechaHasta) && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-800/30">
                <span className="text-xs text-gray-400 mr-2">Filtros activos:</span>
                {searchDni && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-600/20 text-amber-300 border border-amber-600/30">
                    DNI: {searchDni}
                  </span>
                )}
                {searchExpediente && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-600/20 text-amber-300 border border-amber-600/30">
                    Expediente: {searchExpediente}
                  </span>
                )}
                {searchMunicipio && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-600/20 text-blue-300 border border-blue-600/30">
                    Municipio: {municipios.find(m => m.ID_MUN.toString() === searchMunicipio)?.MUNICIPIO}
                  </span>
                )}
                {(fechaDesde || fechaHasta) && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-300 border border-green-600/30">
                    Fechas: {fechaDesde} - {fechaHasta}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="hover:bg-amber-900/10 hover:border-amber-700/40 transition-all duration-300"
        >
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Mostrar Todos los Expedientes</span>
          </span>
        </Button>
      </div>
      
      <Card 
        className="border-gray-800/50 hover:border-amber-900/20 transition-all duration-300 hover:shadow-lg"
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold text-lg">Listado de Expedientes</span>
            </div>
            {expedientes.length > 0 && (
              <span className="text-sm text-gray-500">
                {expedientes.length} {expedientes.length === 1 ? 'expediente' : 'expedientes'} encontrados
              </span>
            )}
          </div>
        }
      >
        <Table
          columns={columns}
          data={paginatedData as unknown as Record<string, unknown>[]}
          isLoading={isLoading}
          emptyMessage="No se encontraron expedientes"
          onRowClick={(row) => navigate(`/expedientes/${row.ID}`)}
        />
        
        {/* Paginación mejorada */}
        {expedientes.length > 0 && (
          <div className="flex justify-between items-center mt-6 px-2 border-t border-gray-800 pt-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Mostrando <span className="font-medium text-white">{indexOfFirstItem + 1}</span> a <span className="font-medium text-white">{Math.min(indexOfLastItem, expedientes.length)}</span> de <span className="font-medium text-white">{expedientes.length}</span> expedientes
            </div>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-9 p-0 flex justify-center items-center hover:bg-amber-900/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-9 p-0 flex justify-center items-center hover:bg-amber-900/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <span className="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-300 bg-gray-800 rounded-md">
                {currentPage} / {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-9 p-0 flex justify-center items-center hover:bg-amber-900/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-9 p-0 flex justify-center items-center hover:bg-amber-900/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ExpedientesPage