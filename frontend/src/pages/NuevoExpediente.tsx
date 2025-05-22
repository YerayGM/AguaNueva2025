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
  }, [dniParam])
  
  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Crear expediente principal
      const expedienteCreado = await createExpediente({
        EXPEDIENTE: codigoExpediente,
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

      // Aquí puedes mostrar el código generado:
      toast.success(`Expediente creado: ${expedienteCreado.EXPEDIENTE}`);
      navigate('/expedientes');
    } catch (error) {
      toast.error('Error al crear expediente y conceptos');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate(-1)
  }
  
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
                label: 'Datos Básicos',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              { 
                id: 'informe-tecnico', 
                label: 'Informe Técnico',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              },
              { 
                id: 'cuatrimestres', 
                label: 'Cuatrimestres',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              }
            ]}
          >
            {/* Pestaña de datos básicos */}
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
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
              />
              
              <Input
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Introducir DNI de la persona"
                required
                error={dniError}
                helpText={datosPersona ? `${datosPersona.NOMBREC || ''} ${datosPersona.APELLIDOS || ''}` : ""}
                onBlur={() => validateDni()}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                }
              />
              
              <Input
                label="Hoja"
                type="number"
                value={hoja}
                onChange={(e) => setHoja(e.target.value)}
                min="1"
                required
                helpText="Número de hoja del expediente"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
              
              <Input
                label="Fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />

              <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4 mb-2 shadow-inner">
                <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ubicación
                </h3>
              </div>
              
              <Input
                label="Lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                placeholder="Lugar"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
              
              <Input
                label="Localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                placeholder="Localidad"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
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
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                }
              />

              <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4 mb-2 shadow-inner">
                <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Información de Contratación
                </h3>
              </div>
              
              <Input
                label="Contador a Nombre de"
                value={contNombre}
                onChange={(e) => setContNombre(e.target.value)}
                placeholder="Nombre en el contador"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              
              <Input
                label="Nº Póliza"
                value={contPoliza}
                onChange={(e) => setContPoliza(e.target.value)}
                placeholder="Número de póliza"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Observaciones
                </label>
                <textarea
                  className="w-full border px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones generales"
                  rows={3}
                />
              </div>
            </div>
            
            {/* Pestaña de informe técnico */}
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
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                }
              />
              
              <Input
                label="Fecha de Informe"
                type="date"
                value={fechaInforme}
                onChange={(e) => setFechaInforme(e.target.value)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
              
              <Input
                label="Días"
                type="number"
                value={dias}
                onChange={(e) => setDias(e.target.value)}
                min="0"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
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
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              />
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
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
                  rows={3}
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Texto del Informe
                </label>
                <textarea
                  className="w-full border px-3 py-2 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  value={textoInforme}
                  onChange={(e) => setTextoInforme(e.target.value)}
                  placeholder="Texto del informe técnico"
                  rows={3}
                />
              </div>
            </div>
            
            {/* Pestaña de cuatrimestres */}
            <div id="cuatrimestres" className="space-y-6 p-1 animate-fadeIn">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-4 shadow-inner">
                <h3 className="text-md font-medium text-amber-800 dark:text-amber-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Seleccione un Cuatrimestre
                </h3>
                
                <div className="flex flex-wrap mb-4 rounded-md overflow-hidden border border-amber-200 dark:border-amber-800">
                  <button
                    type="button"
                    className={`py-3 px-6 font-medium transition-all duration-200 flex items-center ${cuatrimestre === '1' 
                      ? 'bg-amber-500 text-white shadow-md' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30'}`}
                    onClick={() => setCuatrimestre('1')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    1er Cuatrimestre
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-6 font-medium transition-all duration-200 flex items-center ${cuatrimestre === '2' 
                      ? 'bg-amber-500 text-white shadow-md' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30'}`}
                    onClick={() => setCuatrimestre('2')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    2º Cuatrimestre
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-6 font-medium transition-all duration-200 flex items-center ${cuatrimestre === '3' 
                      ? 'bg-amber-500 text-white shadow-md' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30'}`}
                    onClick={() => setCuatrimestre('3')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    3er Cuatrimestre
                  </button>
                </div>
              </div>
              
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
  )
}

export default NuevoExpedientePage