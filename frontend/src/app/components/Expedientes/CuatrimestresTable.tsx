'use client';

import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

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

interface CuatrimestresTableProps {
  rows: CuatrimestreRow[];
  onRowChange: (index: number, field: keyof CuatrimestreRow, value: string | number) => void;
}

export const CuatrimestresTable = ({ rows, onRowChange }: CuatrimestresTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th colSpan={11} className="px-6 py-3 bg-gray-50 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm font-semibold">1er Cuatrimestre</div>
                <div className="text-sm font-semibold">2º Cuatrimestre</div>
                <div className="text-sm font-semibold">3er Cuatrimestre</div>
              </div>
            </th>
          </tr>
          <tr className="bg-gray-50">
            {[
              'Concepto', 'Multi', 'Mini', 'Cant.', 'Inf.',
              'Desde', 'Hasta', 'PD', 'PA', 'RC', 'Cultivo'
            ].map((header) => (
              <th
                key={header}
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-2 py-1">
                <Select
                  label=""
                  value={row.concepto}
                  onChange={(e) => onRowChange(index, 'concepto', e.target.value)}
                  className="text-sm"
                >
                  <option value="">Seleccionar...</option>
                  <option value="agua">Agua</option>
                  <option value="energia">Energía</option>
                </Select>
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="number"
                  value={row.multi}
                  onChange={(e) => onRowChange(index, 'multi', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="number"
                  value={row.mini}
                  onChange={(e) => onRowChange(index, 'mini', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="number"
                  value={row.cant}
                  onChange={(e) => onRowChange(index, 'cant', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="text"
                  value={row.inf}
                  onChange={(e) => onRowChange(index, 'inf', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="date"
                  value={row.desde}
                  onChange={(e) => onRowChange(index, 'desde', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="date"
                  value={row.hasta}
                  onChange={(e) => onRowChange(index, 'hasta', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="text"
                  value={row.pd}
                  onChange={(e) => onRowChange(index, 'pd', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="text"
                  value={row.pa}
                  onChange={(e) => onRowChange(index, 'pa', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="text"
                  value={row.rc}
                  onChange={(e) => onRowChange(index, 'rc', e.target.value)}
                  className="text-sm"
                />
              </td>
              <td className="px-2 py-1">
                <Input
                  label=""
                  type="text"
                  value={row.cultivo}
                  onChange={(e) => onRowChange(index, 'cultivo', e.target.value)}
                  className="text-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
