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
      rotateActiveCard();
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

  // Datos para estadísticas rápidas
  const quickStats = [
    { label: "Expedientes activos", value: "241", icon: "fi fi-rr-document", 
      color: "from-blue-400 to-blue-600" },
    { label: "Subvenciones otorgadas", value: "183", icon: "fi fi-rr-hand-holding-usd", 
      color: "from-emerald-400 to-emerald-600" },
    { label: "Total asignado", value: "€ 1.2M", icon: "fi fi-rr-euro", 
      color: "from-amber-400 to-amber-600" },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Decoración de fondo */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-verdeCabildo opacity-[0.02] rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400 opacity-[0.02] rounded-tr-full blur-3xl"></div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section mejorado */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-8 relative">
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-verdeCabildo tracking-tight">
              GESTIÓN DE SUBVENCIÓN <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-verdeCabildo to-blue-500">
                AL AGUA AGRÍCOLA 2025
              </span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto font-light">
            Sistema integral para la gestión de subvenciones al agua agrícola del Cabildo de Fuerteventura
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-verdeCabildo to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Módulos principales con diseño mejorado */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center">
              <span className="w-2 h-8 bg-verdeCabildo rounded-full mr-2 hidden md:block"></span>
              MÓDULOS PRINCIPALES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainButtons.map(({ href, title, description, icon }, index) => (
              <Link
                key={title}
                to={href}
                className={`group relative overflow-hidden bg-white rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 
                ${activeCard === index ? 'ring-2 ring-verdeCabildo ring-opacity-50 scale-105' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Efecto de resplandor en hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-verdeCabildo via-blue-400 to-verdeCabildo opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 ${activeCard === index ? 'opacity-20' : ''}`}></div>
                
                <div className="relative p-8 flex flex-col items-center h-full">
                  {/* Índice numérico con estilo */}
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-gray-100 group-hover:bg-verdeCabildo group-hover:bg-opacity-20 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-verdeCabildo transition-all duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Indicador de actividad */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${activeCard === index ? 'bg-verdeCabildo' : 'bg-gray-200'} transition-all duration-300`}></div>
                  
                  {/* Icono con efectos */}
                  <div className="mb-6 p-5 bg-gradient-to-br from-verdeCabildo to-blue-400 bg-opacity-10 rounded-2xl shadow-lg transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <i className={`${icon} text-4xl text-verdeCabildo opacity-80 group-hover:opacity-100 transition-all duration-500`}></i>
                  </div>
                  
                  {/* Texto con transiciones */}
                  <h3 className="text-xl font-bold text-verdeCabildo mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-center group-hover:text-gray-700 transition-colors duration-300">
                    {description}
                  </p>
                  
                  {/* Botón circular */}
                  <div className="mt-auto pt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-verdeCabildo flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                      <i className="fi fi-rr-angle-right text-gray-400 group-hover:text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección de informes mejorada */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 p-8 md:p-12 rounded-3xl mb-16 shadow-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-verdeCabildo mb-4 md:mb-0 flex items-center">
              <i className="fi fi-rr-chart-pie-alt mr-3 text-blue-500"></i>
              INFORMES DISPONIBLES
            </h2>
            <div className="flex items-center space-x-2 text-gray-500 text-sm bg-white bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fi fi-rr-info text-verdeCabildo"></i>
              <span>Última actualización: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryButtons.map(({ href, title, description, icon }) => (
              <Link
                key={title}
                to={href}
                className="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:translate-y-[-4px] border border-blue-50"
              >
                <div className="mr-5 p-4 bg-blue-50 rounded-xl shadow-md group-hover:shadow-lg group-hover:bg-verdeCabildo group-hover:bg-opacity-10 transition-all duration-300">
                  <i className={`${icon} text-2xl text-verdeCabildo opacity-80 group-hover:opacity-100 transition-all duration-500`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-verdeCabildo mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {title}
                    </h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Actualizado</span>
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center text-verdeCabildo text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Ver informe</span>
                    <i className="fi fi-rr-arrow-right ml-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ayuda rápida mejorada */}
        <section className="bg-gradient-to-r from-verdeCabildo to-blue-500 rounded-3xl p-8 md:p-10 mb-16 shadow-xl text-white overflow-hidden relative">
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
              <button className="bg-white text-verdeCabildo px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
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