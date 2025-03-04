import React, { useState } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Home, Telescope, Users, UserRoundPen, LogOut, Settings2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { logout } from "../utils/auth";
import { useRouter } from 'next/router';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu button - visible only on small screens */}
      <div className="block lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMobile}
          className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 bg-gray-200 text-white transform transition-all duration-300 ease-in-out flex flex-col
          ${isCollapsed ? 'w-16' : 'w-64'} 
          hidden lg:flex`}
      >
        <div className="p-4 ">
          {!isCollapsed && isAuthenticated && <Link href="/" className='uppercase text-4xl font-heading text-black'>Ambienta</Link>}
        </div>

        <nav className="mt-5 flex-grow">
          <ul>
            <SidebarItem icon={<Home size={20} />} text="Inicio" isCollapsed={isCollapsed} url="/dashboard" />
            <SidebarItem icon={<Telescope size={20} />} text="Explorar" isCollapsed={isCollapsed} url="/explorar" />
            <SidebarItem icon={<Users size={20} />} text="Usuarios" isCollapsed={isCollapsed} url="/usuarios" />
            <SidebarItem icon={<UserRoundPen size={20} />} text="Mi Perfil" isCollapsed={isCollapsed} url="/mi-perfil" />
            <SidebarItem icon={<Settings2 size={20} />} text="Configuración" isCollapsed={isCollapsed} url="/configuracion" />
            <SidebarItem icon={<LogOut size={20} />} text="Cerrar Sesión" isCollapsed={isCollapsed} onClick={handleLogout} />
          </ul>
        </nav>
        
        {/* Collapse/Expand button at the bottom */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={onToggleCollapse}
            className="p-2 rounded-md text-black hover:bg-gray-300 transition-colors"
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar - rest of the code remains the same */}
      {/* ... */}
    </>
  );
};

const SidebarItem = ({ icon, text, isCollapsed, url, onClick }) => {
  return (
    <li className="mb-2">
      <Link 
        href={url || '#'}
        onClick={onClick}
        className="flex items-center py-2 px-4 text-black duration-300 hover:bg-gray-300 hover:text-black "
      >
        <span className="mr-3">{icon}</span>
        {!isCollapsed && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;