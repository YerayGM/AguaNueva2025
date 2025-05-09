import React from "react";
import api from "@/app/api/axios.config"; // Asegúrate de que esta ruta sea correcta y que el archivo axios.config.ts exista y exporte correctamente

interface FormButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void;
}

function FormButtons({ onCancel, onSubmit }: FormButtonsProps) {
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const formData = new FormData((event.target as HTMLElement).closest("form") as HTMLFormElement); // Obtén los datos del formulario
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    try {
      const response = await api.post("/", data); // Usa axios para enviar los datos

      if (response.status === 200) {
        alert("Datos guardados correctamente");
        if (onSubmit) onSubmit(); // Llama a un callback opcional si se pasa
      } else {
        alert("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al guardar los datos");
    }
  };

  return (
    <div className="flex justify-end space-x-4 mt-8">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:shadow-md flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cancelar
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-6 py-3 bg-verdeCabildo text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Guardar
      </button>
      </div>
    );
}

export default FormButtons;
