import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Expediente, Municipio } from '../types'
import { getExpedienteById, updateExpediente } from '../services/expedientesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'

const EditarExpedientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  
  // Form state
  const [formData, setFormData] = useState<Partial<Expediente>>({
    ID: 0,
    EXPEDIENTE: '',
    HOJA: 0,
    DNI: '',
    FECHA: '',
    LUGAR: '',
    LOCALIDAD: '',
    ID_MUN: 0,
    CONT_NOMBRE: '',
    CONT_POLIZA: '',
    OBSER: '',
    TECNICO: '',
    FECHA_I: '',
    DIAS: 0,
    OB_TEC: '',
    TXT_INFORME: '',
  })

  const [cuatrimestre, setCuatrimestre] = useState<string>("1")
  
  const loadExpediente = React.useCallback(async () => {
    if (!id) return

    setIsLoading(true)
    try {
      const data = await getExpedienteById(id)

      // Formatear fechas para inputs tipo date
      if (data.FECHA) {
        try {
          data.FECHA = format(new Date(data.FECHA), 'yyyy-MM-dd')
        } catch (error) {
          console.error('Error formateando FECHA:', error)
        }
      }

      if (data.FECHA_I) {
        try {
          data.FECHA_I = format(new Date(data.FECHA_I), 'yyyy-MM-dd')
        } catch (error) {
          console.error('Error formateando FECHA_I:', error)
        }
      }

      setFormData(data)
      
      // Determinar cuatrimestre basado en la fecha
      if (data.FECHA) {
        const mes = new Date(data.FECHA).getMonth() + 1; // getMonth() es base-0
        if (mes <= 4) setCuatrimestre("1");
        else if (mes <= 8) setCuatrimestre("2");
        else setCuatrimestre("3");
      }
      
    } catch (error) {
      toast.error('Error al cargar el expediente')
      console.error('Error al cargar el expediente:', error)
      navigate('/expedientes')
    } finally {
      setIsLoading(false)
    }
  }, [id, navigate])
  
  const loadMunicipios = async () => {
    try {
      const data = await getMunicipios()
      if (Array.isArray(data)) {
        setMunicipios(data)
      } else if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
        setMunicipios(data.data)
      } else {
        console.error('Formato de datos de municipios inesperado:', data)
        setMunicipios([])
      }
    } catch (error) {
      toast.error('Error al cargar municipios')
      console.error('Error al cargar municipios:', error)
    }
  }
  
  useEffect(() => {
    loadMunicipios()
    if (id) {
      loadExpediente()
    }
  }, [id, loadExpediente])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : parseInt(value, 10),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === '' ? 0 : parseInt(value, 10),
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ID || !formData.DNI || !formData.FECHA) {
      toast.error('Los campos ID, DNI y Fecha son obligatorios')
      return
    }
    
    setIsLoading(true)
    try {
      await updateExpediente(formData.ID.toString(), {
        ...formData,
        CUATRI: parseInt(cuatrimestre, 10)
      })
      toast.success('Expediente actualizado correctamente')
      navigate(`/expedientes/${formData.ID}`)
    } catch (error) {
      toast.error('Error al actualizar el expediente')
      console.error('Error al actualizar el expediente:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    navigate(-1)
  }
  
  if (isLoading && !formData.EXPEDIENTE) {
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
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Editar Expediente: {formData.EXPEDIENTE}
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <Tabs 
            tabs={[
              { id: 'datos-basicos', label: 'Datos Básicos' },
              { id: 'informe-tecnico', label: 'Informe Técnico' },
              { id: 'materias', label: 'Materias y Conceptos' }
            ]}
          >
            {/* Pestaña de datos básicos */}
            <div id="datos-basicos" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Expediente"
                name="EXPEDIENTE"
                value={formData.EXPEDIENTE}
                onChange={handleInputChange}
                placeholder="Código de Expediente"
                disabled={true}
              />
              
              <Input
                label="DNI"
                name="DNI"
                value={formData.DNI}
                onChange={handleInputChange}
                placeholder="Introducir DNI de la persona"
                required
              />
              
              <Input
                label="Fecha"
                name="FECHA"
                type="date"
                value={formData.FECHA?.toString() || ''}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Lugar"
                name="LUGAR"
                value={formData.LUGAR || ''}
                onChange={handleInputChange}
                placeholder="Lugar"
              />
              
              <Input
                label="Localidad"
                name="LOCALIDAD"
                value={formData.LOCALIDAD || ''}
                onChange={handleInputChange}
                placeholder="Localidad"
              />
              
              <Select
                label="Municipio"
                name="ID_MUN"
                value={formData.ID_MUN?.toString() || ''}
                onChange={(value) => handleSelectChange('ID_MUN', value)}
                options={[
                  { label: 'Seleccione un municipio', value: '' },
                  ...(Array.isArray(municipios) ? municipios.map((municipio) => ({
                    label: municipio.MUNICIPIO,
                    value: municipio.ID_MUN.toString(),
                  })) : []),
                ]}
                required
              />
              
              <Input
                label="Contador a Nombre de"
                name="CONT_NOMBRE"
                value={formData.CONT_NOMBRE || ''}
                onChange={handleInputChange}
                placeholder="Nombre en el contador"
              />
              
              <Input
                label="Nº Póliza"
                name="CONT_POLIZA"
                value={formData.CONT_POLIZA || ''}
                onChange={handleInputChange}
                placeholder="Número de póliza"
              />
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observaciones
                </label>
                <textarea
                  name="OBSER"
                  rows={3}
                  value={formData.OBSER || ''}
                  onChange={handleInputChange}
                  placeholder="Observaciones"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            {/* Pestaña de informe técnico */}
            <div id="informe-tecnico" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Técnico"
                name="TECNICO"
                value={formData.TECNICO || ''}
                onChange={handleInputChange}
                placeholder="Nombre del técnico"
              />
              
              <Input
                label="Fecha de Informe"
                name="FECHA_I"
                type="date"
                value={formData.FECHA_I?.toString() || ''}
                onChange={handleInputChange}
              />
              
              <Input
                label="Días"
                name="DIAS"
                type="number"
                value={formData.DIAS?.toString() || '0'}
                onChange={handleInputChange}
                min="0"
              />
              
              <Select
                label="Cuatrimestre"
                value={cuatrimestre}
                onChange={(value) => setCuatrimestre(value)}
                options={[
                  { label: '1er Cuatrimestre', value: '1' },
                  { label: '2º Cuatrimestre', value: '2' },
                  { label: '3er Cuatrimestre', value: '3' }
                ]}
              />
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observaciones Técnicas
                </label>
                <textarea
                  name="OB_TEC"
                  rows={3}
                  value={formData.OB_TEC || ''}
                  onChange={handleInputChange}
                  placeholder="Observaciones técnicas"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Texto del Informe
                </label>
                <textarea
                  name="TXT_INFORME"
                  rows={3}
                  value={formData.TXT_INFORME || ''}
                  onChange={handleInputChange}
                  placeholder="Texto del informe"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            {/* Pestaña de materias y conceptos */}
            <div id="materias" className="space-y-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Conceptos del Expediente</h3>
                <p className="text-sm text-gray-500">Añada materias y conceptos al expediente</p>
              </div>
              
              <table className="min-w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Concepto</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Multi/Mini</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cant.</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Inf.</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Desde</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hasta</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cultivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3" colSpan={7}>
                      <div className="text-center py-4 text-gray-500">
                        Para añadir o editar conceptos, guarde primero los cambios básicos del expediente
                        y luego acceda a la vista detallada del expediente.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tabs>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default EditarExpedientePage