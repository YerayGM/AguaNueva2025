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
  const navigate = useNavigate()
  
  const loadExpedientes = async () => {
    setIsLoading(true)
    try {
      const data = await getExpedientes()
      setExpedientes(data)
    } catch (error) {
      toast.error('Error al cargar expedientes')
      console.error('Error al cargar expedientes:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const loadMunicipios = async () => {
    try {
      const data = await getMunicipios()
      setMunicipios(data)
    } catch (error) {
      toast.error('Error al cargar municipios')
      console.error('Error al cargar municipios:', error)
    }
  }
  
  const handleSearchByDni = async () => {
    if (!searchDni) {
      toast.error('Debe ingresar un DNI para buscar')
      return
    }
    
    setIsLoading(true)
    try {
      const data = await getExpedientesByDni(searchDni)
      setExpedientes(data)
    } catch (error) {
      toast.error('Error al buscar expedientes por DNI')
      console.error('Error al buscar expedientes por DNI:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSearchByMunicipio = async () => {
    if (!searchMunicipio) {
      toast.error('Debe seleccionar un municipio para buscar')
      return
    }
    
    setIsLoading(true)
    try {
      const data = await getExpedientesByMunicipio(parseInt(searchMunicipio))
      setExpedientes(data)
    } catch (error) {
      toast.error('Error al buscar expedientes por municipio')
      console.error('Error al buscar expedientes por municipio:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleReset = () => {
    setSearchDni('')
    setSearchMunicipio('')
    loadExpedientes()
  }
  
  useEffect(() => {
    loadExpedientes()
    loadMunicipios()
  }, [])
  
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
      header: 'Fecha',
      accessor: 'FECHA',
      render: (value: unknown) => formatDate(value as string),
    },
    {
      header: 'Localidad',
      accessor: 'LOCALIDAD',
    },
    {
      header: 'Observaciones',
      accessor: 'OBSER',
      render: (value: unknown) => (value as string) || '—',
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
          <Link to={`/expedientes/editar/${row.ID}`}>
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
          Expedientes
        </h1>
        
        <Link to="/expedientes/nuevo">
          <Button
            variant="primary"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
          >
            Nuevo Expediente
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Búsqueda por DNI">
          <div className="flex items-end gap-4">
            <Input
              label="DNI"
              value={searchDni}
              onChange={(e) => setSearchDni(e.target.value)}
              placeholder="Introducir DNI"
              className="flex-grow"
            />
            
            <Button
              variant="primary"
              onClick={handleSearchByDni}
              isLoading={isLoading}
            >
              Buscar
            </Button>
          </div>
        </Card>
        
        <Card title="Búsqueda por Municipio">
          <div className="flex items-end gap-4">
            <Select
              label="Municipio"
              value={searchMunicipio}
              onChange={(value) => setSearchMunicipio(value)}
              options={[
                { label: 'Seleccione un municipio', value: '' },
                ...(Array.isArray(municipios)
                  ? municipios.map((municipio) => ({
                      label: municipio.MUNICIPIO,
                      value: municipio.ID_MUN.toString(),
                    }))
                  : []),
              ]}
              className="flex-grow"
            />
            
            <Button
              variant="primary"
              onClick={handleSearchByMunicipio}
              isLoading={isLoading}
            >
              Buscar
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleReset}>
          Mostrar Todos
        </Button>
      </div>
      
      <Card>
        <Table
          columns={columns}
          data={expedientes as unknown as Record<string, unknown>[]}
          isLoading={isLoading}
          emptyMessage="No se encontraron expedientes"
          onRowClick={(row) => navigate(`/expedientes/${row.ID}`)}
        />
      </Card>
    </div>
  )
}

export default ExpedientesPage