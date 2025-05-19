import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';

// Lazy loading de componentes
const HomePage = lazy(() => import('./pages/Home'));
const DatosPersonalesList = lazy(() => import('./pages/DatosPersonales/List'));
const DatosPersonalesForm = lazy(() => import('./pages/DatosPersonales/Form'));
const ExpedientesList = lazy(() => import('./pages/Expedientes/List'));
const ExpedientesForm = lazy(() => import('./pages/Expedientes/Form'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Componente de carga para Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader />
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rutas de Datos Personales */}
        <Route path="/datos-personales" element={<DatosPersonalesList />} />
        <Route path="/datos-personales/new" element={<DatosPersonalesForm />} />
        <Route path="/datos-personales/edit/:dni" element={<DatosPersonalesForm />} />
        <Route path="/datos-personales/:dni" element={<DatosPersonalesForm />} />
        
        {/* Rutas de Expedientes */}
        <Route path="/expedientes" element={<ExpedientesList />} />
        <Route path="/expedientes/new" element={<ExpedientesForm />} />
        <Route path="/expedientes/edit/:expedienteId" element={<ExpedientesForm />} />
        <Route path="/expedientes/:expedienteId" element={<ExpedientesForm />} />
        
        {/* Ruta de redirección para rutas antiguas */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        
        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;