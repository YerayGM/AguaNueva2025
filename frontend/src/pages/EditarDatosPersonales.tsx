import React, { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import type { DatosPersonales, FormMode } from '../types'
import { getDatosPersonalesByDni, createDatosPersonales, updateDatosPersonales } from '../services/datosPersonalesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'

interface EditarDatosPersonalesPageProps {
  mode?: FormMode
}

const EditarDatosPersonalesPage: React.FC<EditarDatosPersonalesPageProps> = ({ mode = 'edit' }) => {
  const { dni } = useParams<{ dni: string }>()
  const navigate = useNavigate()
  const isViewMode = mode === 'view' || false
  const isCreateMode = !dni
  
  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<{ ID_MUN: number, MUNICIPIO: string }[]>([])
  
  // Form state
  const [formData, setFormData] = useState<Partial<DatosPersonales>>({
    DNI: '',
    APELLIDOS: '',
    NOMBREC: '',
    DIRECCION: '',
    LOCALIDAD: '',
    ID_MUN: 0,
    TELEFONO: '',
    EMAIL: '',
    ACTIVIDADAGROPEC: '',
    PER_FIS: false,
    PER_JUR: false,
    AGRI_PRO: false,
    AGRI_PARCIAL: false,
    TRAB_ASAL: false,
    NUM_ASAL: 0,
    DIS_AGRI_PROF: false,
    NUM_AGRI_PROF: 0,
    NUM_TRAB_ASAL: 0,
  })
  const loadDatosPersonales = useCallback(async () => {
    if (!dni) return

    setIsLoading(true)
    try {
      const data = await getDatosPersonalesByDni(dni)
      setFormData(data)
    } catch (error) {
      toast.error('Error al cargar los datos personales')
      console.error('Error al cargar los datos personales:', error)
      navigate('/datos-personales')
    } finally {
      setIsLoading(false)
    }
  }, [dni, navigate])

  const loadMunicipios = useCallback(async () => {
    try {
      const data = await getMunicipios()
      setMunicipios(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Error al cargar municipios')
      console.error('Error al cargar municipios:', error)
      setMunicipios([])
    }
  }, [])

  useEffect(() => {
    loadMunicipios()
    if (dni) {
      loadDatosPersonales()
    }
  }, [dni, loadDatosPersonales, loadMunicipios])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      })
    } else if (type === 'number') {
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
    
    if (!formData.DNI || !formData.APELLIDOS || !formData.EMAIL) {
      toast.error('Los campos DNI, Apellidos y Email son obligatorios')
      return
    }
    
    setIsLoading(true)
    try {
      if (isCreateMode) {
        await createDatosPersonales(formData)
        toast.success('Datos personales creados correctamente')
      } else {
        await updateDatosPersonales(formData.DNI!, formData)
        toast.success('Datos personales actualizados correctamente')
      }
      navigate('/datos-personales')
    } catch (error) {
      toast.error(`Error al ${isCreateMode ? 'crear' : 'actualizar'} los datos personales`)
      console.error(`Error al ${isCreateMode ? 'crear' : 'actualizar'} los datos personales:`, error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    navigate(-1)
  }
  
  const pageTitle = isViewMode 
    ? 'Ver Datos Personales' 
    : isCreateMode 
      ? 'Crear Datos Personales' 
      : 'Editar Datos Personales'
  
  if (isLoading && !isCreateMode) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-emerald-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Cargando datos...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          {pageTitle}
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="DNI"
              name="DNI"
              value={formData.DNI}
              onChange={handleInputChange}
              placeholder="Introducir DNI"
              required
              disabled={!isCreateMode || isViewMode}
            />
            
            <Input
              label="Apellidos"
              name="APELLIDOS"
              value={formData.APELLIDOS}
              onChange={handleInputChange}
              placeholder="Apellidos"
              required
              disabled={isViewMode}
            />
            
            <Input
              label="Nombre"
              name="NOMBREC"
              value={formData.NOMBREC}
              onChange={handleInputChange}
              placeholder="Nombre"
              disabled={isViewMode}
            />
            
            <Input
              label="Dirección"
              name="DIRECCION"
              value={formData.DIRECCION}
              onChange={handleInputChange}
              placeholder="Dirección"
              disabled={isViewMode}
            />
            
            <Input
              label="Localidad"
              name="LOCALIDAD"
              value={formData.LOCALIDAD}
              onChange={handleInputChange}
              placeholder="Localidad"
              disabled={isViewMode}
            />
            
            <Select
              label="Municipio"
              name="ID_MUN"
              value={formData.ID_MUN?.toString() || ''}
              onChange={(value) => handleSelectChange('ID_MUN', value)}
              options={[
                { label: 'Seleccione un municipio', value: '0' },
                ...municipios.map((municipio) => ({
                  label: municipio.MUNICIPIO,
                  value: municipio.ID_MUN.toString(),
                })),
              ]}
              disabled={isViewMode}
            />
            
            <Input
              label="Teléfono"
              name="TELEFONO"
              value={formData.TELEFONO}
              onChange={handleInputChange}
              placeholder="Teléfono"
              disabled={isViewMode}
            />
            
            <Input
              label="Email"
              name="EMAIL"
              type="email"
              value={formData.EMAIL}
              onChange={handleInputChange}
              placeholder="Email"
              required
              disabled={isViewMode}
            />
            
            <Input
              label="Actividad Agropecuaria"
              name="ACTIVIDADAGROPEC"
              value={formData.ACTIVIDADAGROPEC}
              onChange={handleInputChange}
              placeholder="Actividad Agropecuaria"
              disabled={isViewMode}
            />
            
            <div className="col-span-1 md:col-span-2">
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                <h3 className="text-md font-medium text-slate-800 dark:text-white mb-4">
                  Tipo de Persona
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="PER_FIS"
                      checked={formData.PER_FIS}
                      onChange={handleInputChange}
                      label="Persona Física"
                      disabled={isViewMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="PER_JUR"
                      checked={formData.PER_JUR}
                      onChange={handleInputChange}
                      label="Persona Jurídica"
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                <h3 className="text-md font-medium text-slate-800 dark:text-white mb-4">
                  Tipo de Actividad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="AGRI_PRO"
                      checked={formData.AGRI_PRO}
                      onChange={handleInputChange}
                      label="Agricultor Profesional"
                      disabled={isViewMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="AGRI_PARCIAL"
                      checked={formData.AGRI_PARCIAL}
                      onChange={handleInputChange}
                      label="Agricultor Parcial"
                      disabled={isViewMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="TRAB_ASAL"
                      checked={formData.TRAB_ASAL}
                      onChange={handleInputChange}
                      label="Trabajadores Asalariados"
                      disabled={isViewMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="DIS_AGRI_PROF"
                      checked={formData.DIS_AGRI_PROF}
                      onChange={handleInputChange}
                      label="Dispone de Agricultores Profesionales"
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                <h3 className="text-md font-medium text-slate-800 dark:text-white mb-4">
                  Información Adicional
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Número de Asalariados"
                    name="NUM_ASAL"
                    type="number"
                    value={formData.NUM_ASAL?.toString()}
                    onChange={handleInputChange}
                    min="0"
                    disabled={isViewMode}
                  />
                  
                  <Input
                    label="Número de Agricultores Profesionales"
                    name="NUM_AGRI_PROF"
                    type="number"
                    value={formData.NUM_AGRI_PROF?.toString()}
                    onChange={handleInputChange}
                    min="0"
                    disabled={isViewMode}
                  />
                  
                  <Input
                    label="Número de Trabajadores Asalariados"
                    name="NUM_TRAB_ASAL"
                    type="number"
                    value={formData.NUM_TRAB_ASAL?.toString()}
                    onChange={handleInputChange}
                    min="0"
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              {isViewMode ? 'Volver' : 'Cancelar'}
            </Button>
            
            {!isViewMode && (
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                {isCreateMode ? 'Crear' : 'Guardar Cambios'}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}

export default EditarDatosPersonalesPage