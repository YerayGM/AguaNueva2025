import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      {/* Encabezado con imagen de fondo */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
        <img 
          src="https://www.cabildofuer.es/wp-content/uploads/2021/02/presa-las-penitas-fuerteventura.jpg"
          alt="Agua en Fuerteventura"
          className="w-full h-64 object-cover object-center"
        />
        <div className="relative p-6 md:p-10 flex flex-col justify-end h-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Agua Nueva 2025
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-xl">
            Sistema de gestión de subvenciones para el agua agrícola
          </p>
        </div>
      </div>

      {/* Acceso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link to="/datos-personales">
          <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20">
            <div className="p-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Datos Personales</h3>
              <p className="text-gray-400 mb-4">Consulta y edita tu información personal</p>
              <Button variant="outline" size="sm" className="mt-auto">
                Acceder
              </Button>
            </div>
          </Card>
        </Link>
        
        <Link to="/expedientes">
          <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20">
            <div className="p-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expedientes</h3>
              <p className="text-gray-400 mb-4">Gestiona tus expedientes de subvención</p>
              <Button variant="outline" size="sm" className="mt-auto">
                Acceder
              </Button>
            </div>
          </Card>
        </Link>
        
        <Link to="/expedientes/nuevo">
          <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20">
            <div className="p-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Nueva Solicitud</h3>
              <p className="text-gray-400 mb-4">Inicia una nueva solicitud de subvención</p>
              <Button variant="primary" size="sm" className="mt-auto">
                Crear nueva
              </Button>
            </div>
          </Card>
        </Link>
      </div>

      {/* Estado actual */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Estado de tus expedientes</h2>
          <Button 
            variant="outline" 
            size="sm"
            as={Link}
            to="/expedientes"
          >
            Ver todos
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-blue-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total</p>
                {isLoading ? (
                  <div className="h-5 w-12 bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-semibold">3</p>
                )}
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-amber-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Pendientes</p>
                {isLoading ? (
                  <div className="h-5 w-12 bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-semibold">1</p>
                )}
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-green-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Aprobados</p>
                {isLoading ? (
                  <div className="h-5 w-12 bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-semibold">2</p>
                )}
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-red-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rechazados</p>
                {isLoading ? (
                  <div className="h-5 w-12 bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-semibold">0</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Expedientes recientes */}
      <Card title="Expedientes Recientes">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-750">
                  <td>EXP-2025/003</td>
                  <td>18/05/2025</td>
                  <td>
                    <Badge variant="amber">En revisión</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm" to="/expedientes/3">Ver</Button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td>EXP-2025/002</td>
                  <td>10/04/2025</td>
                  <td>
                    <Badge variant="green">Aprobado</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm" to="/expedientes/2">Ver</Button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td>EXP-2025/001</td>
                  <td>22/02/2025</td>
                  <td>
                    <Badge variant="green">Aprobado</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm" to="/expedientes/1">Ver</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}

export default Home