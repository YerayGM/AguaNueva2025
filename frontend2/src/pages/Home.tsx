import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/globals.css';
import '@flaticon/flaticon-uicons/css/all/all.css';

interface NavigationCard {
  href: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
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
        if (prev === null || prev >= mainCards.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  };

  const mainCards: NavigationCard[] = [
    {
      href: "/datos-personales",
      title: "DATOS PERSONALES",
      description: "Gestiona la información personal de los agricultores",
      icon: "fi fi-rr-user",
      color: "from-blue-500 to-blue-600"
    },
    {
      href: "/expedientes",
      title: "EXPEDIENTES",
      description: "Consulta y gestiona los expedientes existentes",
      icon: "fi fi-rr-document",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      href: "/expedientes/new",
      title: "NUEVO EXPEDIENTE",
      description: "Crea un nuevo expediente de subvención",
      icon: "fi fi-rr-file-add",
      color: "from-green-500 to-green-600"
    },
  ];

  const secondaryCards: NavigationCard[] = [
    {
      href: "/informes/fecha-municipio",
      title: "POR FECHA Y MUNICIPIO",
      description: "Genera informes filtrados por fecha y municipio",
      icon: "fi fi-rr-calendar",
      color: "from-amber-500 to-amber-600"
    },
    {
      href: "/informes/general",
      title: "INFORME GENERAL",
      description: "Consulta el informe general de subvenciones",
      icon: "fi fi-rr-chart-pie",
      color: "from-rose-500 to-rose-600"
    },
  ];
  
  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Decoración de fondo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900 opacity-[0.15] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 opacity-[0.1] rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            Gestión de Agua Nueva
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Plataforma integral para la gestión de expedientes y datos agrícolas
          </p>
        </div>

        {/* Main Navigation Cards */}
        <section className="mb-16 relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Gestión Principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainCards.map((card, index) => (
              <Link
                to={card.href}
                key={index}
                className="block transform transition-all duration-300 hover:scale-[1.02]"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`
                  h-full rounded-xl overflow-hidden shadow-sm
                  ${activeCard === index ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800' : ''}
                  transition-all duration-300
                `}>
                  <div className={`bg-gradient-to-r ${card.color} p-6 flex items-center justify-center text-white`}>
                    <i className={`${card.icon} text-4xl`}></i>
                  </div>
                  <div className="p-5 bg-white dark:bg-gray-800 border-t-0 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{card.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Secondary Navigation Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Informes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryCards.map((card, index) => (
              <Link
                to={card.href}
                key={index}
                className="block transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Card hoverable className="h-full flex">
                  <div className="flex items-center">
                    <div className={`rounded-full p-3 mr-4 flex-shrink-0 bg-gradient-to-r ${card.color}`}>
                      <i className={`${card.icon} text-2xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{card.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{card.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats and Help Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card 
            title="Estadísticas" 
            icon="fi fi-rr-stats"
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                <h4 className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Total Expedientes</h4>
                <div className="text-2xl font-semibold text-blue-700 dark:text-blue-300">187</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg">
                <h4 className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">Datos Personales</h4>
                <div className="text-2xl font-semibold text-amber-700 dark:text-amber-300">93</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg">
                <h4 className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Municipios</h4>
                <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">32</div>
              </div>
            </div>
          </Card>
          
          {/* Help Card */}
          <Card 
            title="Ayuda Rápida" 
            icon="fi fi-rr-interrogation"
          >
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                  <i className="fi fi-rr-document-signed mr-2"></i>
                  <span>Guía de uso</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                  <i className="fi fi-rr-video-camera mr-2"></i>
                  <span>Tutoriales</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                  <i className="fi fi-rr-envelope mr-2"></i>
                  <span>Contactar soporte</span>
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;