import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import type { Municipio } from '../types'
import { createExpediente } from '../services/expedientesService'
import { getDatosPersonalesByDni } from '../services/datosPersonalesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'

const NuevoExpedientePage: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  
  // Form state
  const [dni, setDni] = useState('')
  const [fecha, setFecha] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [lugar, setLugar] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [idMunicipio, setIdMunicipio] = useState('')
  const [contNombre, setContNombre] = useState('')
  const [contPoliza, setContPoliza] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tecnico, setTecnico] = useState('')
  
  // Validation state
  const [dniError, setDniError] = useState('')
  
  const loadMunicipios = async () => {
    try {
      const data = await getMunicipios()
      console.log('Datos de municipios recibidos:', data)
      // Verificar la estructura de los datos y extraer el array de municipios
      if (data && data.data && Array.isArray(data.data)) {
        setMunicipios(data.data)
      } else if (Array.isArray(data)) {
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
  
  const validateDni = async () => {
    if (!dni) {
      setDniError('El DNI es obligatorio')
      return false
    }
    
    try {
      // Verificar si existe la persona con ese DNI
      await getDatosPersonalesByDni(dni)
      setDniError('')
      return true
    } catch {
      setDniError('No existe ninguna persona con ese DNI')
      return false
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isValid = await validateDni()
    if (!isValid) return
    
    if (!fecha || !idMunicipio) {
      toast.error('Los campos de fecha y municipio son obligatorios')
      return
    }
    
    setIsLoading(true)
    try {
      const expedienteData = {
        DNI: dni,
        FECHA: fecha,
        LUGAR: lugar || '',
        LOCALIDAD: localidad || '',
        ID_MUN: parseInt(idMunicipio),
        CONT_NOMBRE: contNombre || '',
        CONT_POLIZA: contPoliza || '',
        OBSER: observaciones || '',
        TECNICO: tecnico || '',
        FECHA_I: fecha, // Misma fecha inicial
        DIAS: 0,
        OB_TEC: '',
        TXT_INFORME: '',
      }
      
      const nuevoExpediente = await createExpediente(expedienteData)
      toast.success('Expediente creado correctamente')
      navigate(`/expedientes/${nuevoExpediente.ID}`)
    } catch {
      toast.error('Error al crear el expediente')
      // Opcional: console.error('Error al crear el expediente')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    navigate('/expedientes')
  }
  
  useEffect(() => {
    loadMunicipios()
  }, [])
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Crear Nuevo Expediente
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Introducir DNI de la persona"
              required
              error={dniError}
              helpText="DNI de la persona asociada al expediente"
            />
            
            <Input
              label="Fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
            
            <Input
              label="Lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Lugar"
            />
            
            <Input
              label="Localidad"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              placeholder="Localidad"
            />
            
            <Select
              label="Municipio"
              value={idMunicipio}
              onChange={(value) => setIdMunicipio(value)}
              options={[
                { label: 'Seleccione un municipio', value: '' },
                ...municipios.map((municipio) => ({
                  label: municipio.MUNICIPIO,
                  value: municipio.ID_MUN.toString(),
                })),
              ]}
              required
            />
            
            <Input
              label="Contador a Nombre de"
              value={contNombre}
              onChange={(e) => setContNombre(e.target.value)}
              placeholder="Nombre en el contador"
            />
            
            <Input
              label="Nº Póliza"
              value={contPoliza}
              onChange={(e) => setContPoliza(e.target.value)}
              placeholder="Número de póliza"
            />
            
            <Input
              label="Técnico"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              placeholder="Nombre del técnico"
            />
            
            <div className="col-span-1 md:col-span-2">
              <textarea
                className="w-full border rounded px-3 py-2 mt-1"
                aria-label="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Observaciones"
                rows={3}
                name="observaciones"
                id="observaciones"
              />
            </div>
          </div>
          
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
              Crear Expediente
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NuevoExpedientePage