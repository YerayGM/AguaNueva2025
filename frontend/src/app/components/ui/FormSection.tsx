function FormSection({ title, icon, children }) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-verdeCabildo via-blue-400 to-verdeCabildo opacity-10 blur-lg rounded-lg"></div>
      <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-verdeCabildo mb-5 flex items-center">
          {icon}
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

export default FormSection;