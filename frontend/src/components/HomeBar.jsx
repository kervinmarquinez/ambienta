import React from 'react'
import Link from 'next/link'

export default function HomeBar() {
  return (
    <nav className='flex justify-between items-center p-7 border-b border-black '>

      <div><Link href="/" className='uppercase text-4xl font-heading'>Ambienta</Link></div>
      <div className='flex items-center space-x-10'>
        <Link className="text-black font-bold" href="/login">Iniciar sesión</Link>
        <Link className="font-bold duration-300  bg-primary border-2 border-primary hover:bg-gray-100 hover:border-2 hover:border-primary rounded-2xl br-2 px-8 py-2" href="/register">Registro</Link>
      </div>

    </nav>
  )
}
