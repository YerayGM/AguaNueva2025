import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExpedientes } from '../../services/expedientes';
import { Expediente } from '../../types/Expedientes';
import Loader from '../../components/Loader';
import '@flaticon/flaticon-uicons/css/all/all.css';

const ExpedientesList: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getExpedientes();
        setExpedientes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching expedientes:', err);
        setError('Error al cargar los expedientes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <i className="fi fi-rr-exclamation mr-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-verdeCabildo flex items-center">
          <i className="fi fi-rr-document mr-2"></i> Expedientes
        </h1>
        <Link 
          to="/expedientes/new" 
          className="btn btn-primary flex items-center"
        >
          <i className="fi fi-rr-file-add mr-1"></i> Nuevo Expediente
        </Link>
      </div>

      {expedientes.length === 0 ? (
        <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg">
          <i className="fi fi-rr-info-circle text-3xl mb-2 text-gray-400"></i>
          <p>No hay expedientes disponibles.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table-styled">
            <thead>
              <tr>
                <th>Expediente</th>
                <th>DNI</th>
                <th>Fecha</th>
                <th>Localidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expedientes.map((expediente) => (
                <tr key={expediente.EXPEDIENTE}>
                  <td><i className="fi fi-rr-document-signed mr-1"></i> {expediente.EXPEDIENTE}</td>
                  <td><i className="fi fi-rr-id-badge mr-1"></i> {expediente.DNI}</td>
                  <td>
                    <i className="fi fi-rr-calendar mr-1"></i>
                    {new Date(expediente.FECHA).toLocaleDateString()}
                  </td>
                  <td>
                    <i className="fi fi-rr-marker mr-1"></i> {expediente.LOCALIDAD}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/expedientes/${expediente.EXPEDIENTE}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <i className="fi fi-rr-eye mr-1"></i> Ver
                      </Link>
                      <Link 
                        to={`/expedientes/edit/${expediente.EXPEDIENTE}`}
                        className="text-verdeCabildo hover:text-verdeCabildo-hover flex items-center"
                      >
                        <i className="fi fi-rr-edit mr-1"></i> Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpedientesList;