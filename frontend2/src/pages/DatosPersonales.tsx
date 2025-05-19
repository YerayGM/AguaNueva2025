import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import DataTable from '../components/common/Table/DataTable';
import DatosPersonalesSearch from '../components/modules/DatosPersonales/DatosPersonalesSearch';
import DatosPersonalesForm from '../components/modules/DatosPersonales/DatosPersonalesForm';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import { datosPersonalesService } from '../services/datosPersonalesService';
import { municipiosService } from '../services/municipiosService';
import { DatosPer, DatosPerFormData } from '../types/datosPer';
import { Municipio } from '../types/municipio';

const DatosPersonales: React.FC = () => {
  const [datosPersonales, setDatosPersonales] = useState<DatosPer[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDatosPer, setEditingDatosPer] = useState<DatosPer | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDni, setSelectedDni] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });
  
  const columns: GridColDef[] = [
    { field: 'dni', headerName: 'DNI', width: 120 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', width: 120 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { 
      field: 'municipio', 
      headerName: 'Municipio', 
      width: 150,
      valueGetter: (params: any) => {
        const municipioId = params.row.idMunicipio;
        const municipio = municipios.find(m => m.id === municipioId);
        return municipio ? municipio.nombre : '';
      }
    },
    { field: 'tipoPersona', headerName: 'Tipo', width: 120 },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datosPersonalesData, municipiosData] = await Promise.all([
          datosPersonalesService.getAll(),
          municipiosService.getAll()
        ]);
        
        setDatosPersonales(datosPersonalesData);
        setMunicipios(municipiosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        showNotification('Error al cargar datos', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSearch = async (values: any) => {
    setLoading(true);
    try {
      let results: DatosPer[] = [];
      
      if (values.dni) {
        try {
          const data = await datosPersonalesService.getByDni(values.dni);
          results = [data];
        } catch {
          results = [];
        }
      } else if (values.nombre || values.apellidos) {
        results = await datosPersonalesService.searchByName(values.nombre, values.apellidos);
      } else {
        results = await datosPersonalesService.getAll();
      }
      
      setDatosPersonales(results);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      showNotification('Error al realizar la búsqueda', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRowClick = (params: any) => {
    const datosPer = params.row;
    setEditingDatosPer(datosPer);
    setShowForm(true);
  };
  
  const handleCreateNew = () => {
    setEditingDatosPer(null);
    setShowForm(true);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingDatosPer(null);
  };
  
  const handleFormSubmit = async (values: DatosPerFormData) => {
    setLoading(true);
    
    try {
      if (editingDatosPer) {
        await datosPersonalesService.update(values.dni, values);
        showNotification('Datos actualizados correctamente', 'success');
      } else {
        await datosPersonalesService.create(values);
        showNotification('Registro creado correctamente', 'success');
      }
      
      // Recargar datos
      const updatedData = await datosPersonalesService.getAll();
      setDatosPersonales(updatedData);
      setShowForm(false);
      setEditingDatosPer(null);
    } catch (error) {
      console.error('Error al guardar:', error);
      showNotification('Error al guardar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = (dni: string) => {
    setSelectedDni(dni);
    setDeleteConfirmOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedDni) return;
    
    setLoading(true);
    try {
      await datosPersonalesService.delete(selectedDni);
      showNotification('Registro eliminado correctamente', 'success');
      
      // Recargar datos
      const updatedData = await datosPersonalesService.getAll();
      setDatosPersonales(updatedData);
    } catch (error) {
      console.error('Error al eliminar:', error);
      showNotification('Error al eliminar el registro', 'error');
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
      setSelectedDni(null);
    }
  };
  
  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  const initialFormValues: DatosPerFormData = editingDatosPer || {
    dni: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    localidad: '',
    idMunicipio: 0,
    telefono: '',
    email: '',
    actAgrop: '',
    tipoPersona: 'fisica',
    datosAdicionales: {},
  };
  
  return (
    <MainLayout title="Datos Personales">
      {showForm ? (
        <Box>
          <DatosPersonalesForm
            initialValues={initialFormValues}
            municipios={municipios}
            onSubmit={handleFormSubmit}
            isEditing={!!editingDatosPer}
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleFormCancel}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
            {editingDatosPer && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleDelete(editingDatosPer.dni)}
                sx={{ ml: 1 }}
              >
                Eliminar
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Gestión de Datos Personales</Typography>
            <PrimaryButton onClick={handleCreateNew}>
              Nuevo Registro
            </PrimaryButton>
          </Box>
          
          <DatosPersonalesSearch onSearch={handleSearch} />
          
          <DataTable
            rows={datosPersonales}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
          />
        </>
      )}
      
      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notificaciones */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default DatosPersonales;