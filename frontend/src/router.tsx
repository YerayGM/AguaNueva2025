import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DatosPersonalesList from './pages/DatosPersonales/List';
import DatosPersonalesForm from './pages/DatosPersonales/Form';
// import ExpedientesList from './pages/Expedientes/List';
// import ExpedientesForm from './pages/Expedientes/Form';
// import MateriaList from './pages/Materia/List';
// import MateriaForm from './pages/Materia/Form';
// import MunicipiosList from './pages/Municipios/List';
// import MunicipiosForm from './pages/Municipios/Form';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/datos-personales" element={<DatosPersonalesList />} />
      <Route path="/datos-personales/new" element={<DatosPersonalesForm />} />
    </Routes>
  );
};

export default AppRoutes;

/*
      <Route path="/expedientes" element={<ExpedientesList />} />
      <Route path="/expedientes/new" element={<ExpedientesForm />} />
      <Route path="/materia" element={<MateriaList />} />
      <Route path="/materia/new" element={<MateriaForm />} />
      <Route path="/municipios" element={<MunicipiosList />} />
      <Route path="/municipios/new" element={<MunicipiosForm />} />
*/