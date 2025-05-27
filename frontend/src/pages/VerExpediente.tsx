import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import type { Expediente, DatosExpediente, DatosPersonales, Materia } from '../types'
import { getExpedienteById } from '../services/expedientesService'
import { getDatosPersonalesByDni } from '../services/datosPersonalesService'
import { getDatosExpedienteByNumero } from '../services/datosExpedientesService'
import { getMateriaById } from '../services/materiasService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CompromisosPDF } from './PDF/CompromisosPDF';
import { DeclaracionActividadPDF } from './PDF/DeclaracionActividadPDF';
import { InformeTecnicoPDF } from './PDF/InformeTecnicoPDF';

const VerExpedientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null); // Estado para errores
  const [expediente, setExpediente] = useState<Expediente | null>(null)
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales | null>(null)
  const [datosExpedientes, setDatosExpedientes] = useState<DatosExpediente[]>([])
  const [materias, setMaterias] = useState<Record<number, Materia>>({})
  
  const loadExpediente = React.useCallback(async () => {
    if (!id) return
    
    setIsLoading(true)
    setError(null); // Reseteamos el error
    
    try {
      // Convertir el ID a número si es posible
      const numericId = parseInt(id, 10)
      if (isNaN(numericId)) {
        throw new Error("ID de expediente inválido")
      }
      
      const expedienteData = await getExpedienteById(numericId.toString())
      setExpediente(expedienteData)
      
      // Cargar datos personales relacionados
      try {
        if (expedienteData && expedienteData.DNI) {
          const personaData = await getDatosPersonalesByDni(expedienteData.DNI)
          setDatosPersonales(personaData)
        } else {
          setDatosPersonales(null)
        }
      } catch (error) {
        console.error('Error al cargar datos personales:', error)
        setDatosPersonales(null)
      }
      
      // Cargar datos de expedientes
      try {
        if (expedienteData && expedienteData.EXPEDIENTE) {
          const datosExp = await getDatosExpedienteByNumero(expedienteData.EXPEDIENTE)
          setDatosExpedientes(Array.isArray(datosExp) ? datosExp : [])
          
          // Solo cargar materias si hay datos de expediente
          if (Array.isArray(datosExp) && datosExp.length > 0) {
            const materiasObj: Record<number, Materia> = {};
            for (const dato of datosExp) {
              if (!materiasObj[dato.ID_MATERIA]) {
                try {
                  const materia = await getMateriaById(dato.ID_MATERIA)
                  materiasObj[dato.ID_MATERIA] = materia
                } catch (error) {
                  console.error(`Error al cargar materia ID ${dato.ID_MATERIA}:`, error)
                }
              }
            }
            setMaterias(materiasObj)
          }
        }
      } catch (error) {
        console.log('No se encontraron datos de expediente asociados:', error)
        setDatosExpedientes([])
      }
    } catch (error: unknown) {
      console.error('Error al cargar el expediente:', error)
      
      // Manejo específico de error 404
      interface ErrorWithResponse extends Error {
        response?: { status?: number };
      }
      const err = error as ErrorWithResponse;
      if (err.response?.status === 404) {
        setError("El expediente solicitado no existe en la base de datos");
        // No mostramos toast para 404, es una condición esperada
      } else {
        setError("Error al cargar el expediente. Por favor, inténtelo más tarde.");
        toast.error('Error al cargar el expediente')
      }
      
      setExpediente(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])
  
  useEffect(() => {
    loadExpediente()
  }, [id, loadExpediente])
  
  const formatDate = (dateValue: string | Date) => {
    if (!dateValue) return '—'
    try {
      const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue
      return format(dateObj, 'dd/MM/yyyy', { locale: es })
    } catch {
      return '—'
    }
  }
  
  const datosExpedientesColumns = [
    {
      header: 'Materia',
      accessor: 'ID_MATERIA',
      render: (value: unknown): React.ReactNode => {
        const materiaId = value as number;
        return materias[materiaId]?.MATERIA || '—';
      }
    },
    { header: 'Multiplicador', accessor: 'MULTIPLICADOR' },
    { header: 'Mínimo', accessor: 'MINIMO' },
    { header: 'Máximo', accessor: 'MAXIMO' },
    {
      header: 'Cantidad',
      accessor: 'CANTIDAD',
      render: (value: unknown): React.ReactNode => value !== undefined ? String(value) : '—'
    },
    {
      header: 'Cantidad Final',
      accessor: 'CANTIDAD_I',
      render: (value: unknown): React.ReactNode => {
         return (value !== undefined && value !== null) ? String(value) : '0';
      }
    },
    {
      header: 'Desde',
      accessor: 'DESDE',
      render: (value: unknown) => formatDate(value as string)
    },
    {
      header: 'Hasta',
      accessor: 'HASTA',
      render: (value: unknown) => formatDate(value as string)
    },
    { header: 'Polígono', accessor: 'POLIGONO' },
    { header: 'Parcela', accessor: 'PARCELA' },
    { header: 'Recinto', accessor: 'RECINTO' },
    {
      header: 'Cultivo',
      accessor: 'CULTIVO',
      render: (value: unknown) => (value as string) || '—'
    },
  ];
  
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
  
  if (error || !expediente) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xl font-medium text-red-700 dark:text-red-300">
            {error || "No se encontró el expediente solicitado"}
          </p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Verifique que el ID del expediente sea correcto o contacte al administrador.
          </p>
        </div>
        <Link to="/expedientes" className="mt-4 inline-block">
          <Button variant="primary">Volver a Expedientes</Button>
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
      
      <Card 
        title="Conceptos del Expediente"
        actions={
          <Button variant="outline" size="sm" onClick={() => toast.success("Funcionalidad en desarrollo")}>
            Añadir Concepto
          </Button>
        }
      >
        {datosExpedientes.length > 0 ? (
          <Table
            columns={datosExpedientesColumns}
            data={datosExpedientes as unknown as Record<string, unknown>[]}
            isLoading={isLoading}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">No hay conceptos asociados a este expediente</p>
            <p className="mt-2">Puedes añadir conceptos utilizando el botón de arriba</p>
          </div>
        )}
      </Card>
      
      <Card title="Documentos Generados">
        <div className="flex gap-2">
          <PDFDownloadLink
            document={
              expediente && datosPersonales
                ? <CompromisosPDF expediente={expediente} persona={datosPersonales} />
                : <span />
            }
            fileName={`Compromisos_${expediente?.EXPEDIENTE}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading || !expediente || !datosPersonales}>
                {loading ? 'Generando...' : 'Compromisos'}
              </Button>
            )}
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              expediente
                ? <DeclaracionActividadPDF expediente={expediente} conceptos={datosExpedientes} />
                : <span />
            }
            fileName={`DeclaracionActividad_${expediente?.EXPEDIENTE}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading || !expediente}>
                {loading ? 'Generando...' : 'Declaración Actividad'}
              </Button>
            )}
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              expediente
                ? <InformeTecnicoPDF expediente={{ ...expediente, ID_MUN: String(expediente.ID_MUN) }} />
                : <span />
            }
            fileName={`InformeTecnico_${expediente?.EXPEDIENTE}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading || !expediente}>
                {loading ? 'Generando...' : 'Informe Técnico'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </Card>
    </div>
  )
}

export default VerExpedientePage