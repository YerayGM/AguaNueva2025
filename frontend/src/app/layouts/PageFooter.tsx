import Image from "next/image";

export default function PageFooter() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo2.png" alt="Logo Cabildo" width={200} height={50}/>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-4 text-gray-300">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-300">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 Cabildo de Fuerteventura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}