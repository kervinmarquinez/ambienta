import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import { Plus, User } from 'lucide-react';

export default function NavBar({ welcomeMessage }) {
  const { user } = useAuthStore();
  const { openCreatePostModal } = useModalStore();
  const [isMobile, setIsMobile] = useState(false);

  // Detect if screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 md:p-7 bg-gray-100 border-b border-black'>
      {/* Welcome message - centered on mobile */}
      <div className="w-full md:w-auto text-center md:text-left mb-3 md:mb-0">
        <p className='font-bold text-lg md:text-xl'>{welcomeMessage}</p>
      </div>

      {/* User info and new post button */}
      <div className='flex flex-col md:flex-row items-center md:items-end space-y-2 md:space-y-0 md:space-x-4'>
        <div className="flex items-center space-x-3">
          <Link href="/mi-perfil">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-black">
                  <User size={16} />
                </div>
              )}
            </div>
          </Link>
          <h2 className='font-bold'>¡Hola {user?.name || 'Usuario'}!</h2>
        </div>
        <div className="flex items-center space-x-3">
        <button 
          onClick={openCreatePostModal} 
          className='flex items-center gap-2 hover:text-blue-600 cursor-pointer md:bg-transparent px-4 py-1 md:p-0 md:rounded-none transition-all duration-300'
        >
          Nueva publicación
          <Plus className='hover:rotate-90 duration-300' size={isMobile ? 16 : 20} />
        </button>
        </div>
      </div>
    </div>
  );
}