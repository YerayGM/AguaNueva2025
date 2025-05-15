import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExpedientes } from '../../services/expedientes';
import { getMunicipios } from '../../services/municipios';
import { Expediente } from '../../types/Expedientes';
import { Municipio } from '../../types/Municipios';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import '@flaticon/flaticon-uicons/css/all/all.css';

const ExpedientesList: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Expediente | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Cargar expedientes y municipios en paralelo
        const [expedientesResult, municipiosResult] = await Promise.all([
          getExpedientes(),
          getMunicipios()
        ]);
        
        setExpedientes(expedientesResult);
        setMunicipios(municipiosResult);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del municipio por ID
  const getMunicipioNombre = (id: number): string => {
    const municipio = municipios.find(m => m.ID_MUN === id);
    return municipio ? municipio.MUNICIPIO : 'Desconocido';
  };

  const handleSort = (key: keyof Expediente) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return expedientes;
    
    return [...expedientes].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [expedientes, sortConfig]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter(exp => {
      const municipioNombre = getMunicipioNombre(exp.ID_MUN).toLowerCase();
      
      return exp.EXPEDIENTE.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.DNI.toLowerCase().includes(searchTerm.toLowerCase()) ||
        municipioNombre.includes(searchTerm.toLowerCase());
    });
  }, [sortedData, searchTerm, municipios]);

  // Calcular datos paginados
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll al inicio de la tabla
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-blue-500 bg-opacity-20">
        <div className="backdrop-blur-md bg-white bg-opacity-80 p-8 rounded-xl shadow-xl animate-fade-in-down">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {/* Header section */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <h1 className="text-2xl font-bold text-primary flex items-center">
                <i className="fi fi-rr-document mr-2"></i> 
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Expedientes
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por expediente, DNI o municipio..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary transition-all duration-300 w-full"
                    style={{ borderColor: 'var(--card-border)' }}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Resetear a primera página al buscar
                    }}
                  />
                  <i className="fi fi-rr-search absolute left-3 top-2.5" style={{ color: 'var(--text-muted)' }}></i>
                </div>
                <Link 
                  to="/expedientes/new" 
                  className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center group"
                >
                  <i className="fi fi-rr-file-add mr-2 group-hover:scale-110 transition-all duration-300"></i> Nuevo Expediente
                </Link>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 animate-fade-in">
                <div className="flex items-center">
                  <i className="fi fi-rr-exclamation text-red-500 mr-2"></i>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Content section */}
          <div className="p-6">
            {expedientes.length === 0 ? (
              <div className="text-center p-8 rounded-lg border animate-fade-in-down" style={{ backgroundColor: 'var(--info-section-bg-from)', borderColor: 'var(--info-border)', color: 'var(--text-secondary)' }}>
                <i className="fi fi-rr-info-circle text-4xl mb-3" style={{ color: 'var(--text-muted)' }}></i>
                <p className="text-lg">No hay expedientes disponibles.</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center p-8 rounded-lg border animate-fade-in-down" style={{ backgroundColor: 'var(--info-section-bg-from)', borderColor: 'var(--info-border)', color: 'var(--text-secondary)' }}>
                <i className="fi fi-rr-search-minus text-4xl mb-3" style={{ color: 'var(--text-muted)' }}></i>
                <p className="text-lg">No se encontraron resultados para "{searchTerm}"</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-inner animate-fade-in">
                <table className="min-w-full divide-y" style={{ borderColor: 'var(--card-border)', divideColor: 'var(--card-border)' }}>
                  <thead style={{ backgroundColor: 'var(--info-section-bg-from)' }}>
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => handleSort('EXPEDIENTE')}
                      >
                        <div className="flex items-center">
                          Expediente
                          {sortConfig.key === 'EXPEDIENTE' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition duration-300"
                        style={{ color: 'var(--text-secondary)' }}
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
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => handleSort('FECHA')}
                      >
                        <div className="flex items-center">
                          Fecha
                          {sortConfig.key === 'FECHA' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => handleSort('ID_MUN')}
                      >
                        <div className="flex items-center">
                          Municipio
                          {sortConfig.key === 'ID_MUN' && (
                            <i className={`fi fi-rr-${sortConfig.direction === 'ascending' ? 'angle-small-up' : 'angle-small-down'} ml-1`}></i>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ backgroundColor: 'var(--card-bg)', divideColor: 'var(--card-border)' }}>
                    {paginatedData.map((expediente) => (
                      <tr key={expediente.EXPEDIENTE} className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                          <div className="flex items-center">
                            <i className="fi fi-rr-document-signed mr-2" style={{ color: 'var(--text-muted)' }}></i>
                            {expediente.EXPEDIENTE}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-color)' }}>
                          <div className="flex items-center">
                            <i className="fi fi-rr-id-badge mr-2" style={{ color: 'var(--text-muted)' }}></i>
                            {expediente.DNI}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-color)' }}>
                          <div className="flex items-center">
                            <i className="fi fi-rr-calendar mr-2" style={{ color: 'var(--text-muted)' }}></i>
                            {new Date(expediente.FECHA).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-color)' }}>
                          <div className="flex items-center">
                            <i className="fi fi-rr-building mr-2" style={{ color: 'var(--text-muted)' }}></i>
                            {getMunicipioNombre(expediente.ID_MUN)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-4">
                            <Link 
                              to={`/expedientes/${expediente.EXPEDIENTE}`}
                              className="text-primary hover:text-primary-hover flex items-center transition-colors duration-300 group"
                            >
                              <i className="fi fi-rr-eye mr-1 group-hover:scale-110 transition-all duration-300"></i> Ver
                            </Link>
                            <Link 
                              to={`/expedientes/edit/${expediente.EXPEDIENTE}`}
                              className="text-accent hover:text-accent-hover flex items-center transition-colors duration-300 group"
                            >
                              <i className="fi fi-rr-edit mr-1 group-hover:scale-110 transition-all duration-300"></i> Editar
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Paginación */}
            {filteredData.length > 0 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          
          {/* Footer */}
          {filteredData.length > 0 && (
          <div className="px-6 py-4 border-t text-sm" style={{ backgroundColor: 'var(--info-section-bg-from)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
            <div className="flex items-center">
              <i className="fi fi-rr-list-check mr-2"></i>
              Mostrando {paginatedData.length} de {filteredData.length} registros (página {currentPage} de {totalPages})
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpedientesList;