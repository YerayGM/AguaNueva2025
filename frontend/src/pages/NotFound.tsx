import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-lg w-full text-center">
        <div className="py-8">
          <div className="text-6xl text-primary dark:text-blue-400 mb-6">
            <i className="fi fi-rr-exclamation"></i>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Página no encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link 
            to="/" 
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
          >
            <i className="fi fi-rr-home mr-2"></i>
            Volver al inicio
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;