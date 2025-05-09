function HelpSection({ title, description }) {
  return (
    <section className="bg-blue-50 rounded-3xl p-6 md:p-8 mb-16 shadow-inner">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold text-verdeCabildo mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 md:mb-0">{description}</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-verdeCabildo text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contactar
          </button>
        </div>
      </div>
    </section>
  );
}

export default HelpSection;