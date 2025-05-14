import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExpediente, getExpediente, updateExpediente } from '../../services/expedientes';
import { Expediente } from '../../types/Expedientes';
import Loader from '../../components/Loader';
import '@flaticon/flaticon-uicons/css/all/all.css';

const ExpedientesForm: React.FC = () => {
  const { expedienteId } = useParams<{ expedienteId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!expedienteId;

  const [formData, setFormData] = useState<Partial<Expediente>>({
    EXPEDIENTE: '',
    HOJA: 1,
    DNI: '',
    FECHA: new Date().toISOString().split('T')[0],
    LUGAR: '',
    LOCALIDAD: '',
    ID_MUN: 1,
    CONT_NOMBRE: '',
    CONT_POLIZA: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && expedienteId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getExpediente(expedienteId);
          
          // Format dates for form inputs
          const formattedData = {
            ...data,
            FECHA: data.FECHA ? new Date(data.FECHA).toISOString().split('T')[0] : '',
            FECHA_I: data.FECHA_I ? new Date(data.FECHA_I).toISOString().split('T')[0] : ''
          };
          
          setFormData(formattedData);
          setError(null);
        } catch (err) {
          console.error('Error fetching expediente:', err);
          setError('Error al cargar el expediente');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [expedienteId, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Convert numeric fields
    if (['HOJA', 'ID_MUN', 'DIAS'].includes(name)) {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0
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
      
      if (isEditMode && expedienteId) {
        await updateExpediente(expedienteId, formData);
      } else {
        await createExpediente(formData);
      }
      
      navigate('/expedientes');
    } catch (err) {
      console.error('Error saving expediente:', err);
      setError('Error al guardar el expediente');
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
        <i className={`fi ${isEditMode ? 'fi-rr-file-edit' : 'fi-rr-file-add'} mr-2`}></i>
        {isEditMode ? 'Editar Expediente' : 'Nuevo Expediente'}
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
            <label className="form-label flex items-center" htmlFor="EXPEDIENTE">
              <i className="fi fi-rr-document-signed mr-1"></i> Número de Expediente*
            </label>
            <input
              className="form-input"
              id="EXPEDIENTE"
              name="EXPEDIENTE"
              type="text"
              value={formData.EXPEDIENTE || ''}
              onChange={handleChange}
              required
              disabled={isEditMode}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="HOJA">
              <i className="fi fi-rr-file mr-1"></i> Hoja*
            </label>
            <input
              className="form-input"
              id="HOJA"
              name="HOJA"
              type="number"
              value={formData.HOJA || 0}
              onChange={handleChange}
              required
            />
          </div>
          
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
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="FECHA">
              <i className="fi fi-rr-calendar mr-1"></i> Fecha*
            </label>
            <input
              className="form-input"
              id="FECHA"
              name="FECHA"
              type="date"
              value={formData.FECHA || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="LUGAR">
              <i className="fi fi-rr-map-marker mr-1"></i> Lugar*
            </label>
            <input
              className="form-input"
              id="LUGAR"
              name="LUGAR"
              type="text"
              value={formData.LUGAR || ''}
              onChange={handleChange}
              required
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
              value={formData.ID_MUN || 0}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="LOCALIDAD">
              <i className="fi fi-rr-marker mr-1"></i> Localidad*
            </label>
            <input
              className="form-input"
              id="LOCALIDAD"
              name="LOCALIDAD"
              type="text"
              value={formData.LOCALIDAD || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="CONT_NOMBRE">
              <i className="fi fi-rr-user mr-1"></i> Nombre del Contacto*
            </label>
            <input
              className="form-input"
              id="CONT_NOMBRE"
              name="CONT_NOMBRE"
              type="text"
              value={formData.CONT_NOMBRE || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="CONT_POLIZA">
              <i className="fi fi-rr-document mr-1"></i> Póliza del Contacto*
            </label>
            <input
              className="form-input"
              id="CONT_POLIZA"
              name="CONT_POLIZA"
              type="text"
              value={formData.CONT_POLIZA || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center" htmlFor="TECNICO">
              <i className="fi fi-rr-user-time mr-1"></i> Técnico
            </label>
            <input
              className="form-input"
              id="TECNICO"
              name="TECNICO"
              type="text"
              value={formData.TECNICO || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label flex items-center" htmlFor="OBSER">
            <i className="fi fi-rr-comment mr-1"></i> Observaciones
          </label>
          <textarea
            className="form-input"
            id="OBSER"
            name="OBSER"
            rows={3}
            value={formData.OBSER || ''}
            onChange={handleChange}
          />
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
            onClick={() => navigate('/expedientes')}
          >
            <i className="fi fi-rr-cross-circle mr-1"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpedientesForm;