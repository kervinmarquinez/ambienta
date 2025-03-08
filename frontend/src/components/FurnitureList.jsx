import React from 'react';

export default function FurnitureList({ furnitures, onRemoveFurniture }) {
  if (furnitures.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold mb-2">Muebles Añadidos</h4>
      <div className="grid grid-cols-3 gap-4">
        {furnitures.map((furniture, index) => (
          <div 
            key={index} 
            className="border rounded p-2 relative"
          >
            <img 
              src={furniture.imageUrl || URL.createObjectURL(furniture.image)} 
              alt={furniture.name} 
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-2">
              <p className="font-medium">{furniture.name}</p>
              {furniture.price > 0 && (
                <p className="text-sm text-gray-600">${furniture.price}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemoveFurniture(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}