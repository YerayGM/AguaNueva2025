import React from 'react';

export default function FormPanel({ showForm, toggleForm, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16 transform transition-all duration-500 hover:shadow-2xl">
      {/* Cabecera del panel con degradado */}
      <div className="bg-gradient-to-r from-verdeCabildo to-blue-400 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Registro de Datos Personales</h2>
          <p className="text-white text-opacity-80 text-sm">
            Consulta y gestiona los datos personales registrados
          </p>
        </div>
        <button
          onClick={toggleForm}
          className="bg-white text-verdeCabildo px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
        >
          {showForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Ver Listado
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Registro
            </>
          )}
        </button>
      </div>

      {/* Contenido con efecto de luz */}
      <div className="p-8 relative">
        {/* Efecto de luz en la esquina */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}