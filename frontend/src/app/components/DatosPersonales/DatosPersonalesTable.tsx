'use client';

import { useEffect, useState } from "react";
import { DatosPersonales } from "@/app/types/DatosPersonales";
import { datosPersonalesApi } from "@/app/api/axios.config";

export default function DatosPersonalesTable() {
  const [datos, setDatos] = useState<DatosPersonales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await datosPersonalesApi.getAll();
        setDatos(response.data);
      } catch (err: any) {
        console.error('Error al cargar datos personales:', err);
        setError(
          err.response?.data?.message || 
          'Error al conectar con el servidor. Por favor, verifica que el servidor esté funcionando.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-verdeCabildo mb-4"></div>
          <p className="text-gray-600">Cargando datos personales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-semibold mb-2">Error al cargar los datos</p>
        <p className="text-gray-600 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-verdeCabildo text-white rounded hover:bg-green-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (datos.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No hay datos personales registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">DNI</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Nombre</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Apellidos</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Email</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Teléfono</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Municipio</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Actividad</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.dni} className="hover:bg-gray-50 transition-colors">
              <td className="py-2 px-4 border-b">{dato.dni}</td>
              <td className="py-2 px-4 border-b">{dato.nombre}</td>
              <td className="py-2 px-4 border-b">{dato.apellidos}</td>
              <td className="py-2 px-4 border-b">{dato.email}</td>
              <td className="py-2 px-4 border-b">{dato.telefono || '-'}</td>
              <td className="py-2 px-4 border-b">{dato.municipio?.nombre || '-'}</td>
              <td className="py-2 px-4 border-b">
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    dato.actividadAgropecuaria === 'si' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {dato.actividadAgropecuaria === 'si' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
