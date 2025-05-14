import React from 'react';
import '@flaticon/flaticon-uicons/css/all/all.css';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin text-verdeCabildo text-3xl">
        <i className="fi fi-rr-spinner"></i>
      </div>
      <span className="ml-3 text-verdeCabildo">Cargando...</span>
    </div>
  );
};

export default Loader;