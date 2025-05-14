import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatosPersonales } from '../../services/datosPersonales';
import { DatosPersonales } from '../../types/DatosPersonales';
import Loader from '../../components/Loader';
import '@flaticon/flaticon-uicons/css/all/all.css';

const DatosPersonalesList = () => {
  const [datosPersonales, setDatosPersonales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDatosPersonales();
        setDatosPersonales(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching datos personales:', err);
        setError('Error al cargar los datos personales');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return datosPersonales;
    
    return [...datosPersonales].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [datosPersonales, sortConfig]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter(dato => 
      dato.DNI.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dato.NOMBREC && dato.NOMBREC.toLowerCase().includes(searchTerm.toLowerCase())) ||
      dato.APELLIDOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dato.LOCALIDAD && dato.LOCALIDAD.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedData, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <h1 className="text-2xl font-bold text-green-700 flex items-center">
                <i className="fi fi-rr-users mr-2"></i> Datos Personales
              </h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fi fi-rr-search absolute left-3 top-2.5 text-gray-400"></i>
                </div>
                <Link 
                  to="/datos-personales/new" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <i className="fi fi-rr-user-add mr-2"></i> Nuevo Registro
                </Link>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700">
                <div className="flex items-center">
                  <i className="fi fi-rr-exclamation text-red-500 mr-2"></i>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Content section */}
          <div className="p-6">
            {datosPersonales.length === 0 ? (
              <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border border-gray-200">
                <i className="fi fi-rr-info-circle text-4xl mb-3 text-gray-400"></i>
                <p className="text-lg">No hay datos personales disponibles.</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border border-gray-200">
                <i className="fi fi-rr-search-minus text-4xl mb-3 text-gray-400"></i>
                <p className="text-lg">No se encontraron resultados para "{searchTerm}"</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('DNI')}
                      >
                        <div className="flex items-center">
                          DNI
                          {sortConfig.key === 'DNI' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('NOMBREC')}
                      >
                        <div className="flex items-center">
                          Nombre
                          {sortConfig.key === 'NOMBREC' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('APELLIDOS')}
                      >
                        <div className="flex items-center">
                          Apellidos
                          {sortConfig.key === 'APELLIDOS' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('LOCALIDAD')}
                      >
                        <div className="flex items-center">
                          Localidad
                          {sortConfig.key === 'LOCALIDAD' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((dato) => (
                      <tr key={dato.DNI} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <i className="fi fi-rr-id-badge text-gray-500 mr-2"></i>
                            {dato.DNI}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {dato.NOMBREC || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {dato.APELLIDOS}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {dato.LOCALIDAD ? (
                            <div className="flex items-center">
                              <i className="fi fi-rr-marker text-gray-500 mr-2"></i>
                              {dato.LOCALIDAD}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-4">
                            <Link 
                              to={`/datos-personales/${dato.DNI}`}
                              className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                            >
                              <i className="fi fi-rr-eye mr-1"></i> Ver
                            </Link>
                            <Link 
                              to={`/datos-personales/edit/${dato.DNI}`}
                              className="text-green-600 hover:text-green-800 flex items-center transition-colors"
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
          
          {/* Footer with pagination could go here */}
          {filteredData.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
              Mostrando {filteredData.length} de {datosPersonales.length} registros
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatosPersonalesList;