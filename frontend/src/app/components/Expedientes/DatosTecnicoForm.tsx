'use client';

import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface DatosTecnicoFormProps {
  tecnico: string;
  fechaInforme: string;
  observaciones: string;
  onFieldChange: (field: string, value: string) => void;
  onRellenarA: () => void;
  onRellenarB: () => void;
  onVerMetros: () => void;
}

export const DatosTecnicoForm = ({
  tecnico,
  fechaInforme,
  observaciones,
  onFieldChange,
  onRellenarA,
  onRellenarB,
  onVerMetros,
}: DatosTecnicoFormProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Datos del Técnico</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Técnico"
            name="Tecnico"
            value={tecnico}
            onChange={(e) => onFieldChange('Tecnico', e.target.value)}
          />
          <Input
            label="Fecha Informe"
            type="date"
            name="FechaInforme"
            value={fechaInforme}
            onChange={(e) => onFieldChange('FechaInforme', e.target.value)}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones del Técnico
            </label>
            <textarea
              name="ObservacionesTecnico"
              value={observaciones}
              onChange={(e) => onFieldChange('ObservacionesTecnico', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-verdeCabildo focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button onClick={onRellenarA} variant="secondary">
            Rellenar A
          </Button>
          <Button onClick={onRellenarB} variant="secondary">
            Rellenar B
          </Button>
          <Button onClick={onVerMetros} variant="primary">
            Ver Metros
          </Button>
        </div>
      </div>
    </div>
  );
};
