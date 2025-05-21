import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Table from '../components/ui/Table'
import type { DatosPersonales } from '../types'
import { getDatosPersonales, searchDatosPersonales } from '../services/datosPersonalesService'
import { toast } from 'react-hot-toast'

const DatosPersonalesPage: React.FC = () => {
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchNombre, setSearchNombre] = useState('')
  const [searchApellidos, setSearchApellidos] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const navigate = useNavigate()
  
  const loadDatosPersonales = async () => {
    setIsLoading(true)
    try {
      const datos = await getDatosPersonales()
      setDatosPersonales(datos)
    } catch (error) {
      toast.error('Error al cargar datos personales')
      console.error('Error al cargar datos personales:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSearch = async () => {
    if (!searchNombre && !searchApellidos) {
      toast.error('Debe ingresar al menos un criterio de búsqueda')
      return
    }
    
    setIsLoading(true)
    try {
      const datos = await searchDatosPersonales(searchNombre, searchApellidos)
      setDatosPersonales(datos)
      setCurrentPage(1)
    } catch (error) {
      toast.error('Error al buscar datos personales')
      console.error('Error al buscar datos personales:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleReset = () => {
    setSearchNombre('')
    setSearchApellidos('')
    loadDatosPersonales()
    setCurrentPage(1)
  }
  
  useEffect(() => {
    loadDatosPersonales()
  }, [])
  
  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedData = datosPersonales.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(datosPersonales.length / itemsPerPage)
  
  const columns = [
    {
      header: 'DNI',
      accessor: 'DNI',
    },
    {
      header: 'Nombre',
      accessor: 'NOMBREC',
    },
    {
      header: 'Apellidos',
      accessor: 'APELLIDOS',
    },
    {
      header: 'Localidad',
      accessor: 'LOCALIDAD',
    },
    {
      header: 'Teléfono',
      accessor: 'TELEFONO',
    },
    {
      header: 'Email',
      accessor: 'EMAIL',
    },
    {
      header: 'Acciones',
      accessor: 'actions',
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex space-x-2">
          <Link to={`/datos-personales/${row.DNI}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-blue-800/40 hover:border-blue-700 transition-all duration-300"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            >
              Ver
            </Button>
          </Link>
        </div>
      ),
    },
  ]
  
  return (
    <div className="space-y-6">
      {/* Encabezado con estadísticas */}
      <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Datos Personales
              </h1>
              <p className="text-blue-100 max-w-2xl">
                Gestione la información personal de los beneficiarios de subvenciones para agua agrícola.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to="/datos-personales/nuevo">
                <Button
                  variant="primary"
                  className="bg-white/90 hover:bg-white text-blue-900 hover:text-blue-800 shadow-lg transition-all duration-300 border-none"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  }
                >
                  Nuevo Registro
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Resumen estadísticas (opcional, si tienes estos datos) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-blue-200 text-sm">Total registros</p>
              <p className="text-white text-2xl font-bold">{datosPersonales.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-blue-200 text-sm">Localidades representadas</p>
              <p className="text-white text-2xl font-bold">
                {new Set(datosPersonales.map(d => d.LOCALIDAD)).size}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-blue-200 text-sm">Registros completos</p>
              <p className="text-white text-2xl font-bold">
                {datosPersonales.filter(d => d.EMAIL && d.TELEFONO).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60">
            <path fill="#111827" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,21.3C1120,11,1280,21,1360,26.7L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </div>
      
      <Card 
        title={
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Búsqueda de Personas</span>
          </div>
        }
        className="hover:shadow-md transition-all duration-300 border-gray-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label="Nombre"
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
              placeholder="Buscar por nombre"
              className="pl-9"
            />
            <div className="absolute left-3 top-9 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <Input
              label="Apellidos"
              value={searchApellidos}
              onChange={(e) => setSearchApellidos(e.target.value)}
              placeholder="Buscar por apellidos"
              className="pl-9"
            />
            <div className="absolute left-3 top-9 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Limpiar</span>
            </span>
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSearch}
            isLoading={isLoading}
            className="bg-blue-700 hover:bg-blue-600 transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar</span>
            </span>
          </Button>
        </div>
      </Card>
      
      <Card className="border-gray-800/50 hover:border-gray-700 transition-all duration-300">
        <Table
          columns={columns}
          data={paginatedData.map((item) => ({ ...item })) as Record<string, unknown>[]}
          isLoading={isLoading}
          emptyMessage={
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
              </svg>
              <p className="mt-2 text-gray-500">No se encontraron datos personales</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 hover:bg-blue-800/20"
                onClick={handleReset}
              >
                Mostrar todos los registros
              </Button>
            </div>
          }
          onRowClick={(row) => navigate(`/datos-personales/${row.DNI}`)}
        />
        
        {/* Paginación mejorada */}
        {datosPersonales.length > 0 && (
          <div className="flex justify-between items-center mt-6 px-2 border-t border-gray-800 pt-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Mostrando <span className="font-medium text-white">{indexOfFirstItem + 1}</span> a <span className="font-medium text-white">{Math.min(indexOfLastItem, datosPersonales.length)}</span> de <span className="font-medium text-white">{datosPersonales.length}</span> registros
            </div>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-9 p-0 flex justify-center items-center"
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
                className="w-9 p-0 flex justify-center items-center"
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
                className="w-9 p-0 flex justify-center items-center"
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
                className="w-9 p-0 flex justify-center items-center"
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

export default DatosPersonalesPage