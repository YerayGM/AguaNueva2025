import Link from "next/link";
import Image from "next/image";
import PageHeader from '@/app/layouts/PageHeader';

interface NavigationButton {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

export default function HomePage() {
  const mainButtons: NavigationButton[] = [
    {
      href: "/pages/DatosPersonales",
      title: "DATOS PERSONALES",
      description: "Gestiona la información personal de los agricultores",
      icon: "/window.svg",
    },
    {
      href: "/pages/Expedientes",
      title: "EXPEDIENTES",
      description: "Consulta y gestiona los expedientes existentes",
      icon: "/file.svg",
    },
    {
      href: "/pages/Expedientes/create",
      title: "NUEVO EXPEDIENTE",
      description: "Crea un nuevo expediente de subvención",
      icon: "/file.svg",
    },
  ];

  const secondaryButtons: NavigationButton[] = [
    {
      href: "/pages/informes/fecha-municipio",
      title: "POR FECHA Y MUNICIPIO",
      description: "Genera informes filtrados por fecha y municipio",
      icon: "/globe.svg",
    },
    {
      href: "/pages/informes/general",
      title: "INFORME GENERAL",
      description: "Consulta el informe general de subvenciones",
      icon: "/file.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header con efecto de glassmorphism */}
      <PageHeader />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section con animación sutil */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-block mb-8 relative">
            <div className="absolute inset-0 bg-verdeCabildo opacity-5 blur-xl rounded-full"></div>
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

        {/* Módulos principales con diseño de tarjetas avanzado */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">
            MÓDULOS PRINCIPALES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainButtons.map(({ href, title, description, icon }, index) => (
              <Link
                key={title}
                href={href}
                className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
              >
                {/* Efecto de resplandor en hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-verdeCabildo via-blue-400 to-verdeCabildo opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 group-hover:duration-500"></div>
                
                <div className="relative p-8 flex flex-col items-center h-full">
                  {/* Índice numérico con estilo */}
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-gray-100 group-hover:bg-verdeCabildo group-hover:bg-opacity-20 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-verdeCabildo transition-all duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Icono con efectos */}
                  {icon && (
                    <div className="mb-6 p-5 bg-gradient-to-br from-verdeCabildo to-blue-400 bg-opacity-10 rounded-2xl shadow-lg transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Image
                        src={icon}
                        alt={title}
                        width={48}
                        height={48}
                        className="transition-all duration-500 filter saturate-0 group-hover:saturate-100"
                      />
                    </div>
                  )}
                  
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección de informes con diseño moderno */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 p-8 md:p-12 rounded-3xl mb-16 shadow-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-verdeCabildo mb-4 md:mb-0">
              INFORMES DISPONIBLES
            </h2>
            <div className="flex items-center space-x-2 text-gray-500 text-sm bg-white bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                <span>Ultimas actualizaciones el {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryButtons.map(({ href, title, description, icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:translate-y-[-4px] border border-blue-50"
              >
                {icon && (
                  <div className="mr-5 p-4 bg-blue-50 rounded-xl shadow group-hover:shadow-md group-hover:bg-verdeCabildo group-hover:bg-opacity-10 transition-all duration-300">
                    <Image
                      src={icon}
                      alt={title}
                      width={32}
                      height={32}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-verdeCabildo mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center text-verdeCabildo text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Ver informe</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ayuda rápida */}
        <section className="bg-blue-50 rounded-3xl p-6 md:p-8 mb-16 shadow-inner">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold text-verdeCabildo mb-2">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mb-4 md:mb-0">Contamos con un equipo de soporte para ayudarte con cualquier consulta.</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-verdeCabildo text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contactar
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mejorado */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/images/logo2.png" alt="Logo Cabildo" width={200} height={50}/>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-4 text-gray-300">Enlaces rápidos</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ayuda</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-gray-300">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© 2025 Cabildo de Fuerteventura. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}