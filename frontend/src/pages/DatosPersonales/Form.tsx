import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDatosPersonales, getDatosPersonalesByDni, updateDatosPersonales } from '../../services/datosPersonales';
import { getMunicipios } from '../../services/municipios';
import { DatosPersonales } from '../../types/DatosPersonales';
import { Municipio } from '../../types/Municipios';
import Loader from '../../components/Loader';
import FormField from '../../components/FormField';
import useFormValidation from '../../hooks/useFormValidation';
import '@flaticon/flaticon-uicons/css/all/all.css';

const DatosPersonalesForm: React.FC = () => {
  const { dni } = useParams<{ dni: string }>();
  const navigate = useNavigate();
  const isEditMode = !!dni;
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
  } = useFormValidation<Partial<DatosPersonales>>(
    {
      DNI: '',
      APELLIDOS: '',
      NOMBREC: '',
      EMAIL: '',
      ACTIVIDADAGROPEC: '',
      ID_MUN: 1
    },
    {
      DNI: { 
        required: true, 
        pattern: /^[0-9]{8}[A-Za-z]$/, 
        message: 'El DNI debe tener 8 números seguidos de una letra' 
      },
      APELLIDOS: { required: true },
      EMAIL: { required: true, isEmail: true },
      ACTIVIDADAGROPEC: { required: true },
      ID_MUN: { required: true, isNumber: true }
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
        
        // Si estamos en modo edición, cargar datos personales
        if (isEditMode && dni) {
          try {
            const data = await getDatosPersonalesByDni(dni);
            
            // Asegurarse de que ID_MUN sea un número
            if (data.ID_MUN && typeof data.ID_MUN === 'string') {
              data.ID_MUN = parseInt(data.ID_MUN, 10);
            }
            
            setSelectedMunicipio(data.ID_MUN);
            setFormValues(data);
          } catch (error) {
            console.error("Error al cargar datos personales:", error);
            setSubmitError(`Error al cargar los datos del DNI: ${dni}`);
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
  }, [dni, isEditMode, setFormValues]);

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
      
      if (isEditMode && dni) {
        await updateDatosPersonales(dni, formData);
      } else {
        await createDatosPersonales(formData);
      }
      
      navigate('/datos-personales');
    } catch (err) {
      console.error('Error saving datos personales:', err);
      setSubmitError('Error al guardar los datos personales');
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
          <i className={`fi ${isEditMode ? 'fi-rr-user-edit' : 'fi-rr-user-add'} mr-2`}></i>
          {isEditMode ? 'Editar Datos Personales' : 'Nuevo Registro de Datos Personales'}
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
              id="DNI"
              name="DNI"
              label="DNI"
              value={formData.DNI || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={isEditMode}
              icon="fi fi-rr-id-badge"
              placeholder="Ej: 12345678A"
              error={errors.DNI}
              pattern="[0-9]{8}[A-Za-z]"
              autoComplete="off"
            />
            
            <FormField
              id="NOMBREC"
              name="NOMBREC"
              label="Nombre"
              value={formData.NOMBREC || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="fi fi-rr-user"
              placeholder="Nombre completo"
              error={errors.NOMBREC}
            />
            
            <FormField
              id="APELLIDOS"
              name="APELLIDOS"
              label="Apellidos"
              value={formData.APELLIDOS || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-user"
              placeholder="Apellidos"
              error={errors.APELLIDOS}
            />
            
            <FormField
              id="EMAIL"
              name="EMAIL"
              label="Email"
              type="email"
              value={formData.EMAIL || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-envelope"
              placeholder="correo@ejemplo.com"
              error={errors.EMAIL}
            />
            
            <FormField
              id="DIRECCION"
              name="DIRECCION"
              label="Dirección"
              value={formData.DIRECCION || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="fi fi-rr-home"
              placeholder="Dirección completa"
              error={errors.DIRECCION}
            />
            
            <FormField
              id="LOCALIDAD"
              name="LOCALIDAD"
              label="Localidad"
              value={formData.LOCALIDAD || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="fi fi-rr-marker"
              placeholder="Localidad"
              error={errors.LOCALIDAD}
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
              id="TELEFONO"
              name="TELEFONO"
              label="Teléfono"
              value={formData.TELEFONO || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="fi fi-rr-phone-call"
              placeholder="Ej: 666777888"
              error={errors.TELEFONO}
            />
            
            <FormField
              id="ACTIVIDADAGROPEC"
              name="ACTIVIDADAGROPEC"
              label="Actividad Agropecuaria"
              value={formData.ACTIVIDADAGROPEC || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon="fi fi-rr-tractor"
              placeholder="Tipo de actividad"
              error={errors.ACTIVIDADAGROPEC}
            />
          </div>
          
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
              onClick={() => navigate('/datos-personales')}
            >
              <i className="fi fi-rr-cross-circle mr-2"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatosPersonalesForm;