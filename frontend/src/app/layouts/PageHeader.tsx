import Link from "next/link";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-md sticky top-0 z-10 border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image src="/images/logo2.png" alt="Logo Cabildo" width={200} height={40} />
          </Link>
        </div>
      </div>
    </header>
  );
}