import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Municipio, DatosPersonales } from '../types'
import { createExpediente, getExpedientes } from '../services/expedientesService'
import { getDatosPersonalesByDni } from '../services/datosPersonalesService'
import { getMunicipios } from '../services/municipiosService'
import { getMaterias } from '../services/materiasService'
import type { Materia } from '../types'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { useCallback } from 'react'
import { createDatosExpediente } from '../services/datosExpedientesService'

type Concepto = {
  ID_MATERIA: number | string
  MULTIPLICADOR: number | string
  MINIMO: number | string
  MAXIMO: number | string
  ORDEN: number | string
  CANTIDAD: number | string
  CANTIDAD_I: number | string
  DESDE: string
  HASTA: string
  POLIGONO: number | string
  PARCELA: number | string
  RECINTO: string
  CULTIVO: string
  CUATRIMESTRE: number // Nuevo campo para identificar el cuatrimestre
}

const NuevoExpedientePage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const dniParam = searchParams.get('dni');
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [datosPersona, setDatosPersona] = useState<DatosPersonales | null>(null)
  const [materias, setMaterias] = useState<Materia[]>([])
  const [conceptos, setConceptos] = useState<Concepto[]>([]);

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

  const validateDni = useCallback(async () => {
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
  }, [dni])
  
  // Generador de código tipo AGU01299
  const generarCodigoExpediente = (ultimoNumero: number) => {
    const numero = (ultimoNumero + 1).toString().padStart(5, '0')
    return `AGU${numero}`
  }

  // Cuando abras la pantalla de nuevo expediente, llama a getExpedientes y genera el código
  const fetchUltimoExpediente = async () => {
    try {
      const expedientes = await getExpedientes();
      console.log('Expedientes:', expedientes);

      let ultimoNumero = 0;
      if (Array.isArray(expedientes) && expedientes.length > 0) {
        // Buscar el expediente con el número más alto
        const maxExp = expedientes.reduce((max, exp) => {
          const match = exp.EXPEDIENTE?.match(/\d+$/);
          const num = match ? parseInt(match[0], 10) : 0;
          return num > max ? num : max;
        }, 0);
        ultimoNumero = maxExp;
      }
      setCodigoExpediente(generarCodigoExpediente(ultimoNumero));
    } catch {
      setCodigoExpediente('AGU00001');
    }
  };

  useEffect(() => {
    fetchUltimoExpediente();
    loadMunicipios();
    getMaterias().then(setMaterias);
  }, [location.pathname]);
  
  // Cambiar el estado de conceptos para organizarlos por cuatrimestre
  const [conceptosPorCuatrimestre, setConceptosPorCuatrimestre] = useState<{
    1: Concepto[],
    2: Concepto[],
    3: Concepto[]
  }>({
    1: [],
    2: [],
    3: []
  })
  
  const [cuatrimestreActivo, setCuatrimestreActivo] = useState<1 | 2 | 3>(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (conceptos.length === 0) {
      toast.error('Debes añadir al menos un concepto/cuatrimestre.');
      setIsLoading(false);
      return;
    }
    if (!hoja || isNaN(Number(hoja)) || Number(hoja) < 1) {
      toast.error('El campo HOJA es obligatorio y debe ser un número mayor que 0');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    
    const conceptosLimpios = conceptos
      .filter(c => c.ID_MATERIA && c.CANTIDAD)
      .map(c => ({
        ...c,
        ID_MATERIA: Number(c.ID_MATERIA),
        MULTIPLICADOR: Number(c.MULTIPLICADOR) || 0,
        MINIMO: Number(c.MINIMO) || 0,
        MAXIMO: Number(c.MAXIMO) || 0,
        ORDEN: Number(c.ORDEN) || 0,
        CANTIDAD: Number(c.CANTIDAD) || 0,
        CANTIDAD_I: Number(c.CANTIDAD_I) || 0,
        POLIGONO: Number(c.POLIGONO) || 0,
        PARCELA: Number(c.PARCELA) || 0,
        RECINTO: c.RECINTO || '',
        CULTIVO: c.CULTIVO || '',
        DESDE: c.DESDE || '',
        HASTA: c.HASTA || ''
      }));

    if (conceptosLimpios.length === 0) {
      toast.error('Debes añadir al menos un concepto/cuatrimestre válido.');
      setIsLoading(false);
      return;
    }

    try {
      const expedienteData = {
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
      };

      const expedienteCreado = await createExpediente(expedienteData);

      // Supón que tienes una función createDatosExpediente en tu servicio
      for (const concepto of todosLosConceptos) {
        if (concepto.ID_MATERIA && concepto.CANTIDAD) {
          await createDatosExpediente({
            ...concepto,
            EXPEDIENTE: codigoExpediente,
            HOJA: Number(hoja),
            ID_MATERIA: Number(concepto.ID_MATERIA),
            MULTIPLICADOR: Number(concepto.MULTIPLICADOR) || 0,
            MINIMO: Number(concepto.MINIMO) || 0,
            MAXIMO: Number(concepto.MAXIMO) || 0,
            ORDEN: Number(concepto.ORDEN) || 0,
            CANTIDAD: Number(concepto.CANTIDAD) || 0,
            CANTIDAD_I: Number(concepto.CANTIDAD_I) || 0,
            POLIGONO: Number(concepto.POLIGONO) || 0,
            PARCELA: Number(concepto.PARCELA) || 0,
            RECINTO: concepto.RECINTO || '',
            CULTIVO: concepto.CULTIVO || '',
            DESDE: concepto.DESDE || '',
            HASTA: concepto.HASTA || ''
          })
        }
      }
      
      await fetchUltimoExpediente(); // <-- vuelve a calcular el código
      setConceptos([]); // limpia conceptos si quieres
      // limpia el resto de campos si lo necesitas

      navigate(`/expedientes/editar/${expedienteCreado.ID}`);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error: response may exist in error
        toast.error(error.response?.data?.message || 'Error al crear expediente y conceptos');
      } else {
        toast.error('Error al crear expediente y conceptos');
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Cambiar materia y autocompletar campos relacionados
  const handleMateriaChange = (cuatrimestre: 1 | 2 | 3, idx: number, idMateria: number) => {
    const materia = materias.find(m => m.ID === idMateria);
    setConceptosPorCuatrimestre(prev => ({
      ...prev,
      [cuatrimestre]: prev[cuatrimestre].map((concepto, i) =>
        i === idx ? {
          ...concepto,
          ID_MATERIA: materia?.ID || '',
          MULTIPLICADOR: materia?.MULTIPLICADOR || '',
          MINIMO: materia?.MINIMO || '',
          MAXIMO: materia?.MAXIMO || '',
          ORDEN: materia?.ORDEN || '',
        } : concepto
      )
    }));
  };

  // Cambiar otros campos
  const handleConceptoChange = (cuatrimestre: 1 | 2 | 3, idx: number, field: keyof Concepto, value: string | number) => {
    setConceptosPorCuatrimestre(prev => ({
      ...prev,
      [cuatrimestre]: prev[cuatrimestre].map((concepto, i) =>
        i === idx ? { ...concepto, [field]: value } : concepto
      )
    }));
  };

  // Función para añadir concepto al cuatrimestre actual
  const addConcepto = (cuatrimestre: 1 | 2 | 3) => {
    setConceptosPorCuatrimestre(prev => ({
      ...prev,
      [cuatrimestre]: [...prev[cuatrimestre], {
        ID_MATERIA: '',
        MULTIPLICADOR: '',
        MINIMO: '',
        MAXIMO: '',
        ORDEN: '',
        CANTIDAD: '',
        CANTIDAD_I: '',
        DESDE: '',
        HASTA: '',
        POLIGONO: '',
        PARCELA: '',
        RECINTO: '',
        CULTIVO: '',
        CUATRIMESTRE: cuatrimestre
      }]
    }))
  }

  // Función para eliminar concepto de un cuatrimestre específico
  const removeConcepto = (cuatrimestre: 1 | 2 | 3, idx: number) => {
    setConceptosPorCuatrimestre(prev => ({
      ...prev,
      [cuatrimestre]: prev[cuatrimestre].filter((_, i) => i !== idx)
    }))
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
                label: 'Datos Básicos'
              },
              {
                id: 'informe-tecnico', 
                label: 'Informe Técnico'
              },
              {
                id: 'cuatrimestres',
                label: 'Conceptos por Cuatrimestre'
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

            {/* Pestaña de informe técnico */}
            <div id="informe-tecnico" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 transition-all duration-300 stagger-fade">
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

            {/* Pestaña de cuatrimestres */}
            <div id="cuatrimestres" className="space-y-6">
              {/* Pestañas de cuatrimestres */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {[1, 2, 3].map((cuatrimestre) => (
                    <button
                      key={cuatrimestre}
                      type="button"
                      onClick={() => setCuatrimestreActivo(cuatrimestre as 1 | 2 | 3)}
                      className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                        cuatrimestreActivo === cuatrimestre
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{cuatrimestre}º Cuatrimestre</span>
                        {conceptosPorCuatrimestre[cuatrimestre as 1 | 2 | 3].length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {conceptosPorCuatrimestre[cuatrimestre as 1 | 2 | 3].length}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenido del cuatrimestre activo */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Conceptos del {cuatrimestreActivo}º Cuatrimestre
                  </h3>
                  <Button
                    type="button"
                    onClick={() => addConcepto(cuatrimestreActivo)}
                    variant="primary"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Añadir Concepto</span>
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Concepto</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Multi</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Mini</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Máx</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Cant.</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Inf.</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Desde</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Hasta</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Polígono</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Parcela</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Recinto</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Cultivo</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {conceptosPorCuatrimestre[cuatrimestreActivo].length === 0 ? (
                        <tr>
                          <td className="py-8 px-6 text-center text-gray-400" colSpan={13}>
                            <div className="flex flex-col items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="text-lg mb-2">No hay conceptos en este cuatrimestre</p>
                              <p className="text-sm">Haz clic en <b>Añadir Concepto</b> para agregar uno nuevo</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        conceptosPorCuatrimestre[cuatrimestreActivo].map((concepto, idx) => (
                          <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                            <td className="py-2 px-4">
                              <Select
                                value={concepto.ID_MATERIA || ''}
                                onChange={val => handleMateriaChange(cuatrimestreActivo, idx, Number(val))}
                                options={[
                                  { label: 'Selecciona materia', value: '' },
                                  ...materias.map(m => ({
                                    label: m.MATERIA,
                                    value: m.ID
                                  }))
                                ]}
                                required
                                className="w-44"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.MULTIPLICADOR}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'MULTIPLICADOR', Number(e.target.value))}
                                disabled
                                className="w-16 text-center"
                                placeholder="Multi"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.MINIMO}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'MINIMO', Number(e.target.value))}
                                disabled
                                className="w-16 text-center"
                                placeholder="Mini"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.MAXIMO}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'MAXIMO', Number(e.target.value))}
                                disabled
                                className="w-16 text-center"
                                placeholder="Máx"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.CANTIDAD}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'CANTIDAD', Number(e.target.value))}
                                className="w-16 text-center"
                                placeholder="Cantidad"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.CANTIDAD_I}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'CANTIDAD_I', Number(e.target.value))}
                                className="w-16 text-center"
                                placeholder="Inf."
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="date"
                                value={concepto.DESDE}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'DESDE', e.target.value)}
                                className="w-32 text-center"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="date"
                                value={concepto.HASTA}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'HASTA', e.target.value)}
                                className="w-32 text-center"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.POLIGONO || ''}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'POLIGONO', Number(e.target.value))}
                                className="w-16 text-center"
                                placeholder="Polígono"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                type="number"
                                value={concepto.PARCELA || ''}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'PARCELA', Number(e.target.value))}
                                className="w-16 text-center"
                                placeholder="Parcela"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={concepto.RECINTO || ''}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'RECINTO', e.target.value)}
                                className="w-16 text-center"
                                placeholder="Recinto"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={concepto.CULTIVO}
                                onChange={e => handleConceptoChange(cuatrimestreActivo, idx, 'CULTIVO', e.target.value)}
                                className="w-24 text-center"
                                placeholder="Cultivo"
                              />
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Button
                                type="button"
                                onClick={() => removeConcepto(cuatrimestreActivo, idx)}
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resumen de conceptos por cuatrimestre */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3">Resumen de Conceptos</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((cuatrimestre) => (
                    <div key={cuatrimestre} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {conceptosPorCuatrimestre[cuatrimestre as 1 | 2 | 3].length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {cuatrimestre}º Cuatrimestre
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs>

          {/* Botones de acción */}
          <div className="mt-8 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-800 transition-all duration-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg"
              icon={
                isLoading ? undefined : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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