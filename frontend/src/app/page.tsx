import Link from "next/link";
import Image from "next/image";

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
    <main className="container mx-auto p-6 flex-grow">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-verdeCabildo">
          GESTIÓN SUBVENCIÓN AL AGUA AGRÍCOLA - 2025
        </h1>
        <p className="text-gray-600 mb-8">
          Sistema de gestión de subvenciones al agua agrícola del Cabildo de Fuerteventura
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {mainButtons.map(({ href, title, description, icon }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col items-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105 border border-blue-200 cursor-pointer hover:bg-blue-50"
          >
            {icon && (
              <div className="mb-4 p-3 bg-blue-100 rounded-full">
                <Image
                  src={icon}
                  alt={title}
                  width={40}
                  height={40}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
            )}
            <span className="text-2xl font-bold text-verdeCabildo mb-2">
              {title}
            </span>
            <p className="text-sm text-gray-600 text-center">{description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondaryButtons.map(({ href, title, description, icon }) => (
          <Link
            key={title}
            href={href}
            className="group flex items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform transition-all hover:scale-105 border border-blue-200"
          >
            {icon && (
              <div className="mr-4 p-2 bg-blue-100 rounded-full">
                <Image
                  src={icon}
                  alt={title}
                  width={30}
                  height={30}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
            )}
            <div>
              <span className="text-lg font-bold text-verdeCabildo block">
                {title}
              </span>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
