const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              &copy; {currentYear} Agua Nueva - Cabildo de Fuerteventura
            </p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Desarrollado con React + TypeScript + Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer