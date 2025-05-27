import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';
import { getDatosPersonalesByDni } from '../services/datosPersonalesService';
import { getExpedientesByDni } from '../services/expedientesService';
import type { DatosPersonales, Expediente } from '../types';

const VerDatosPersonalesPage: React.FC = () => {
  const { dni } = useParams<{ dni: string }>();
  const navigate = useNavigate();
  const [datos, setDatos] = useState<DatosPersonales | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [isLoadingExpedientes] = useState(false);
  
  useEffect(() => {
    const fetchDatos = async () => {
      if (!dni) {
        setIsLoading(false);
        toast.error('DNI no especificado');
        navigate('/datos-personales');
        return;
      }
      setIsLoading(true);
      try {
        // Obtener datos personales
        const datosPersonales = await getDatosPersonalesByDni(dni);
        setDatos(datosPersonales);
        
        // Obtener expedientes asociados - ahora con manejo de errores mejorado
        try {
          const expedientesData = await getExpedientesByDni(dni);
          setExpedientes(expedientesData);
        } catch {
          console.log('No se encontraron expedientes asociados al DNI:', dni);
          // No mostrar error, simplemente establecer un array vacío
          setExpedientes([]);
        }
      } catch (error) {
        console.error('Error al cargar datos personales:', error);
        toast.error('Error al cargar datos personales');
        navigate('/datos-personales');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDatos();
  }, [dni, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-20 w-20 bg-blue-700/30 rounded-full flex items-center justify-center mb-4">
            <svg className="h-10 w-10 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-blue-400 animate-pulse">Cargando datos personales...</p>
        </div>
      </div>
    );
  }
  
  if (!datos) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
          </svg>
          <p className="mt-4 text-xl text-gray-400">No se encontró la información solicitada</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => navigate('/datos-personales')}
          >
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 mb-10 fade-in">
      {/* Encabezado y barra de navegación */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
            <Link to="/datos-personales" className="hover:text-blue-400 transition-colors">
              Datos Personales
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-200">{datos.DNI}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            {datos.NOMBREC} {datos.APELLIDOS}
          </h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate('/datos-personales')}
            className="hover:bg-gray-800 transition-all duration-300"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
            }
          >
            Volver
          </Button>
          <Link to={`/datos-personales/editar/${dni}`}>
            <Button
              variant="primary"
              className="bg-blue-700 hover:bg-blue-600 transition-all duration-300"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              }
            >
              Editar
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Resumen y estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700/50">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-800 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-300">Total Expedientes</p>
              <p className="text-2xl font-bold text-white">{expedientes.length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Información personal */}
      <Card 
        title={
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Información Personal</span>
          </div>
        }
        className="border-gray-800 hover:border-blue-900/30 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">DNI/NIE</p>
            <p className="text-lg font-medium text-white">{datos.DNI}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Nombre</p>
            <p className="text-lg font-medium text-white">{datos.NOMBREC}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Apellidos</p>
            <p className="text-lg font-medium text-white">{datos.APELLIDOS}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Fecha de Nacimiento</p>
            <p className="text-lg font-medium text-white">{datos.FECHANACIMIENTO ? new Date(datos.FECHANACIMIENTO).toLocaleDateString('es-ES') : 'No disponible'}</p>
          </div>
        </div>
      </Card>
      
      {/* Información de contacto */}
      <Card 
        title={
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Información de Contacto</span>
          </div>
        }
        className="border-gray-800 hover:border-blue-900/30 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Teléfono</p>
            <p className="text-lg font-medium text-white">{datos.TELEFONO || 'No disponible'}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Email</p>
            <div className="flex items-center">
              <p className="text-lg font-medium text-white">{datos.EMAIL || 'No disponible'}</p>
              {datos.EMAIL && (
                <a 
                  href={`mailto:${datos.EMAIL}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-400 hover:text-blue-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Dirección</p>
            <p className="text-lg font-medium text-white">{datos.DIRECCION || 'No disponible'}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Localidad</p>
            <p className="text-lg font-medium text-white">{datos.LOCALIDAD || 'No disponible'}</p>
          </div>
        </div>
      </Card>
      
      {/* Información adicional */}
      <Card 
        title={
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Información Adicional</span>
          </div>
        }
        className="border-gray-800 hover:border-blue-900/30 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Actividad Agropecuaria</p>
            <p className="text-lg font-medium text-white">{datos.ACTIVIDADAGROPEC || 'No disponible'}</p>
          </div>
          
          <div className="space-y-1 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            <p className="text-sm text-gray-400">Tipo de Persona</p>
            <p className="text-lg font-medium text-white">
              {datos.PER_FIS ? 'Física' : ''}
              {datos.PER_JUR ? 'Jurídica' : ''}
              {!datos.PER_FIS && !datos.PER_JUR ? 'No especificado' : ''}
            </p>
          </div>
        </div>
      </Card>
      
      {/* Sección de expedientes */}
      <Card className="border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Expedientes Asociados
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {expedientes.length} expediente{expedientes.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {isLoadingExpedientes ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-emerald-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Cargando expedientes...</p>
            </div>
          </div>
        ) : expedientes.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">No hay expedientes</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Esta persona no tiene expedientes asociados</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {expedientes.map((expediente) => (
              <div 
                key={expediente.ID}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => navigate(`/expedientes/${expediente.ID}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Expediente: {expediente.EXPEDIENTE}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Fecha: {expediente.FECHA ? new Date(expediente.FECHA).toLocaleDateString() : 'Sin fecha'}
                    </p>
                    {expediente.LUGAR && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lugar: {expediente.LUGAR}
                      </p>
                    )}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Acciones finales */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            className="hover:bg-gray-800 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Volver</span>
            </span>
          </Button>
          <Link to={`/datos-personales/editar/${dni}`}>
            <Button
              variant="primary"
              className="bg-blue-700 hover:bg-blue-600 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Editar información</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerDatosPersonalesPage