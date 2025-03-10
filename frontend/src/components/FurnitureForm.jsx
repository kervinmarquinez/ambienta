import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FurnitureForm({ onAddFurniture }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
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
        
        // Opcional: puedes mantener el formulario abierto o cerrarlo después de añadir
        // setIsFormVisible(false);
    };
    
    // Función para alternar la visibilidad del formulario
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    
    return (
        <div className="mb-4 border-t pt-4">
            {/* Botón para mostrar/ocultar el formulario */}
            <button 
                type="button"
                onClick={toggleFormVisibility}
                className="flex items-center gap-2 text-xl font-semibold mb-4 hover:text-blue-600 transition-colors duration-200"
            >
                Añadir Muebles
                <Plus 
                    className={`transition-transform duration-300 ${isFormVisible ? 'rotate-45' : ''}`} 
                    size={24} 
                />
            </button>
            
            {/* Formulario colapsable */}
            {isFormVisible && (
                <div className="grid grid-cols-2 gap-4 transition-all duration-300 ease-in-out">
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
                    
                    <button
                        type="button"
                        onClick={handleAddFurniture}
                        className="col-span-2 font-bold  duration-300  bg-primary border-2 border-primary hover:bg-white hover:border-2 hover:border-primary hover:text-primary rounded-2xl br-2 px-8 py-2"
                    >
                        Añadir Mueble
                    </button>
                </div>
            )}
        </div>
    );
}