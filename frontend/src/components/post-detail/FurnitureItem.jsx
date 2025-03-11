
import React from 'react';

export default function FurnitureItem({ furniture }) {
  return (
    <div>
      <div className="relative">
        <img 
          src={furniture.imageUrl} 
          alt={furniture.name} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        {furniture.price > 0 && (
          <div className="absolute top-3 right-3 bg-white py-1 px-3 rounded-full shadow-md">
            <p className="font-bold text-gray-800">{furniture.price} €</p>
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-2">{furniture.name}</h3>
      
      <div className="flex justify-between items-center">
        {furniture.purchaseLink ? (
          <a 
            href={furniture.purchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-primary border border-primary text-black py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
          >
            Comprar
          </a>
        ) : (
          <span className="text-sm text-gray-500 italic">Sin enlace de compra</span>
        )}
      </div>
    </div>
  );
}