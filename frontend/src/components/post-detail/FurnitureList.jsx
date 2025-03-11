
import React from 'react';
import FurnitureItem from './FurnitureItem';

export default function FurnitureList({ furnitures }) {
  if (!furnitures || furnitures.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Muebles en esta imagen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {furnitures.map((item, index) => (
          <FurnitureItem key={index} furniture={item} />
        ))}
      </div>
    </div>
  );
}