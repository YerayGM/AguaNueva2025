import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExpediente, getExpediente, updateExpediente } from '../../services/expedientes';
import { getMunicipios } from '../../services/municipios';
import { Expediente } from '../../types/Expedientes';
import { Municipio } from '../../types/Municipios';
import Loader from '../../components/Loader';
import FormField from '../../components/FormField';
import useFormValidation from '../../hooks/useFormValidation';
import '@flaticon/flaticon-uicons/css/all/all.css';

const ExpedientesForm: React.FC = () => {
  const { expedienteId } = useParams<{ expedienteId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!expedienteId;
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState<number | null>(null);

  // Inicializar el hook de validación
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    setFormValues,
    setFieldValue
  } = useFormValidation<Partial<Expediente>>(
    {
      EXPEDIENTE: '',
      HOJA: 1,
      DNI: '',
      FECHA: new Date().toISOString().split('T')[0],
      LUGAR: '',
      LOCALIDAD: '',
      ID_MUN: 1,
      CONT_NOMBRE: '',
      CONT_POLIZA: ''
    },
    {
      EXPEDIENTE: { required: true },
      HOJA: { required: true, isNumber: true },
      DNI: { 
        required: true, 
        pattern: /^[0-9]{8}[A-Za-z]$/, 
        message: 'El DNI debe tener 8 números seguidos de una letra' 
      },
      FECHA: { required: true, isDate: true },
      LUGAR: { required: true },
      LOCALIDAD: { required: true },
      ID_MUN: { required: true, isNumber: true },
      CONT_NOMBRE: { required: true },
      CONT_POLIZA: { required: true }
    }
  );

  // Cargar datos para edición y municipios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar municipios
        const municipiosData = await getMunicipios();
        setMunicipios(municipiosData);
        
        // Si estamos en modo edición, cargar expediente
        if (isEditMode && expedienteId) {
          try {
            const data = await getExpediente(expedienteId);
            
            // Format dates for form inputs
            const formattedData = {
              ...data,
              FECHA: data.FECHA ? new Date(data.FECHA).toISOString().split('T')[0] : '',
              FECHA_I: data.FECHA_I ? new Date(data.FECHA_I).toISOString().split('T')[0] : ''
            };
            
            // Asegurarse de que ID_MUN sea un número
            if (formattedData.ID_MUN && typeof formattedData.ID_MUN === 'string') {
              formattedData.ID_MUN = parseInt(formattedData.ID_MUN, 10);
            }
            
            setSelectedMunicipio(formattedData.ID_MUN);
            setFormValues(formattedData);
          } catch (error) {
            console.error("Error al cargar expediente:", error);
            setSubmitError(`Error al cargar los datos del expediente: ${expedienteId}`);
          }
        }
      } catch (err) {
        console.error('Error general:', err);
        setSubmitError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [expedienteId, isEditMode, setFormValues]);

  // Manejar cambio de municipio
  const handleMunicipioChange = (value: string | number) => {
    const municipioId = typeof value === 'string' ? parseInt(value, 10) : value;
    setSelectedMunicipio(municipioId);
    setFieldValue('ID_MUN', municipioId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitLoading(true);
      
      if (isEditMode && expedienteId) {
        await updateExpediente(expedienteId, formData);
      } else {
        await createExpediente(formData);
      }
      
      navigate('/expedientes');
    } catch (err) {
      console.error('Error saving expediente:', err);
      setSubmitError('Error al guardar el expediente');
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-bold text-primary dark:text-blue-400 mb-6 flex items-center">
          <i className={`fi ${isEditMode ? 'fi-rr-file-edit' : 'fi-rr-file-add'} mr-2`}></i>
          {isEditMode ? 'Editar Expediente' : 'Nuevo Expediente'}
        </h1>
        
        {submitError && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 flex items-center">
            <i className="fi fi-rr-exclamation-circle mr-2"></i>
            {submitError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="EXPEDIENTE"
              name="EXPEDIENTE"
              label="Número de Expediente"
              value={formData.EXPEDIENTE || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={isEditMode}
              icon="fi fi-rr-document-signed"
              placeholder="Número de expediente"
              error={errors.EXPEDIENTE}
            />
            
            <FormField
              id="HOJA"
              name="HOJA"
              label="Hoja"
              type="number"
              value={formData.HOJA || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-file"
              error={errors.HOJA}
              min={1}
            />
            
            <FormField
              id="DNI"
              name="DNI"
              label="DNI"
              value={formData.DNI || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-id-badge"
              placeholder="Ej: 12345678A"
              error={errors.DNI}
              pattern="[0-9]{8}[A-Za-z]"
            />
            
            <FormField
              id="FECHA"
              name="FECHA"
              label="Fecha"
              type="date"
              value={formData.FECHA || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-calendar"
              error={errors.FECHA}
            />
            
            <FormField
              id="LUGAR"
              name="LUGAR"
              label="Lugar"
              value={formData.LUGAR || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-map-marker"
              placeholder="Lugar"
              error={errors.LUGAR}
            />
            
            <FormField
              id="ID_MUN"
              name="ID_MUN"
              label="Municipio"
              type="select"
              value={selectedMunicipio || ''}
              customOnChange={handleMunicipioChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-building"
              error={errors.ID_MUN}
              options={municipios.map(m => ({ value: m.ID_MUN, label: m.MUNICIPIO }))}
            />
            
            <FormField
              id="LOCALIDAD"
              name="LOCALIDAD"
              label="Localidad"
              value={formData.LOCALIDAD || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-marker"
              placeholder="Localidad"
              error={errors.LOCALIDAD}
            />
            
            <FormField
              id="CONT_NOMBRE"
              name="CONT_NOMBRE"
              label="Nombre del Contacto"
              value={formData.CONT_NOMBRE || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-user"
              placeholder="Nombre completo del contacto"
              error={errors.CONT_NOMBRE}
            />
            
            <FormField
              id="CONT_POLIZA"
              name="CONT_POLIZA"
              label="Póliza del Contacto"
              value={formData.CONT_POLIZA || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-document"
              placeholder="Número de póliza"
              error={errors.CONT_POLIZA}
            />
            
            <FormField
              id="TECNICO"
              name="TECNICO"
              label="Técnico"
              value={formData.TECNICO || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="fi fi-rr-user-time"
              placeholder="Nombre del técnico"
              error={errors.TECNICO}
            />
          </div>
          
          <FormField
            id="OBSER"
            name="OBSER"
            label="Observaciones"
            type="textarea"
            value={formData.OBSER || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            icon="fi fi-rr-comment"
            placeholder="Observaciones adicionales"
            error={errors.OBSER}
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
              type="submit"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <>
                  <i className="fi fi-rr-spinner animate-spin mr-2"></i> Guardando...
                </>
              ) : isEditMode ? (
                <>
                  <i className="fi fi-rr-disk mr-2"></i> Actualizar
                </>
              ) : (
                <>
                  <i className="fi fi-rr-disk mr-2"></i> Guardar
                </>
              )}
            </button>
            <button
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-300 flex items-center"
              type="button"
              onClick={() => navigate('/expedientes')}
            >
              <i className="fi fi-rr-cross-circle mr-2"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpedientesForm;