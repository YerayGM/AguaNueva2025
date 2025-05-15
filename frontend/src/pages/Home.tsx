import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';
import '@flaticon/flaticon-uicons/css/all/all.css';

interface NavigationButton {
  href: string;
  title: string;
  description: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Detectar inactividad para mostrar sugerencias
    const inactivityTimer = setTimeout(() => {
      const cleanupRotation = rotateActiveCard();
      return cleanupRotation;
    }, 3000);
    
    return () => clearTimeout(inactivityTimer);
  }, []); 
  
  // Función para rotar automáticamente el foco en las tarjetas
  const rotateActiveCard = () => {
    const interval = setInterval(() => {
      setActiveCard(prev => {
        if (prev === null || prev >= mainButtons.length - 1) return 0;
        return prev + 1;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  };

  const mainButtons: NavigationButton[] = [
    {
      href: "/datos-personales",
      title: "DATOS PERSONALES",
      description: "Gestiona la información personal de los agricultores",
      icon: "fi fi-rr-user",
    },
    {
      href: "/expedientes",
      title: "EXPEDIENTES",
      description: "Consulta y gestiona los expedientes existentes",
      icon: "fi fi-rr-document",
    },
    {
      href: "/expedientes/new",
      title: "NUEVO EXPEDIENTE",
      description: "Crea un nuevo expediente de subvención",
      icon: "fi fi-rr-file-add",
    },
  ];

  const secondaryButtons: NavigationButton[] = [
    {
      href: "/informes/fecha-municipio",
      title: "POR FECHA Y MUNICIPIO",
      description: "Genera informes filtrados por fecha y municipio",
      icon: "fi fi-rr-calendar",
    },
    {
      href: "/informes/general",
      title: "INFORME GENERAL",
      description: "Consulta el informe general de subvenciones",
      icon: "fi fi-rr-chart-pie",
    },
  ];
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Decoración de fondo */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-300 dark:bg-blue-600 opacity-[0.05] rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-200 dark:bg-blue-500 opacity-[0.05] rounded-tr-full blur-3xl"></div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section mejorado */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-8 relative">
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-blue-600 dark:text-blue-400 tracking-tight">
              GESTIÓN DE SUBVENCIÓN <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                AL AGUA AGRÍCOLA 2025
              </span>
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto font-light">
            Sistema integral para la gestión de subvenciones al agua agrícola del Cabildo de Fuerteventura
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 mx-auto rounded-full"></div>
        </div>

        {/* Módulos principales con diseño mejorado */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center">
              <span className="w-2 h-8 bg-blue-500 dark:bg-blue-500 rounded-full mr-2 hidden md:block"></span>
              MÓDULOS PRINCIPALES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainButtons.map(({ href, title, description, icon }, index) => (
              <Link
                key={title}
                to={href}
                className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 dark:border-gray-700 
                ${activeCard === index ? 'ring-2 ring-blue-500 dark:ring-blue-500 ring-opacity-50 scale-105' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Efecto de resplandor en hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 dark:from-blue-600 dark:via-blue-500 dark:to-blue-600 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 ${activeCard === index ? 'opacity-20' : ''}`}></div>
                
                <div className="relative p-8 flex flex-col items-center h-full">
                  {/* Índice numérico con estilo */}
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 group-hover:bg-opacity-20 flex items-center justify-center text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Indicador de actividad */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${activeCard === index ? 'bg-blue-500 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'} transition-all duration-300`}></div>
                  
                  {/* Icono con efectos */}
                  <div className="mb-6 p-5 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-800 bg-opacity-30 dark:bg-opacity-20 rounded-2xl shadow-lg transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <i className={`${icon} text-4xl text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-all duration-500`}></i>
                  </div>
                  
                  {/* Texto con transiciones */}
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                  </p>
                  
                  {/* Botón circular */}
                  <div className="mt-auto pt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                      <i className="fi fi-rr-angle-right text-gray-400 dark:text-gray-500 group-hover:text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección de informes mejorada */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-3xl mb-16 shadow-lg border border-blue-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 md:mb-0 flex items-center">
              <i className="fi fi-rr-chart-pie-alt mr-3 text-blue-500 dark:text-blue-400"></i>
              INFORMES DISPONIBLES
            </h2>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fi fi-rr-info text-blue-600 dark:text-blue-400"></i>
              <span>Última actualización: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryButtons.map(({ href, title, description, icon }) => (
              <Link
                key={title}
                to={href}
                className="group flex items-start p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:translate-y-[-4px] border border-blue-50 dark:border-gray-700"
              >
                <div className="mr-5 p-4 bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md group-hover:shadow-lg group-hover:bg-blue-500 dark:group-hover:bg-blue-600 group-hover:bg-opacity-10 dark:group-hover:bg-opacity-20 transition-all duration-300">
                  <i className={`${icon} text-2xl text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-all duration-500`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      {title}
                    </h3>
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">Actualizado</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Ver informe</span>
                    <i className="fi fi-rr-arrow-right ml-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ayuda rápida mejorada */}
        <section className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-3xl p-8 md:p-10 mb-16 shadow-xl text-white overflow-hidden relative">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-3">¿Necesitas ayuda?</h3>
              <p className="text-white text-opacity-90 mb-6 md:mb-0 max-w-lg">
                Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta o problema técnico que puedas tener.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                <i className="fi fi-rr-book-alt mr-2"></i>
                Contactar
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;