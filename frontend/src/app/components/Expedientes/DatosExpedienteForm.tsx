'use client';

import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Municipio } from '@/app/types/DatosPersonales';

interface DatosExpedienteFormProps {
  expedienteId: string;
  dni: string;
  fecha: string;
  lugar: string;
  localidad: string;
  municipioId: string;
  municipios: Municipio[];
  contadorNombre: string;
  contadorPoliza: string;
  onFieldChange: (field: string, value: string) => void;
  onGenerarNuevaHoja: () => void;
  onImprimirSolicitud: () => void;
  onDeclararActividad: () => void;
  onCompromisos: () => void;
}

export const DatosExpedienteForm = ({
  expedienteId,
  dni,
  fecha,
  lugar,
  localidad,
  municipioId,
  municipios,
  contadorNombre,
  contadorPoliza,
  onFieldChange,
  onGenerarNuevaHoja,
  onImprimirSolicitud,
  onDeclararActividad,
  onCompromisos,
}: DatosExpedienteFormProps) => {
  return (
    <div className="space-y-6">
      {/* Sección Superior */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
          <Input
            label="ID Expediente"
            name="IdExpediente"
            value={expedienteId}
            onChange={(e) => onFieldChange('IdExpediente', e.target.value)}
            required
          />
          <Input
            label="DNI"
            name="Dni"
            value={dni}
            onChange={(e) => onFieldChange('Dni', e.target.value)}
            required
          />
          <Input
            label="Fecha"
            type="date"
            name="Fecha"
            value={fecha}
            onChange={(e) => onFieldChange('Fecha', e.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={onGenerarNuevaHoja} variant="primary" size="sm">
            Generar Nueva Hoja
          </Button>
          <Button onClick={onImprimirSolicitud} variant="secondary" size="sm">
            Imprimir Solicitud
          </Button>
          <Button onClick={onDeclararActividad} variant="secondary" size="sm">
            Declaración Actividad
          </Button>
          <Button onClick={onCompromisos} variant="secondary" size="sm">
            Compromisos
          </Button>
        </div>
      </div>

      {/* Datos del Solicitante */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Datos del Solicitante</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Lugar"
            name="Lugar"
            value={lugar}
            onChange={(e) => onFieldChange('Lugar', e.target.value)}
          />
          <Input
            label="Localidad"
            name="Localidad"
            value={localidad}
            onChange={(e) => onFieldChange('Localidad', e.target.value)}
          />
          <Select
            label="Municipio"
            name="IdMunicipio"
            value={municipioId}
            onChange={(e) => onFieldChange('IdMunicipio', e.target.value)}
            required
          >
            <option value="">Seleccione un municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio.id} value={municipio.id}>
                {municipio.nombre}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Datos del Contador */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Datos del Contador</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contador a nombre de"
            name="ContadorNombre"
            value={contadorNombre}
            onChange={(e) => onFieldChange('ContadorNombre', e.target.value)}
          />
          <Input
            label="Nº Póliza"
            name="ContadorPoliza"
            value={contadorPoliza}
            onChange={(e) => onFieldChange('ContadorPoliza', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
