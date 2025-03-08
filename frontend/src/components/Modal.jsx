import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Evitar el desplazamiento de la página cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Cabecera del modal */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        {/* Contenido del modal */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}