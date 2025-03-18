import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function HomeBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className='relative flex justify-between items-center p-4 md:p-7 border-b border-black'>
      {/* Logo */}
      <div>
        <Link href="/" className='uppercase text-2xl md:text-4xl font-heading'>Ambienta</Link>
      </div>
      
      {/* Desktop navigation */}
      <div className='hidden md:flex items-center space-x-10'>
        <Link className="text-black font-bold" href="/login">Iniciar sesión</Link>
        <Link className="font-bold duration-300 bg-primary border-2 border-primary hover:bg-gray-100 hover:border-2 hover:border-primary rounded-2xl br-2 px-8 py-2" href="/register">Registro</Link>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 focus:outline-none"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white z-50 border-b border-black">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              className="text-black font-bold py-2 text-center"
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
            <Link 
              className="font-bold duration-300 bg-primary border-2 border-primary hover:bg-gray-100 hover:border-2 hover:border-primary rounded-2xl py-2 text-center"
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
            >
              Registro
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}