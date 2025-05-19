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
  const navigate = useNavigate()
  
  const loadDatosPersonales = async () => {
    setIsLoading(true)
    try {
      const data = await getDatosPersonales()
      setDatosPersonales(Array.isArray(data) ? data : [])
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
      const data = await searchDatosPersonales(searchNombre, searchApellidos)
      setDatosPersonales(Array.isArray(data) ? data : [])
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
  }
  
  useEffect(() => {
    loadDatosPersonales()
  }, [])
  
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
          <Link to={`/datos-personales/editar/${row.DNI}`}>
            <Button
              variant="primary"
              size="sm"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              }
            >
              Editar
            </Button>
          </Link>
        </div>
      ),
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Datos Personales
        </h1>
        
        <Link to="/datos-personales/nuevo">
          <Button
            variant="primary"
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
      
      <Card title="Búsqueda de Personas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
            placeholder="Buscar por nombre"
          />
          
          <Input
            label="Apellidos"
            value={searchApellidos}
            onChange={(e) => setSearchApellidos(e.target.value)}
            placeholder="Buscar por apellidos"
          />
        </div>
        
        <div className="mt-4 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Limpiar
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSearch}
            isLoading={isLoading}
          >
            Buscar
          </Button>
        </div>
      </Card>
      
      <Card>
        <Table
          columns={columns}
          data={datosPersonales.map((item) => ({ ...item })) as Record<string, unknown>[]}
          isLoading={isLoading}
          emptyMessage="No se encontraron datos personales"
          onRowClick={(row) => navigate(`/datos-personales/${row.DNI}`)}
        />
      </Card>
    </div>
  )
}

export default DatosPersonalesPage