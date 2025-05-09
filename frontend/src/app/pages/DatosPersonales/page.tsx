'use client';

import { useState } from 'react';
import PageHeader from '@/app/layouts/PageHeader';
import PageFooter from '@/app/layouts/PageFooter';
import HeroSection from '@/app/components/ui/HeroSection';
import FormPanel from '@/app/components/DatosPersonales/FormPanel';
import HelpSection from '@/app/components/ui/HelpSection';
import DatosPersonalesTable from '@/app/components/DatosPersonales/DatosPersonalesTable';
import DatosPersonalesForm from '@/app/components/DatosPersonales/DatosPersonalesForm';

export default function DatosPersonalesPage() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <PageHeader />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <HeroSection 
          title="DATOS PERSONALES"
          description="Gestión de información personal de los agricultores para subvenciones de agua agrícola"
        />

        <FormPanel 
          showForm={showForm} 
          toggleForm={toggleForm}
        >
          {showForm ? (
            <DatosPersonalesForm onCancel={toggleForm} />
          ) : (
            <DatosPersonalesTable />
          )}
        </FormPanel>
        
        <HelpSection 
          title="¿Necesitas ayuda?"
          description="Contamos con un equipo de soporte para ayudarte con el registro de datos personales."
        />
      </main>

      <PageFooter />
    </div>
  );
}