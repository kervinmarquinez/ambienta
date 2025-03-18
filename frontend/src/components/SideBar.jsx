import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Home, Telescope, Users, UserRoundPen, LogOut, Settings2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { logout } from "../utils/auth";
import { useRouter } from 'next/router';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileOpen(false);
  }, [router.pathname]);

  // Gestionar el evento de cambio de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

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
          className="p-2 rounded-md bg-white text-gray-800 shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay - darkens the rest of the screen when menu is open */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobile}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar for desktop */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 bg-gray-100 text-gray-800 transform transition-all duration-300 ease-in-out flex flex-col
          ${isCollapsed ? 'w-16' : 'w-64'} 
          hidden lg:flex`}
      >
        <div className="p-4">
          {!isCollapsed && isAuthenticated && (
            <Link href="/" className='uppercase text-3xl font-heading text-black block truncate'>
              Ambienta
            </Link>
          )}
          {isCollapsed && (
            <Link href="/" className='text-2xl font-heading text-black flex justify-center'>
              A
            </Link>
          )}
        </div>

        <nav className="mt-5 flex-grow">
          <ul>
            <SidebarItem icon={<Home size={20} />} text="Inicio" isCollapsed={isCollapsed} url="/dashboard" isActive={router.pathname === '/dashboard'} />
            <SidebarItem icon={<Telescope size={20} />} text="Explorar" isCollapsed={isCollapsed} url="/explorar" isActive={router.pathname === '/explorar'} />
            <SidebarItem icon={<Users size={20} />} text="Usuarios" isCollapsed={isCollapsed} url="/usuarios" isActive={router.pathname === '/usuarios'} />
            <SidebarItem icon={<UserRoundPen size={20} />} text="Mi Perfil" isCollapsed={isCollapsed} url="/mi-perfil" isActive={router.pathname === '/mi-perfil'} />
            <SidebarItem icon={<Settings2 size={20} />} text="Configuración" isCollapsed={isCollapsed} url="/configuracion" isActive={router.pathname === '/configuracion'} />
            <SidebarItem icon={<LogOut size={20} />} text="Cerrar Sesión" isCollapsed={isCollapsed} onClick={handleLogout} />
          </ul>
        </nav>
        
        {/* Collapse/Expand button at the bottom */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={onToggleCollapse}
            className="p-2 rounded-md text-black hover:bg-gray-200 transition-colors"
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar - full width, slides in from left */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 bg-gray-100 w-64 transform transition-transform duration-300 lg:hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <Link href="/" className='uppercase text-2xl font-heading text-black'>
            Ambienta
          </Link>
          <button 
            onClick={toggleMobile}
            className="p-2 rounded-md hover:bg-gray-200"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-5">
          <ul>
            <SidebarItem icon={<Home size={20} />} text="Inicio" isCollapsed={false} url="/dashboard" isActive={router.pathname === '/dashboard'} />
            <SidebarItem icon={<Telescope size={20} />} text="Explorar" isCollapsed={false} url="/explorar" isActive={router.pathname === '/explorar'} />
            <SidebarItem icon={<Users size={20} />} text="Usuarios" isCollapsed={false} url="/usuarios" isActive={router.pathname === '/usuarios'} />
            <SidebarItem icon={<UserRoundPen size={20} />} text="Mi Perfil" isCollapsed={false} url="/mi-perfil" isActive={router.pathname === '/mi-perfil'} />
            <SidebarItem icon={<Settings2 size={20} />} text="Configuración" isCollapsed={false} url="/configuracion" isActive={router.pathname === '/configuracion'} />
            <SidebarItem icon={<LogOut size={20} />} text="Cerrar Sesión" isCollapsed={false} onClick={handleLogout} />
          </ul>
        </nav>

        {/* User info at bottom for mobile */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const SidebarItem = ({ icon, text, isCollapsed, url, onClick, isActive = false }) => {
  const content = (
    <div 
      className={`flex items-center py-2 px-4 text-black duration-300 hover:bg-gray-300 hover:text-black 
        ${isActive ? 'bg-gray-200 font-medium' : ''} 
        ${isCollapsed ? 'justify-center' : 'justify-start'}`}
    >
      <span className={isCollapsed ? '' : 'mr-3'}>{icon}</span>
      {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{text}</span>}
    </div>
  );

  if (onClick) {
    return (
      <li className="mb-1">
        <button 
          onClick={onClick}
          className="w-full text-left"
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li className="mb-1">
      <Link href={url || '#'}>
        {content}
      </Link>
    </li>
  );
};

export default Sidebar;