import React from 'react';

export default function PersonaCard({ title, icon, children }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100">
      {/* Efecto de resplandor en hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-   via-blue-400 to-verdeCabildo opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 group-hover:duration-500"></div>
    
      <div className="relative p-6">
        <h4 className="text-lg font-bold text-verdeCabildo mb-4 group-hover:text-blue-600 transition-colors duration-300 flex items-center">
          {icon}
          {title}
        </h4>
        
        {children}
      </div>
    </div>
  );
}