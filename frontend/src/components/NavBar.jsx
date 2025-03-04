import React from 'react'
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function NavBar({welcomeMessage}) {

  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className='flex justify-between items-center p-7 bg-gray-100 border-b border-black'>
      <div><p className='font-bold'>{welcomeMessage}</p></div>

      <div>
        <h2 className='font-bold'>¡Hola {user.name}!</h2>
        <Link className='flex items-center gap-2' href="/new">Nueva publicación<Plus className='hover:rotate-90 duration-300' size={20} /></Link>
      </div>
    </div>
  )
}
