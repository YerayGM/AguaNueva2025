import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Municipio, DatosPersonales } from '../types'
import { createExpediente } from '../services/expedientesService'
import { getDatosPersonalesByDni } from '../services/datosPersonalesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'

const NuevoExpedientePage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const dniParam = searchParams.get('dni');
  
  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [datosPersona, setDatosPersona] = useState<DatosPersonales | null>(null)
  
  // Form state
  const [dni, setDni] = useState(dniParam || '')
  const [hoja, setHoja] = useState('1')
  const [fecha, setFecha] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [lugar, setLugar] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [idMunicipio, setIdMunicipio] = useState('')
  const [contNombre, setContNombre] = useState('')
  const [contPoliza, setContPoliza] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tecnico, setTecnico] = useState('')
  const [fechaInforme, setFechaInforme] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [dias, setDias] = useState<string>('0')
  const [obsTecnicas, setObsTecnicas] = useState('')
  const [textoInforme, setTextoInforme] = useState('')
  const [cuatrimestre, setCuatrimestre] = useState<string>('1')
  
  // Validation state
  const [dniError, setDniError] = useState('')
  
  const loadMunicipios = async () => {
    try {
      const data = await getMunicipios()
      setMunicipios(Array.isArray(data) ? data : [])
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
      const persona = await getDatosPersonalesByDni(dni)
      setDatosPersona(persona)
      setDniError('')
      
      // Si la persona tiene un municipio, lo seleccionamos
      if (persona.ID_MUN) {
        setIdMunicipio(persona.ID_MUN.toString())
      }
      
      // Si la persona tiene un nombre, lo usamos para el contador
      if (persona.NOMBREC && persona.APELLIDOS) {
        setContNombre(`${persona.NOMBREC} ${persona.APELLIDOS}`)
      }
      
      // Si la persona tiene una localidad, la usamos
      if (persona.LOCALIDAD) {
        setLocalidad(persona.LOCALIDAD)
      }
      
      return true
    } catch {
      setDniError('No existe ninguna persona con ese DNI')
      setDatosPersona(null)
      return false
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar DNI y otros campos obligatorios
    if (!dni) {
      toast.error('El DNI es obligatorio')
      return
    }
    
    const isValid = datosPersona ? true : await validateDni()
    if (!isValid) return
    
    if (!fecha || !idMunicipio) {
      toast.error('Los campos de fecha y municipio son obligatorios')
      return
    }
    
    setIsLoading(true)
    try {
      const expedienteData = {
        DNI: dni,
        HOJA: parseInt(hoja, 10),
        FECHA: fecha,
        LUGAR: lugar || '',
        LOCALIDAD: localidad || '',
        ID_MUN: parseInt(idMunicipio),
        CONT_NOMBRE: contNombre || '',
        CONT_POLIZA: contPoliza || '',
        OBSER: observaciones || '',
        TECNICO: tecnico || '',
        FECHA_I: fechaInforme,
        DIAS: parseInt(dias),
        OB_TEC: obsTecnicas || '',
        TXT_INFORME: textoInforme || ''
        // El campo EXPEDIENTE se genera en el backend
      }
      
      const nuevoExpediente = await createExpediente(expedienteData)
      toast.success('Expediente creado correctamente')
      navigate(`/expedientes/${nuevoExpediente.ID}`)
    } catch (error) {
      toast.error('Error al crear el expediente')
      console.error('Error al crear el expediente:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    navigate(-1)
  }
  
  useEffect(() => {
    loadMunicipios()
    
    // Si hay un DNI en los parámetros de la URL, cargar los datos de esa persona
    if (dniParam) {
      validateDni();
    }
  }, [dniParam])
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Crear Nuevo Expediente
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <Tabs 
            tabs={[
              { id: 'datos-basicos', label: 'Datos Básicos' },
              { id: 'informe-tecnico', label: 'Informe Técnico' },
              { id: 'cuatrimestres', label: 'Cuatrimestres' }
            ]}
          >
            {/* Pestaña de datos básicos */}
            <div id="datos-basicos" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Introducir DNI de la persona"
                required
                error={dniError}
                helpText={datosPersona ? `${datosPersona.NOMBREC || ''} ${datosPersona.APELLIDOS || ''}` : ""}
                onBlur={() => validateDni()}
              />
              
              <Input
                label="Hoja"
                type="number"
                value={hoja}
                onChange={(e) => setHoja(e.target.value)}
                min="1"
                required
                helpText="Número de hoja del expediente"
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
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observaciones
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones generales"
                  rows={3}
                />
              </div>
            </div>
            
            {/* Pestaña de informe técnico */}
            <div id="informe-tecnico" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Técnico"
                value={tecnico}
                onChange={(e) => setTecnico(e.target.value)}
                placeholder="Nombre del técnico"
              />
              
              <Input
                label="Fecha de Informe"
                type="date"
                value={fechaInforme}
                onChange={(e) => setFechaInforme(e.target.value)}
              />
              
              <Input
                label="Días"
                type="number"
                value={dias}
                onChange={(e) => setDias(e.target.value)}
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
                  className="w-full border rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={obsTecnicas}
                  onChange={(e) => setObsTecnicas(e.target.value)}
                  placeholder="Observaciones técnicas"
                  rows={3}
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Texto del Informe
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={textoInforme}
                  onChange={(e) => setTextoInforme(e.target.value)}
                  placeholder="Texto del informe técnico"
                  rows={3}
                />
              </div>
            </div>
            
            {/* Pestaña de cuatrimestres */}
            <div id="cuatrimestres" className="space-y-6">
              <div className="flex mb-4 border-b">
                <button
                  type="button"
                  className={`py-2 px-4 ${cuatrimestre === '1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setCuatrimestre('1')}
                >
                  1er Cuatrimestre
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 ${cuatrimestre === '2' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setCuatrimestre('2')}
                >
                  2º Cuatrimestre
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 ${cuatrimestre === '3' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setCuatrimestre('3')}
                >
                  3er Cuatrimestre
                </button>
              </div>
              
              <table className="min-w-full">
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
                        Para añadir conceptos, primero guarde el expediente y luego podrá editarlo
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
              Crear Expediente
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NuevoExpedientePage