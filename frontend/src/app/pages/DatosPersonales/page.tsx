import DatosPersonalesTable from "@/app/components/DatosPersonales/DatosPersonalesTable";

export default function DatosPersonalesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-verdeCabildo">Datos Personales</h1>
        <p className="text-gray-600">
          Gestión de información personal de los agricultores
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <DatosPersonalesTable />
      </div>
    </div>
  );
}
