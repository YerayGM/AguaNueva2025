import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          Gestión de Subvención al Agua Agrícola - 2025
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Sistema de gestión para la subvención al agua agrícola del Cabildo de Fuerteventura
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Datos Personales" 
          className="hover:shadow-lg transition-shadow"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Gestione la información de los beneficiarios de las subvenciones.
          </p>
          <div className="flex justify-center">
            <Link to="/datos-personales">
              <Button>
                Acceder
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card 
          title="Expedientes" 
          className="hover:shadow-lg transition-shadow"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Gestione los expedientes de subvención y sus datos asociados.
          </p>
          <div className="flex justify-center">
            <Link to="/expedientes">
              <Button>
                Acceder
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card 
          title="Nuevo Expediente" 
          className="hover:shadow-lg transition-shadow"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Cree rápidamente un nuevo expediente de subvención.
          </p>
          <div className="flex justify-center">
            <Link to="/expedientes/nuevo">
              <Button>
                Crear
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
          Información del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-slate-800 dark:text-white mb-2">
              Funcionalidades Principales
            </h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Gestión de datos personales de beneficiarios</li>
              <li>Gestión de expedientes de subvención</li>
              <li>Registro de datos específicos de expedientes</li>
              <li>Búsqueda por diferentes criterios</li>
              <li>Generación de documentos</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-slate-800 dark:text-white mb-2">
              Últimas Actualizaciones
            </h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Nuevo diseño de interfaz más moderno y accesible</li>
              <li>Optimización del rendimiento del sistema</li>
              <li>Mejoras en la experiencia de usuario</li>
              <li>Ampliación de opciones de búsqueda</li>
              <li>Compatibilidad con dispositivos móviles</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HomePage