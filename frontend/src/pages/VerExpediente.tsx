import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import type { Expediente, DatosExpediente, DatosPersonales } from '../types'
import { getExpedienteById } from '../services/expedientesService'
import { getDatosPersonalesByDni } from '../services/datosPersonalesService'
import { getDatosExpedientes } from '../services/datosExpedientesService'
import { getMateriaById } from '../services/materiasService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const VerExpedientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [expediente, setExpediente] = useState<Expediente | null>(null)
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales | null>(null)
  const [datosExpedientes, setDatosExpedientes] = useState<DatosExpediente[]>([])
  
  const loadExpediente = async () => {
    if (!id) return
    
    setIsLoading(true)
    try {
      const expedienteData = await getExpedienteById(id)
      setExpediente(expedienteData)
      
      // Cargar datos personales relacionados
      try {
        const personaData = await getDatosPersonalesByDni(expedienteData.DNI)
        setDatosPersonales(personaData)
      } catch (error) {
        console.error('Error al cargar datos personales:', error)
      }
      
      // Cargar datos de expedientes
      try {
        const datosExpData = await getDatosExpedientes()
        // Filtrar solo los que corresponden a este expediente
        const filteredDatos = datosExpData.filter(
          dato => dato.EXPEDIENTE === expedienteData.EXPEDIENTE
        )
        
        setDatosExpedientes(filteredDatos)
        
        // Añadir nombre de materia a cada dato de expediente
        for (const dato of filteredDatos) {
          try {
            const materia = await getMateriaById(dato.ID_MATERIA)
            dato.materiaName = materia.MATERIA
          } catch (error) {
            console.error(`Error al cargar materia ID ${dato.ID_MATERIA}:`, error)
          }
        }
        
      } catch (error) {
        console.error('Error al cargar datos de expedientes:', error)
      }
      
    } catch (error) {
      toast.error('Error al cargar el expediente')
      console.error('Error al cargar el expediente:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    loadExpediente()
  }, [id])
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '—'
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es })
    } catch (error) {
      return '—'
    }
  }
  
  const datosExpedientesColumns = [
    {
      header: 'Concepto',
      accessor: 'materiaName',
      render: (value: string) => value || '—',
    },
    {
      header: 'Multiplicador',
      accessor: 'MULTIPLICADOR',
    },
    {
      header: 'Mínimo',
      accessor: 'MINIMO',
    },
    {
      header: 'Máximo',
      accessor: 'MAXIMO',
    },
    {
      header: 'Cantidad',
      accessor: 'CANTIDAD',
    },
    {
      header: 'Desde',
      accessor: 'DESDE',
      render: (value: string) => formatDate(value),
    },
    {
      header: 'Hasta',
      accessor: 'HASTA',
      render: (value: string) => formatDate(value),
    },
    {
      header: 'Cultivo',
      accessor: 'CULTIVO',
      render: (value: string) => value || '—',
    },
  ]
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-emerald-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Cargando expediente...</p>
        </div>
      </div>
    )
  }
  
  if (!expediente) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-slate-600 dark:text-slate-300">
          No se encontró el expediente solicitado
        </p>
        <Link to="/expedientes" className="mt-4 inline-block">
          <Button>Volver a Expedientes</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Expediente: {expediente.EXPEDIENTE}
        </h1>
        
        <div className="flex space-x-3">
          <Link to={`/expedientes/editar/${expediente.ID}`}>
            <Button
              variant="primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              }
            >
              Editar
            </Button>
          </Link>
          
          <Link to="/expedientes">
            <Button variant="outline">
              Volver
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Datos del Expediente">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Fecha</p>
              <p className="text-slate-800 dark:text-white">{formatDate(expediente.FECHA)}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">DNI</p>
              <p className="text-slate-800 dark:text-white">{expediente.DNI}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Lugar</p>
              <p className="text-slate-800 dark:text-white">{expediente.LUGAR || '—'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Localidad</p>
              <p className="text-slate-800 dark:text-white">{expediente.LOCALIDAD || '—'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Contador a Nombre de</p>
              <p className="text-slate-800 dark:text-white">{expediente.CONT_NOMBRE || '—'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Nº Póliza</p>
              <p className="text-slate-800 dark:text-white">{expediente.CONT_POLIZA || '—'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Técnico</p>
              <p className="text-slate-800 dark:text-white">{expediente.TECNICO || '—'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Días</p>
              <p className="text-slate-800 dark:text-white">{expediente.DIAS}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Observaciones</p>
            <p className="text-slate-800 dark:text-white mt-1">{expediente.OBSER || '—'}</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Texto del Informe</p>
            <p className="text-slate-800 dark:text-white mt-1">{expediente.TXT_INFORME || '—'}</p>
          </div>
        </Card>
        
        <Card title="Datos Personales">
          {datosPersonales ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Nombre</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.NOMBREC || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Apellidos</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.APELLIDOS}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Dirección</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.DIRECCION || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Localidad</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.LOCALIDAD || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Teléfono</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.TELEFONO || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.EMAIL || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Actividad Agropecuaria</p>
                  <p className="text-slate-800 dark:text-white">{datosPersonales.ACTIVIDADAGROPEC || '—'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tipo de Persona</p>
                  <p className="text-slate-800 dark:text-white">
                    {datosPersonales.PER_FIS ? 'Física' : ''}
                    {datosPersonales.PER_JUR ? 'Jurídica' : ''}
                    {!datosPersonales.PER_FIS && !datosPersonales.PER_JUR ? '—' : ''}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link to={`/datos-personales/${datosPersonales.DNI}`}>
                  <Button variant="outline" size="sm">
                    Ver Ficha Completa
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center py-4 text-slate-500 dark:text-slate-400">
              No se encontraron datos personales asociados
            </p>
          )}
        </Card>
      </div>
      
      <Card title="Datos del Expediente">
        <Table
          columns={datosExpedientesColumns}
          data={datosExpedientes}
          isLoading={isLoading}
          emptyMessage="No hay datos específicos para este expediente"
        />
      </Card>
    </div>
  )
}

export default VerExpedientePage