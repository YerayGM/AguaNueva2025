import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDatosPersonales, getDatosPersonalesByDni, updateDatosPersonales } from '../../services/datosPersonales';
import { DatosPersonales } from '../../types/DatosPersonales';
import Loader from '../../components/Loader';
import '@flaticon/flaticon-uicons/css/all/all.css';

const DatosPersonalesForm: React.FC = () => {
  const { dni } = useParams<{ dni: string }>();
  const navigate = useNavigate();
  const isEditMode = !!dni;

  const [formData, setFormData] = useState<Partial<DatosPersonales>>({
    DNI: '',
    APELLIDOS: '',
    NOMBREC: '',
    EMAIL: '',
    ACTIVIDADAGROPEC: '',
    ID_MUN: 1
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && dni) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getDatosPersonalesByDni(dni);
          setFormData(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching datos personales:', err);
          setError('Error al cargar los datos personales');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [dni, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'ID_MUN') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode && dni) {
        await updateDatosPersonales(dni, formData);
      } else {
        await createDatosPersonales(formData);
      }
      
      navigate('/datos-personales');
    } catch (err) {
      console.error('Error saving datos personales:', err);
      setError('Error al guardar los datos personales');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-verdeCabildo mb-6 flex items-center">
        <i className={`fi ${isEditMode ? 'fi-rr-user-edit' : 'fi-rr-user-add'} mr-2`}></i>
        {isEditMode ? 'Editar Datos Personales' : 'Nuevo Registro de Datos Personales'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <i className="fi fi-rr-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="DNI">
              <i className="fi fi-rr-id-badge mr-1"></i> DNI*
            </label>
            <input
              className="form-input"
              id="DNI"
              name="DNI"
              type="text"
              value={formData.DNI || ''}
              onChange={handleChange}
              required
              disabled={isEditMode}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="NOMBREC">
              <i className="fi fi-rr-user mr-1"></i> Nombre
            </label>
            <input
              className="form-input"
              id="NOMBREC"
              name="NOMBREC"
              type="text"
              value={formData.NOMBREC || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="APELLIDOS">
              <i className="fi fi-rr-user mr-1"></i> Apellidos*
            </label>
            <input
              className="form-input"
              id="APELLIDOS"
              name="APELLIDOS"
              type="text"
              value={formData.APELLIDOS || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="EMAIL">
              <i className="fi fi-rr-envelope mr-1"></i> Email*
            </label>
            <input
              className="form-input"
              id="EMAIL"
              name="EMAIL"
              type="email"
              value={formData.EMAIL || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="DIRECCION">
              <i className="fi fi-rr-home mr-1"></i> Dirección
            </label>
            <input
              className="form-input"
              id="DIRECCION"
              name="DIRECCION"
              type="text"
              value={formData.DIRECCION || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="LOCALIDAD">
              <i className="fi fi-rr-marker mr-1"></i> Localidad
            </label>
            <input
              className="form-input"
              id="LOCALIDAD"
              name="LOCALIDAD"
              type="text"
              value={formData.LOCALIDAD || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="ID_MUN">
              <i className="fi fi-rr-building mr-1"></i> ID Municipio*
            </label>
            <input
              className="form-input"
              id="ID_MUN"
              name="ID_MUN"
              type="number"
              value={formData.ID_MUN || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="TELEFONO">
              <i className="fi fi-rr-phone-call mr-1"></i> Teléfono
            </label>
            <input
              className="form-input"
              id="TELEFONO"
              name="TELEFONO"
              type="text"
              value={formData.TELEFONO || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="ACTIVIDADAGROPEC">
              <i className="fi fi-rr-tractor mr-1"></i> Actividad Agropecuaria*
            </label>
            <input
              className="form-input"
              id="ACTIVIDADAGROPEC"
              name="ACTIVIDADAGROPEC"
              type="text"
              value={formData.ACTIVIDADAGROPEC || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <button
            className="btn btn-primary flex items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fi fi-rr-spinner animate-spin mr-1"></i> Guardando...
              </>
            ) : isEditMode ? (
              <>
                <i className="fi fi-rr-disk mr-1"></i> Actualizar
              </>
            ) : (
              <>
                <i className="fi fi-rr-disk mr-1"></i> Guardar
              </>
            )}
          </button>
          <button
            className="btn btn-secondary flex items-center"
            type="button"
            onClick={() => navigate('/datos-personales')}
          >
            <i className="fi fi-rr-cross-circle mr-1"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DatosPersonalesForm;