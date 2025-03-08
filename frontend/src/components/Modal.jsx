import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Variantes de animación para el overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Variantes de animación para el contenedor del modal
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95, 
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div 
            className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={e => e.stopPropagation()} // Prevenir que clicks en el modal cierren el modal
          >
            {/* Cabecera del modal */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">{title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200"
              >
                &times;
              </button>
            </div>
            
            {/* Contenido del modal */}
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}