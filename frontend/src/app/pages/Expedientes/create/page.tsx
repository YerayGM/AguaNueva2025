'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { expedientesApi } from '@/app/api/axios.config';
import { CreateExpedienteDto } from '@/app/types/Expediente';
import { Municipio } from '@/app/types/DatosPersonales';
import { Button } from '@/app/components/ui/Button';
import { DatosExpedienteForm } from '@/app/components/Expedientes/DatosExpedienteForm';
import { CuatrimestresTable } from '@/app/components/Expedientes/CuatrimestresTable';
import { DatosTecnicoForm } from '@/app/components/Expedientes/DatosTecnicoForm';
import { generateId } from '@/app/utils/generateId';
import axios from 'axios';

interface CuatrimestreRow {
  id: string;
  concepto: string;
  multi: number;
  mini: number;
  cant: number;
  inf: string;
  desde: string;
  hasta: string;
  pd: string;
  pa: string;
  rc: string;
  cultivo: string;
}

export default function CreateExpedientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [formData, setFormData] = useState<CreateExpedienteDto>({
    IdExpediente: '',
    Dni: '',
    Fecha: new Date().toISOString().split('T')[0],
    Lugar: '',
    Localidad: '',
    IdMunicipio: '',
    ContadorNombre: '',
    ContadorPoliza: '',
    Observaciones: '',
    Tecnico: '',
    FechaInforme: new Date().toISOString().split('T')[0],
    ObservacionesTecnico: '',
  });

  const [cuatrimestres, setCuatrimestres] = useState<CuatrimestreRow[]>([
    {
      id: generateId(),
      concepto: '',
      multi: 0,
      mini: 0,
      cant: 0,
      inf: '',
      desde: '',
      hasta: '',
      pd: '',
      pa: '',
      rc: '',
      cultivo: ''
    }
  ]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get<Municipio[]>('http://localhost:3000/api/municipios', {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'my-secret-api-key' }
        });
        setMunicipios(response.data);
      } catch (err) {
        console.error('Error al cargar municipios:', err);
        setError('Error al cargar los municipios');
      }
    };

    fetchMunicipios();
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCuatrimestreChange = (index: number, field: keyof CuatrimestreRow, value: string | number) => {
    const newCuatrimestres = [...cuatrimestres];
    newCuatrimestres[index] = {
      ...newCuatrimestres[index],
      [field]: value
    };
    setCuatrimestres(newCuatrimestres);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const expedienteData = {
        ...formData,
        cuatrimestres: cuatrimestres.map(({ id, ...rest }) => rest)
      };
      await expedientesApi.create(expedienteData);
      router.push('/expedientes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el expediente');
    } finally {
      setLoading(false);
    }
  };

  // Handlers para acciones específicas
  const handleGenerarNuevaHoja = () => {
    setCuatrimestres(prev => [...prev, {
      id: generateId(),
      concepto: '',
      multi: 0,
      mini: 0,
      cant: 0,
      inf: '',
      desde: '',
      hasta: '',
      pd: '',
      pa: '',
      rc: '',
      cultivo: ''
    }]);
  };

  const handleImprimirSolicitud = () => {
    // Implementar lógica
    console.log('Imprimir solicitud');
  };

  const handleDeclararActividad = () => {
    // Implementar lógica
    console.log('Declarar actividad');
  };

  const handleCompromisos = () => {
    // Implementar lógica
    console.log('Ver compromisos');
  };

  const handleRellenarA = () => {
    // Implementar lógica
    console.log('Rellenar A');
  };

  const handleRellenarB = () => {
    // Implementar lógica
    console.log('Rellenar B');
  };

  const handleVerMetros = () => {
    // Implementar lógica
    console.log('Ver metros');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <DatosExpedienteForm
            expedienteId={formData.IdExpediente}
            dni={formData.Dni}
            fecha={formData.Fecha}
            lugar={formData.Lugar}
            localidad={formData.Localidad}
            municipioId={formData.IdMunicipio}
            municipios={municipios}
            contadorNombre={formData.ContadorNombre}
            contadorPoliza={formData.ContadorPoliza}
            onFieldChange={handleFieldChange}
            onGenerarNuevaHoja={handleGenerarNuevaHoja}
            onImprimirSolicitud={handleImprimirSolicitud}
            onDeclararActividad={handleDeclararActividad}
            onCompromisos={handleCompromisos}
          />

          <CuatrimestresTable
            rows={cuatrimestres}
            onRowChange={handleCuatrimestreChange}
          />

          <DatosTecnicoForm
            tecnico={formData.Tecnico}
            fechaInforme={formData.FechaInforme}
            observaciones={formData.ObservacionesTecnico || ''}
            onFieldChange={handleFieldChange}
            onRellenarA={handleRellenarA}
            onRellenarB={handleRellenarB}
            onVerMetros={handleVerMetros}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Crear Expediente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
