import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Expediente, Municipio, DatosExpediente, Materia } from '../types'
import { getExpedienteById } from '../services/expedientesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { updateDatosExpediente, createDatosExpediente, getDatosExpedienteByNumero, deleteDatosExpediente } from '../services/datosExpedientesService'
import { getMaterias } from '../services/materiasService'
import { updateExpediente } from '../services/expedientesService';

const EditarExpedientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [materias, setMaterias] = useState<Materia[]>([]);

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
  
  // Estado para los conceptos asociados al expediente
  const [conceptos, setConceptos] = useState<DatosExpediente[]>([]);
  const [conceptosOriginales, setConceptosOriginales] = useState<DatosExpediente[]>([]);

  // Manejar cambios en los conceptos
  const handleConceptoChange = (
    idx: number,
    field: keyof DatosExpediente,
    value: string | number
  ) => {
    setConceptos(prev =>
      prev.map((concepto, i) =>
        i === idx ? { ...concepto, [field]: value } : concepto
      )
    );
  };

  // Cargar expediente
  const loadExpediente = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!id) return;
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error("ID de expediente inválido");
      }

      const data = await getExpedienteById(numericId.toString());

      // Formatear fechas para inputs tipo date
      if (data.FECHA) {
        try {
          data.FECHA = format(new Date(data.FECHA), 'yyyy-MM-dd');
        } catch (error) {
          console.error('Error formateando FECHA:', error);
        }
      }

      if (data.FECHA_I) {
        try {
          data.FECHA_I = format(new Date(data.FECHA_I), 'yyyy-MM-dd');
        } catch (error) {
          console.error('Error formateando FECHA_I:', error);
        }
      }

      setFormData(data);

      // Determinar cuatrimestre basado en la fecha
      if (data.FECHA) {
        const mes = new Date(data.FECHA).getMonth() + 1; // getMonth() es base-0
        if (mes <= 4) setCuatrimestre("1");
        else if (mes <= 8) setCuatrimestre("2");
        else setCuatrimestre("3");
      }
    } catch (error) {
      toast.error('Error al cargar el expediente');
      console.error('Error al cargar el expediente:', error);
      navigate('/expedientes');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  // Cargar municipios
  const loadMunicipios = useCallback(async () => {
    try {
      const data = await getMunicipios();
      if (Array.isArray(data)) {
        setMunicipios(data);
      } else if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        Array.isArray((data as { data: Municipio[] }).data)
      ) {
        setMunicipios((data as { data: Municipio[] }).data);
      } else {
        console.error('Formato de datos de municipios inesperado:', data);
        setMunicipios([]);
      }
    } catch {
      setMunicipios([]);
    }
  }, []);

  // Cargar materias
  const loadMaterias = useCallback(async () => {
    try {
      const data = await getMaterias();
      if (Array.isArray(data)) {
        setMaterias(data);
      } else if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        Array.isArray((data as { data: Materia[] }).data)
      ) {
        setMaterias((data as { data: Materia[] }).data);
      } else {
        console.error('Formato de datos de materias inesperado:', data);
        setMaterias([]);
      }
    } catch {
      setMaterias([]);
    }
  }, []);

  // Cargar conceptos
  const loadConceptos = useCallback(async () => {
    if (!formData.EXPEDIENTE) return;
    try {
      const data = await getDatosExpedienteByNumero(formData.EXPEDIENTE);
      if (Array.isArray(data)) {
        setConceptos(data);
        setConceptosOriginales(data); // Guarda copia original
      } else if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        Array.isArray((data as { data: DatosExpediente[] }).data)
      ) {
        setConceptos((data as { data: DatosExpediente[] }).data);
        setConceptosOriginales((data as { data: DatosExpediente[] }).data); // Guardar los conceptos originales
      } else {
        setConceptos([]);
        setConceptosOriginales([]); // Limpiar conceptos originales si no hay datos
      }
    } catch {
      setConceptos([]);
      setConceptosOriginales([]); // Limpiar conceptos originales en caso de error
    }
  }, [formData.EXPEDIENTE]);

  useEffect(() => {
    loadMunicipios();
    loadMaterias();
    if (id) {
      loadExpediente();
    }
  }, [id, loadExpediente, loadMunicipios, loadMaterias]);

  useEffect(() => {
    if (formData.EXPEDIENTE) {
      loadConceptos();
    }
  }, [formData.EXPEDIENTE, loadConceptos]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value === '' ? 0 : parseInt(value, 10)) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === '' ? 0 : parseInt(value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Actualiza expediente
      if (formData.ID) {
        const camposValidos = [
          'HOJA', 'DNI', 'FECHA', 'LUGAR', 'LOCALIDAD', 'ID_MUN', 'CONT_NOMBRE', 'CONT_POLIZA',
          'OBSER', 'TECNICO', 'FECHA_I', 'DIAS', 'OB_TEC', 'TXT_INFORME'
        ];
        const expedienteLimpio: Record<string, string | number> = {};
        for (const key of camposValidos) {
          let valor = (formData as Record<string, string | number | null | undefined>)[key];
          if (valor === null || valor === undefined) valor = '';
          expedienteLimpio[key] = valor;
        }
        await updateExpediente(formData.ID.toString(), expedienteLimpio);
      }

      // 2. Elimina los conceptos que estaban y ya no están
      const idsActuales = conceptos.filter(c => c.ID).map(c => c.ID);
      const eliminados = conceptosOriginales.filter(c => c.ID && !idsActuales.includes(c.ID));
      for (const concepto of eliminados) {
        await deleteDatosExpediente(concepto.ID);
      }

      // 3. Actualiza o crea conceptos
      for (const concepto of conceptos) {
        const conceptoLimpio = limpiarConcepto(concepto);
        if (concepto.ID) {
          await updateDatosExpediente(concepto.ID, conceptoLimpio);
        } else {
          await createDatosExpediente({
            ...conceptoLimpio,
            EXPEDIENTE: formData.EXPEDIENTE
          });
        }
      }
      toast.success('Expediente actualizado correctamente');
      navigate('/expedientes');
    } catch (error) {
      toast.error('Error al guardar los cambios');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addConcepto = () =>
    setConceptos(prev => [
      ...prev,
      {
        ID: undefined as unknown as number,
        EXPEDIENTE: formData.EXPEDIENTE || '',
        HOJA: 0,
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
      } as unknown as DatosExpediente,
    ]);

  const removeConcepto = (idx: number) =>
    setConceptos(prev => prev.filter((_, i) => i !== idx));

  function limpiarConcepto(concepto: DatosExpediente) {
    const limpio: Record<string, string | number> = {};
    const camposValidos = [
      'EXPEDIENTE', 'HOJA', 'ORDEN', 'ID_MATERIA', 'MULTIPLICADOR', 'MINIMO', 'MAXIMO',
      'CANTIDAD', 'CANTIDAD_I', 'DESDE', 'HASTA', 'POLIGONO', 'PARCELA', 'RECINTO', 'CULTIVO'
    ];
    for (const key of camposValidos) {
      let valor = (concepto as unknown as Record<string, string | number | null | undefined>)[key];
      if (valor === null || valor === undefined) valor = '';
      limpio[key] = valor;
    }
    return limpio;
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
    );
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
            <div id="materias" className="col-span-1 md:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">Conceptos del Expediente</h3>
                  <Button
                    type="button"
                    onClick={addConcepto}
                    variant="primary"
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Añadir concepto</span>
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Concepto</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Multi</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Mini</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Máx</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Cant.</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Inf.</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Desde</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Hasta</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Polígono</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Parcela</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Recinto</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Cultivo</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {conceptos.length === 0 ? (
                        <tr>
                          <td className="py-8 px-6 text-center text-gray-400" colSpan={13}>
                            <div className="flex flex-col items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="text-lg mb-2">No hay conceptos añadidos</p>
                              <p className="text-sm">Haz clic en <b>Añadir concepto</b> para agregar uno nuevo</p>
                            </div>
                          </td>
                        </tr>
                      ) : conceptos.map((concepto, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition">
                          <td className="py-2 px-4">
                            <Select
                              value={concepto.ID_MATERIA?.toString() || ''}
                              onChange={val => {
                                const materiaId = Number(val);
                                const materia = materias.find(m => m.ID === materiaId);
                                
                                handleConceptoChange(idx, 'ID_MATERIA', val);
                                
                                if (materia) {
                                  handleConceptoChange(idx, 'MULTIPLICADOR', materia.MULTIPLICADOR);
                                  handleConceptoChange(idx, 'MINIMO', materia.MINIMO);
                                  handleConceptoChange(idx, 'MAXIMO', materia.MAXIMO);
                                  handleConceptoChange(idx, 'ORDEN', materia.ORDEN);
                                }
                              }}
                              options={[
                                { label: 'Selecciona materia', value: '' },
                                ...materias.map(m => ({
                                  label: m.MATERIA,
                                  value: m.ID.toString()
                                }))
                              ]}
                              required
                              className="w-44"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.MULTIPLICADOR || ''}
                              onChange={e => handleConceptoChange(idx, 'MULTIPLICADOR', e.target.value)}
                              disabled
                              className="w-16 text-center"
                              placeholder="Multi"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.MINIMO || ''}
                              onChange={e => handleConceptoChange(idx, 'MINIMO', e.target.value)}
                              disabled
                              className="w-16 text-center"
                              placeholder="Mini"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.MAXIMO || ''}
                              onChange={e => handleConceptoChange(idx, 'MAXIMO', e.target.value)}
                              disabled
                              className="w-16 text-center"
                              placeholder="Máx"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.CANTIDAD || ''}
                              onChange={e => handleConceptoChange(idx, 'CANTIDAD', e.target.value)}
                              className="w-16 text-center"
                              placeholder="Cantidad"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.CANTIDAD_I || ''}
                              onChange={e => handleConceptoChange(idx, 'CANTIDAD_I', e.target.value)}
                              className="w-16 text-center"
                              placeholder="Inf."
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="date"
                              value={typeof concepto.DESDE === 'string' ? concepto.DESDE : concepto.DESDE?.toString() || ''}
                              onChange={e => handleConceptoChange(idx, 'DESDE', e.target.value)}
                              className="w-32 text-center"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="date"
                              value={typeof concepto.HASTA === 'string' ? concepto.HASTA : concepto.HASTA?.toString() || ''}
                              onChange={e => handleConceptoChange(idx, 'HASTA', e.target.value)}
                              className="w-32 text-center"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.POLIGONO || ''}
                              onChange={e => handleConceptoChange(idx, 'POLIGONO', e.target.value)}
                              className="w-16 text-center"
                              placeholder="Polígono"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              value={concepto.PARCELA || ''}
                              onChange={e => handleConceptoChange(idx, 'PARCELA', e.target.value)}
                              className="w-16 text-center"
                              placeholder="Parcela"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={concepto.RECINTO || ''}
                              onChange={e => handleConceptoChange(idx, 'RECINTO', e.target.value)}
                              className="w-16 text-center"
                              placeholder="Recinto"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={concepto.CULTIVO || ''}
                              onChange={e => handleConceptoChange(idx, 'CULTIVO', e.target.value)}
                              className="w-24 text-center"
                              placeholder="Cultivo"
                            />
                          </td>
                          <td className="py-2 px-2 text-center">
                            <Button
                              type="button"
                              onClick={() => removeConcepto(idx)}
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Tabs>
          {/* Botón de guardar cambios */}
          <div className="mt-8 flex justify-end">
            <Button 
              type="submit" 
              className="px-6 py-2 text-base bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Cambios
                </span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditarExpedientePage;