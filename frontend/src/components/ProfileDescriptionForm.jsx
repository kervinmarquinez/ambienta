import React, { useState } from 'react';
import useAuthStore from "@/store/useAuthStore";

export default function ProfileDescriptionForm() {
  const { user, updateUser, token } = useAuthStore();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    setIsLoading(true);
    
    try {
      // Hacemos un endpoint específico para actualizar solo la descripción
      const response = await fetch('http://localhost:5000/api/users/update-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description })
      });
      
      // Obtener respuesta en texto plano primero para debug
      const responseText = await response.text();
      console.log('Respuesta del servidor (texto):', responseText);
      
      // Intentar parsear como JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error al parsear respuesta JSON:', e);
        throw new Error('Respuesta del servidor inválida');
      }
      
      if (response.ok) {
        updateUser({
          ...user,
          description: description
        });
        
        setSuccess(data.message || 'Descripción actualizada con éxito');
        setDescription(''); // Limpiar el campo después de actualizar
      } else {
        setError(data.message || 'Error al actualizar la descripción');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Error en la comunicación con el servidor: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Actualizar Descripción</h3>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Perfil
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="4"
            placeholder="Edita tu descripción"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Esta descripción aparecerá en tu perfil público</p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Actualizando...' : 'Actualizar Descripción'}
        </button>
      </form>
    </div>
  );
}