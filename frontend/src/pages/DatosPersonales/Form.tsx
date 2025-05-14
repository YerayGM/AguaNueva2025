import React, { useState } from 'react';
import { createDatosPersonales } from '../../services/datosPersonales';

const DatosPersonalesForm: React.FC = () => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidos: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDatosPersonales(formData);
    alert('Datos personales creados');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>DNI</label>
        <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
      </div>
      <div>
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Apellidos</label>
        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default DatosPersonalesForm;