import React from 'react';
import Link from 'next/link';

export default function UserListItem({ id, name, description, avatar }) {
  return (
    <div className="flex flex-col items-center justify-between bg-white p-4 rounded-lg shadow-sm h-full mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-black">
                <User size={40} />
              </div>
            )}
          </div>
      <h2 className='font-bold'>{name}</h2>
      <p>{description}</p>
      <Link href={`/user/${id}`} className="font-bold  duration-300  bg-primary border-2 border-primary hover:bg-white hover:border-2 hover:border-primary hover:text-primary rounded-2xl br-2 px-8 py-2">
        Ver perfil
      </Link>
    </div>
  );
}