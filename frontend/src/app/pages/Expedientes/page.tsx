import ExpedientesTable from "@/app/components/Expedientes/ExpedientesTable";

export default function ExpedientesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-verdeCabildo">Expedientes</h1>
        <p className="text-gray-600">
          Gestión de expedientes de subvención al agua agrícola
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Lista de Expedientes</h2>
            <p className="text-sm text-gray-600">
              Consulta y gestiona los expedientes existentes
            </p>
          </div>
          <a 
            href="/pages/Expedientes/create"
            className="bg-verdeCabildo hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">+</span>
            Nuevo Expediente
          </a>
        </div>
        
        <ExpedientesTable />
      </div>
    </div>
  );
}
