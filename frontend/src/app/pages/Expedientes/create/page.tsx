'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { expedientesApi } from '@/app/api/axios.config';
import { Expediente } from '@/app/types/Expediente';

export default function CreateExpedientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    IdExpediente: '',
    Hoja: 0,
    Lugar: '',
    Localidad: '',
    ContadorNombre: '',
    ContadorPoliza: '',
    Observaciones: '',
    Tecnico: '',
    Dias: 0,
    ObservacionesTecnico: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await expedientesApi.create(formData);
      router.push('/pages/Expedientes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el expediente');
      console.error('Error al crear expediente:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Hoja' || name === 'Dias' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-verdeCabildo">Nuevo Expediente</h1>
        <p className="text-gray-600">
          Crear un nuevo expediente de subvención
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Expediente
              </label>
              <input
                type="text"
                name="IdExpediente"
                value={formData.IdExpediente}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hoja
              </label>
              <input
                type="number"
                name="Hoja"
                value={formData.Hoja}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lugar
              </label>
              <input
                type="text"
                name="Lugar"
                value={formData.Lugar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localidad
              </label>
              <input
                type="text"
                name="Localidad"
                value={formData.Localidad}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Contador
              </label>
              <input
                type="text"
                name="ContadorNombre"
                value={formData.ContadorNombre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Póliza del Contador
              </label>
              <input
                type="text"
                name="ContadorPoliza"
                value={formData.ContadorPoliza}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              name="Observaciones"
              value={formData.Observaciones}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-verdeCabildo text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Expediente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
