import { useState, useEffect } from 'react';
import FormSection from '@/app/components/ui/FormSection';
import PersonaCard from '@/app/components/DatosPersonales/PersonaCard';
import FormButtons from '@/app/components/ui/FormButtons';
import { datosPersonalesApi } from '@/app/api/axios.config';

export default function DatosPersonalesForm({ onCancel }) {
  const [formData, setFormData] = useState({
    dni: '',
    apellidos: '',
    nombre: '',
    direccion: '',
    localidad: '',
    municipio: '',
    telefono: '',
    email: '',
    actividadAgropecuaria: '',
    agricultor: false,
    numTrabajadores: 0,
    numAgricultores: 0,
    numAsalariados: 0
  });

  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    // Fetch municipios from backend
    fetch('http://localhost:3000/api/municipios')
      .then(res => res.json())
      .then(data => setMunicipios(data))
      .catch(err => console.error('Error fetching municipios:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map frontend formData to backend DTO fields
    const payload = {
      Dni: formData.dni,
      Apellidos: formData.apellidos,
      Nombre: formData.nombre,
      Direccion: formData.direccion || undefined,
      Localidad: formData.localidad || undefined,
      IdMunicipio: municipios.find(m => m.municipio === formData.municipio)?.idMunicipio || null,
      Telefono: formData.telefono,
      Email: formData.email,
      ActividadAgropecuaria: formData.actividadAgropecuaria || 'no',
      PersonaFiscal: false,
      PersonaJuridica: false,
      AgricultorProfesional: formData.agricultor,
      AgricultorlTiempoParcial: false,
      TrabajadorAsalariado: false,
      NumeroAsalariados: formData.numAsalariados || 0,
      DiscapacidadAgricultorProfesional: false,
      NumeroAgriculresProfesionales: formData.numAgricultores || 0,
      NumeroTrabajadoresAsalariados: formData.numTrabajadores || 0,
      CodigoPostal: '', // Missing in form, set empty string or add field if needed
      FechaCreacion: new Date()
    };

    try {
      await datosPersonalesApi.create(payload);
      alert('Datos personales creados correctamente');
      onCancel();
    } catch (error) {
      console.error('Error creating datos personales:', error);
      alert('Error al crear datos personales. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Sección de datos básicos */}
      <FormSection 
        title="Información Personal" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="DNI/NIF"
            name="dni"
            type="text"
            value={formData.dni}
            onChange={handleChange}
            required
          />

          <FormField
            label="Apellidos"
            name="apellidos"
            type="text"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />

          <FormField
            label="Nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <FormField
            label="Dirección"
            name="direccion"
            type="text"
            value={formData.direccion}
            onChange={handleChange}
          />

          <FormField
            label="Localidad"
            name="localidad"
            type="text"
            value={formData.localidad}
            onChange={handleChange}
          />

          <FormField
            label="Municipio"
            name="municipio"
            type="select"
            value={formData.municipio}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Seleccione un municipio" },
              ...municipios.map(m => ({ value: m.municipio, label: m.municipio }))
            ]}
          />

          <FormField
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormField
            label="Actividad Agropecuaria"
            name="actividadAgropecuaria"
            type="select"
            value={formData.actividadAgropecuaria}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Seleccione una opción" },
              { value: "si", label: "Sí" },
              { value: "no", label: "No" }
            ]}
          />
        </div>
      </FormSection>

      {/* Sección tipo de persona con cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonaCard 
          title="Persona Física"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-colors duration-300 group-hover:bg-blue-50">
              <input 
                type="checkbox" 
                name="agricultor"
                checked={formData.agricultor}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-verdeCabildo transition duration-300 ease-in-out" 
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Agricultor profesional</span>
            </label>
            
            <FormField
              label="Nº Trabajadores"
              name="numTrabajadores"
              type="number"
              min="0"
              value={formData.numTrabajadores}
              onChange={handleChange}
            />
          </div>
        </PersonaCard>

        <PersonaCard 
          title="Persona Jurídica"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        >
          <div className="space-y-4">
            <FormField
              label="Nº Agricultores profesionales y/o socios"
              name="numAgricultores"
              type="number"
              min="0"
              value={formData.numAgricultores}
              onChange={handleChange}
            />
            
            <FormField
              label="Nº Trabajadores asalariados"
              name="numAsalariados"
              type="number"
              min="0"
              value={formData.numAsalariados}
              onChange={handleChange}
            />
          </div>
        </PersonaCard>
      </div>

      <FormButtons onCancel={onCancel} />
    </form>
  );
}

// Componente reutilizable para campos de formulario
function FormField({ label, name, type, value, onChange, required, options, min, max }) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-verdeCabildo transition-colors duration-300">
        {label}
      </label>
      
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verdeCabildo focus:border-transparent transition-all duration-300 group-hover:shadow-md"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verdeCabildo focus:border-transparent transition-all duration-300 group-hover:shadow-md"
        />
      )}
    </div>
  );
}
