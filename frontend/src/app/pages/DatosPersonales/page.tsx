'use client';

import { useState } from 'react';
import { DatosPersonales } from '@/app/types/DatosPersonales';
import DatosPersonalesTable from '@/app/components/DatosPersonales/DatosPersonalesTable';

export default function DatosPersonalesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-verdeCabildo">Datos Personales</h1>
        <p className="text-gray-600">
          Gestión de información personal de los agricultores
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Registro de Datos Personales</h2>
            <p className="text-sm text-gray-600">
              Consulta y gestiona los datos personales registrados
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-verdeCabildo hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {showForm ? 'Ver Listado' : 'Nuevo Registro'}
          </button>
        </div>

        {showForm ? (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI/NIF
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localidad
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipio
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                  required
                >
                  <option value="">Seleccione un municipio</option>
                  {/* Aquí irán las opciones de municipios */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actividad Agropecuaria
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Tipo de Persona</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Persona Física</h4>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Agricultor profesional</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nº Trabajadores
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Persona Jurídica</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nº Agricultores profesionales y/o socios
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nº Trabajadores asalariados
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-verdeCabildo text-white rounded-md hover:bg-green-700"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <DatosPersonalesTable />
        )}
      </div>
    </div>
  );
}
