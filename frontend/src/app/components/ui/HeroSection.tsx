function HeroSection({ title, description }) {
  return (
    <div className="text-center mb-12 animate-fade-in-down">
      <div className="inline-block mb-6 relative">
        <div className="absolute inset-0 bg-verdeCabildo opacity-5 blur-xl rounded-full"></div>
        <h1 className="relative text-3xl md:text-4xl font-bold mb-4 text-verdeCabildo tracking-tight">
          {title}
        </h1>
      </div>
      <p className="text-gray-600 text-lg mb-6 max-w-3xl mx-auto font-light">
        {description}
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-verdeCabildo to-blue-400 mx-auto rounded-full"></div>
    </div>
  );
}

export default HeroSection;