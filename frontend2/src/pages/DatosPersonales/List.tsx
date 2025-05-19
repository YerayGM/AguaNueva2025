import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Ensure "react-hot-toast" is installed
import type { DatosPersonales } from '../../types/DatosPersonales';
import { getDatosPersonales, deleteDatosPersonales } from '../../services/datosPersonalesService'; // Ensure the module exists
import { getMunicipios } from '../../services/municipios';
import type { Municipio } from '../../types/Municipios'; // Use "type" for type-only imports
import DataTable from '../../components/DataTable';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal'; // Ensure the module exists

const DatosPersonalesList: React.FC = () => {
  const navigate = useNavigate();
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Remove if unused
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof DatosPersonales | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal de confirmación de eliminación
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    dni: '',
    nombre: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Cargar datos personales y municipios en paralelo
        const [datosResult, municipiosResult] = await Promise.all([
          getDatosPersonales(),
          getMunicipios()
        ]);
        
        setDatosPersonales(datosResult);
        setMunicipios(municipiosResult);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
        toast.error('Error al cargar los datos');
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

  const handleSort = (key: keyof DatosPersonales) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const openDeleteModal = (dni: string, nombre: string) => {
    setDeleteModal({
      isOpen: true,
      dni,
      nombre: nombre || dni
    });
  };

  const handleDelete = async () => {
    try {
      await deleteDatosPersonales(deleteModal.dni);
      setDatosPersonales(prev => prev.filter(item => item.DNI !== deleteModal.dni));
      toast.success(`Registro eliminado correctamente`);
      setDeleteModal({ isOpen: false, dni: '', nombre: '' });
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast.error('Error al eliminar el registro');
    }
  };

  // Datos filtrados y ordenados
  const filteredData = useMemo(() => {
    return datosPersonales.filter(dato => {
      const municipioNombre = getMunicipioNombre(dato.ID_MUN).toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      
      return (
        dato.DNI.toLowerCase().includes(searchTermLower) ||
        dato.NOMBREC?.toLowerCase().includes(searchTermLower) ||
        dato.APELLIDOS?.toLowerCase().includes(searchTermLower) ||
        municipioNombre.includes(searchTermLower)
      );
    });
  }, [datosPersonales, searchTerm, municipios, getMunicipioNombre]); // Include missing dependency

  // Aplicar ordenación
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];
      
      if (keyA === undefined || keyB === undefined) return 0;
      
      if (keyA < keyB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (keyA > keyB) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // Total de páginas
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Columnas para la tabla
  const columns = [
    {
      key: 'DNI',
      header: 'DNI',
      sortable: true,
    },
    {
      key: 'NOMBREC',
      header: 'Nombre',
      sortable: true,
      render: (item: DatosPersonales) => `${item.NOMBREC || ''} ${item.APELLIDOS || ''}`,
    },
    {
      key: 'EMAIL',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'ID_MUN',
      header: 'Municipio',
      render: (item: DatosPersonales) => getMunicipioNombre(item.ID_MUN),
      sortable: true,
    },
    {
      key: 'ACTIVIDADAGROPEC',
      header: 'Actividad',
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (item: DatosPersonales) => (
        <div className="flex space-x-2">
          <Link to={`/datos-personales/${item.DNI}`}>
            <Button variant="outline" size="sm" icon="fi fi-rr-eye">
              Ver
            </Button>
          </Link>
          <Link to={`/datos-personales/edit/${item.DNI}`}>
            <Button variant="outline" size="sm" icon="fi fi-rr-edit">
              Editar
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            icon="fi fi-rr-trash" 
            className="text-red-500 hover:border-red-500 hover:text-red-600"
            onClick={() => openDeleteModal(item.DNI, item.NOMBREC || '')}>
            Eliminar
          </Button>
        </div>
      ),
    }
  ];

  return (
    <>
      <Card
        title="Datos Personales"
        icon="fi fi-rr-users"
        subtitle="Gestión de información personal de agricultores"
        className="animate-fade-in-up"
      >
        <DataTable
          data={paginatedData}
          columns={columns}
          keyExtractor={(item) => item.DNI}
          isLoading={loading}
          emptyMessage="No se encontraron datos personales"
          searchable
          onSearch={handleSearch}
          searchPlaceholder="Buscar por DNI, nombre o municipio..."
          sortConfig={sortConfig}
          onSort={(key) => handleSort(key as keyof DatosPersonales)} // Adjust type to match expected signature
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage
          }}
          actions={
            <Button 
              variant="primary" 
              icon="fi fi-rr-user-add"
              onClick={() => navigate('/datos-personales/new')}>
              Nuevo Registro
            </Button>
          }
        />
      </Card>

      {/* Modal de confirmación de eliminación */}
      {deleteModal.isOpen && (
        <Modal
          title="Confirmar eliminación"
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({isOpen: false, dni: '', nombre: ''})}
          footer={
            <div className="flex justify-end space-x-2">
              <Button 
                variant="secondary" 
                onClick={() => setDeleteModal({isOpen: false, dni: '', nombre: ''})}>
                Cancelar
              </Button>
              <Button 
                variant="primary"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          }
        >
          <p>¿Estás seguro de que deseas eliminar el registro de <strong>{deleteModal.nombre}</strong>?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Esta acción no se puede deshacer.</p>
        </Modal>
      )}
    </>
  );
};

export default DatosPersonalesList;