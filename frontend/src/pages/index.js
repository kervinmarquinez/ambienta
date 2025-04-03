// src/pages/index.js
import HomeBar from "@/components/HomeBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HomeBar />
      <div className="flex flex-col md:flex-row p-4 md:p-7 items-center">
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold mb-4 md:mb-0 md:grow-3">CREA. INSPIRA.</h1>
        <p className="md:grow-0 text-sm md:text-base">
        Descubre, comparte e inspira con diseños únicos para tu hogar. Ambienta es la plataforma donde los <br></br>amantes del diseño de interiores pueden subir sus espacios decorados, explorar ideas y encontrar inspiración para transformar cualquier rincón.
        </p>
      </div>

      <div className="bg-[url(/hero.webp)] flex-grow bg-cover bg-center rounded-t-2xl mt-4">
        {/* Botones móviles para registro y login */}

      </div>
    </div>
  );
}