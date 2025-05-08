'use client';

import { useEffect, useState } from "react";
import { Expediente } from "@/app/types/Expediente";
import { expedientesApi } from "@/app/api/axios.config";

export default function ExpedientesTable() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpedientes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await expedientesApi.getAll();
        setExpedientes(response.data);
      } catch (err: any) {
        console.error('Error al cargar expedientes:', err);
        setError(
          err.response?.data?.message || 
          'Error al conectar con el servidor. Por favor, verifica que el servidor esté funcionando.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExpedientes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-verdeCabildo mb-4"></div>
          <p className="text-gray-600">Cargando expedientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-semibold mb-2">Error al cargar los expedientes</p>
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

  if (expedientes.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No hay expedientes registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">ID Expediente</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Hoja</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Solicitante</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Fecha</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Municipio</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Técnico</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((expediente) => (
            <tr key={`${expediente.IdExpediente}-${expediente.Hoja}`} className="hover:bg-gray-50 transition-colors">
              <td className="py-2 px-4 border-b">{expediente.IdExpediente}</td>
              <td className="py-2 px-4 border-b">{expediente.Hoja}</td>
              <td className="py-2 px-4 border-b">
                {expediente.DatosPersonales?.nombre} {expediente.DatosPersonales?.apellidos}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(expediente.Fecha).toLocaleDateString('es-ES')}
              </td>
              <td className="py-2 px-4 border-b">{expediente.Municipio?.nombre || '-'}</td>
              <td className="py-2 px-4 border-b">{expediente.Tecnico || '-'}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  expediente.TextoInforme 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {expediente.TextoInforme ? 'Completado' : 'Pendiente'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
