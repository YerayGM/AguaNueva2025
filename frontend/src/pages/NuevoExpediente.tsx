import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Municipio, DatosPersonales } from '../types'
import { createExpediente, getExpedientes } from '../services/expedientesService'
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
  const [codigoExpediente, setCodigoExpediente] = useState('')

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
  
  // Generador de código tipo AGU01299
  const generarCodigoExpediente = (ultimoNumero: number) => {
    const numero = (ultimoNumero + 1).toString().padStart(5, '0')
    return `AGU${numero}`
  }

  // Al montar, obtener el último expediente y generar el nuevo código
  useEffect(() => {
    async function fetchUltimoExpediente() {
      const expedientes = await getExpedientes()
      const maxNum = expedientes
        .map(e => parseInt((e.EXPEDIENTE || '').replace('AGU', ''), 4))
        .filter(n => !isNaN(n))
        .reduce((a, b) => Math.max(a, b), 0)
      setCodigoExpediente(generarCodigoExpediente(maxNum))
    }
    fetchUltimoExpediente()
    loadMunicipios()
    
    // Si hay un DNI en los parámetros de la URL, cargar los datos de esa persona
    if (dniParam) {
      validateDni();
    }
  }, [dniParam, validateDni])
  
  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Crear expediente principal
      const expedienteCreado = await createExpediente({
        DNI: dni,
        HOJA: Number(hoja),
        FECHA: fecha,
        LUGAR: lugar || 'Sin lugar',
        LOCALIDAD: localidad || 'Sin localidad',
        ID_MUN: Number(idMunicipio),
        CONT_NOMBRE: contNombre || 'Sin nombre',
        CONT_POLIZA: contPoliza || 'Sin póliza',
        OBSER: observaciones || 'Sin observaciones',
        TECNICO: tecnico || 'Sin técnico',
        FECHA_I: fechaInforme || fecha,
        DIAS: Number(dias) || 1,
        OB_TEC: obsTecnicas || 'Sin observación técnica',
        TXT_INFORME: textoInforme || 'Sin informe'
      });

      // Redirige a la edición del expediente recién creado
      navigate(`/expedientes/editar/${expedienteCreado.ID}`);
    } catch {
      toast.error('Error al crear expediente y conceptos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-900 p-4 rounded-lg shadow-lg mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Crear Nuevo Expediente
        </h1>
      </div>
      <Card className="border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSubmit}>
          <Tabs
            tabs={[
              {
                id: 'datos-basicos',
                label: 'Datos Básicos'
              },
              {
                id: 'informe-tecnico',
                label: 'Informe Técnico'
              },
              {
                id: 'cuatrimestres',
                label: 'Cuatrimestres'
              }
            ]}
          >
            <div id="datos-basicos" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 transition-all duration-300 stagger-fade">
              <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-2 shadow-inner">
                <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Información del Expediente
                </h3>
              </div>
              <Input
                label="Código de Expediente"
                value={codigoExpediente}
                disabled={true}
                helpText="Se genera automáticamente"
                className="bg-gray-50 dark:bg-gray-800/50 border-2"
              />
              <Input
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Introducir DNI de la persona"
                required
                error={dniError}
                helpText={datosPersona ? `${datosPersona.NOMBREC || ''} ${datosPersona.APELLIDOS || ''}` : ""}
                onBlur={validateDni}
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
                onChange={setIdMunicipio}
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
                label="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Observaciones"
              />
            </div>
            <div id="informe-tecnico" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 stagger-fade">
              <div className="col-span-1 md:col-span-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-2 shadow-inner">
                <h3 className="text-md font-medium text-green-800 dark:text-green-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Información Técnica
                </h3>
              </div>
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
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Observaciones Técnicas
                </label>
                <textarea
                  className="w-full border px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  value={obsTecnicas}
                  onChange={(e) => setObsTecnicas(e.target.value)}
                  placeholder="Observaciones técnicas"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Texto del Informe
                </label>
                <textarea
                  className="w-full border px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  value={textoInforme}
                  onChange={(e) => setTextoInforme(e.target.value)}
                  placeholder="Texto del informe"
                />
              </div>
              <Select
                label="Cuatrimestre"
                value={cuatrimestre}
                onChange={setCuatrimestre}
                options={[
                  { label: '1er Cuatrimestre', value: '1' },
                  { label: '2º Cuatrimestre', value: '2' },
                  { label: '3er Cuatrimestre', value: '3' }
                ]}
              />
            </div>
            <div id="cuatrimestres" className="col-span-1 md:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Concepto</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Multi/Mini</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cant.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Inf.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Desde</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hasta</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cultivo</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-4 px-6" colSpan={7}>
                        <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-lg mb-2">Para añadir conceptos, primero guarde el expediente</p>
                          <p className="text-sm">Luego podrá editarlo y añadir los conceptos necesarios</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs>
          <div className="mt-8 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 px-6"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 shadow-lg hover:shadow-xl"
              icon={
                !isLoading && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )
              }
            >
              Crear Expediente
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NuevoExpedientePage