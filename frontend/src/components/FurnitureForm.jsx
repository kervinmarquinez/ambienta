import React, { useState } from 'react';

export default function FurnitureForm({ onAddFurniture }) {
    const [currentFurniture, setCurrentFurniture] = useState({
        name: '',
        purchaseLink: '',
        price: '',
        image: null
      });
    
      // Manejar la selección de imagen de mueble
      const handleFurnitureImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setCurrentFurniture(prev => ({
            ...prev,
            image: file
          }));
        }
      };
    
      // Añadir mueble
      const handleAddFurniture = () => {
        const { name, purchaseLink, price, image } = currentFurniture;
        
        // Validaciones
        if (!name || !image) {
          alert('Por favor, completa el nombre y sube una imagen para el mueble');
          return;
        }
    
        // Llamar a la función de añadir mueble pasada como prop
        onAddFurniture(currentFurniture);
    
        // Limpiar el formulario de mueble
        setCurrentFurniture({
          name: '',
          purchaseLink: '',
          price: '',
          image: null
        });
      };
    
      return (
        <div className="mb-4 border-t pt-4">
          <h3 className="text-xl font-semibold mb-4">Añadir Muebles</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del Mueble"
              value={currentFurniture.name}
              onChange={(e) => setCurrentFurniture(prev => ({
                ...prev, 
                name: e.target.value
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              placeholder="Enlace de Compra (opcional)"
              value={currentFurniture.purchaseLink}
              onChange={(e) => setCurrentFurniture(prev => ({
                ...prev, 
                purchaseLink: e.target.value
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="number"
              placeholder="Precio (opcional)"
              value={currentFurniture.price}
              onChange={(e) => setCurrentFurniture(prev => ({
                ...prev, 
                price: e.target.value
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFurnitureImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <button
            type="button"
            onClick={handleAddFurniture}
            className="mt-2 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Añadir Mueble
          </button>
        </div>
      );
}
