import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Tabs from '../components/ui/Tabs'
import type { Expediente, Municipio, DatosExpediente, Materia } from '../types'
import { getExpedienteById, updateExpediente } from '../services/expedientesService'
import { getMunicipios } from '../services/municipiosService'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { updateDatosExpediente, createDatosExpediente, getDatosExpedienteByNumero } from '../services/datosExpedientesService'
import { getMaterias } from '../services/materiasService' // Debes tener este servicio

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
      } else {
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
      setConceptos(Array.isArray(data) ? data : []);
    } catch (error) {
      // @ts-expect-error: error may not have response property
      if (error?.response && error.response.status === 404) {
        setConceptos([]);
      } else {
        toast.error('Error al cargar conceptos');
        setConceptos([]);
      }
    }
  }, [formData.EXPEDIENTE]);

  useEffect(() => {
    loadMunicipios();
    loadMaterias();
    if (id) {
      loadExpediente();
    }
    // eslint-disable-next-line
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
      // 1. Actualizar expediente principal
      if (!id) throw new Error('ID de expediente no definido');
      await updateExpediente(id as string, {
        DNI: formData.DNI,
        HOJA: Number(formData.HOJA),
        FECHA: formData.FECHA,
        LUGAR: formData.LUGAR,
        LOCALIDAD: formData.LOCALIDAD,
        ID_MUN: Number(formData.ID_MUN),
        CONT_NOMBRE: formData.CONT_NOMBRE,
        CONT_POLIZA: formData.CONT_POLIZA,
        OBSER: formData.OBSER,
        TECNICO: formData.TECNICO,
        FECHA_I: formData.FECHA_I,
        DIAS: Number(formData.DIAS),
        OB_TEC: formData.OB_TEC,
        TXT_INFORME: formData.TXT_INFORME
      });

      // 2. Actualizar o crear conceptos/cuatrimestres asociados
      for (const concepto of conceptos) {
        if (concepto.ID) {
          await updateDatosExpediente(concepto.ID, concepto);
        } else {
          await createDatosExpediente({
            ...concepto,
            EXPEDIENTE: formData.EXPEDIENTE
          });
        }
      }

      toast.success('Expediente y conceptos actualizados correctamente');
      navigate(`/expedientes/${id}`);
    } catch {
      toast.error('Error al actualizar expediente y conceptos');
    } finally {
      setIsLoading(false);
    }
  };


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

  const handleCancel = () => {
    navigate('/expedientes');
  };

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
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Conceptos del Expediente</h3>
              {/* Aquí puedes añadir un botón para añadir conceptos si implementas la función */}
              {/* <Button onClick={() => setShowAddConcepto(true)}>
                Añadir Concepto/Materia
              </Button> */}
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Multi</th>
                    <th>Mini.</th>
                    <th>Cant.</th>
                    <th>Inf.</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>PO</th>
                    <th>PA</th>
                    <th>RC</th>
                    <th>Cultivo</th>
                  </tr>
                </thead>
                <tbody>
                  {conceptos.map((concepto: DatosExpediente, idx: number) => (
                    <tr key={concepto.ID || idx}>
                      <td>
                        {materias.find((m: Materia) => m.ID === concepto.ID_MATERIA)?.TIPO} - {materias.find((m: Materia) => m.ID === concepto.ID_MATERIA)?.MATERIA}
                      </td>
                      <td>{concepto.MULTIPLICADOR}</td>
                      <td>{concepto.MINIMO}</td>
                      <td>{concepto.CANTIDAD}</td>
                      <td>{concepto.CANTIDAD_I}</td>
                      <td>{concepto.DESDE ? new Date(concepto.DESDE).toLocaleDateString() : ''}</td>
                      <td>{concepto.HASTA ? new Date(concepto.HASTA).toLocaleDateString() : ''}</td>
                      <td>{concepto.POLIGONO}</td>
                      <td>{concepto.PARCELA}</td>
                      <td>{concepto.RECINTO}</td>
                      <td>{concepto.CULTIVO}</td>
                    </tr>
                  ))}
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
  );
};

export default EditarExpedientePage;