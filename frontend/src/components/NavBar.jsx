import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import { Plus } from 'lucide-react';

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
      <div className='flex flex-col items-center md:items-end'>
        <h2 className='font-bold mb-2 md:mb-1'>¡Hola {user?.name || 'Usuario'}!</h2>
        <button 
          onClick={openCreatePostModal} 
          className='flex items-center gap-2 hover:text-blue-600 cursor-pointer  md:bg-transparent px-4 py-1 md:p-0 md:rounded-none transition-all duration-300'
        >
          Nueva publicación
          <Plus className='hover:rotate-90 duration-300' size={isMobile ? 16 : 20} />
        </button>
      </div>
    </div>
  );
}