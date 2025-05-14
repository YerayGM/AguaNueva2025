import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DatosPersonalesList from './pages/DatosPersonales/List';
import DatosPersonalesForm from './pages/DatosPersonales/Form';
import ExpedientesList from './pages/Expedientes/List';
import ExpedientesForm from './pages/Expedientes/Form';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/datos-personales" element={<DatosPersonalesList />} />
      <Route path="/datos-personales/new" element={<DatosPersonalesForm />} />
      <Route path="/datos-personales/edit/:dni" element={<DatosPersonalesForm />} />
      <Route path="/expedientes" element={<ExpedientesList />} />
      <Route path="/expedientes/new" element={<ExpedientesForm />} />
      <Route path="/expedientes/edit/:expedienteId" element={<ExpedientesForm />} />
      <Route path="/informes/fecha-municipio" element={<div>Informes por Fecha y Municipio</div>} />
      <Route path="/informes/general" element={<div>Informe General</div>} />
    </Routes>
  );
};

export default AppRoutes;