// src/components/NavBar.jsx
import React from 'react'
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import { Plus } from 'lucide-react';

export default function NavBar({ welcomeMessage }) {
  const { user } = useAuthStore();
  const { openCreatePostModal } = useModalStore();

  return (
    <div className='flex justify-between items-center p-7 bg-gray-100 border-b border-black'>
      <div><p className='font-bold'>{welcomeMessage}</p></div>

      <div>
        <h2 className='font-bold'>¡Hola {user.name}!</h2>
        <button 
          onClick={openCreatePostModal} 
          className='flex items-center gap-2 hover:text-blue-600 cursor-pointer'
        >
          Nueva publicación<Plus className='hover:rotate-90 duration-300' size={20} />
        </button>
      </div>
    </div>
  )
}