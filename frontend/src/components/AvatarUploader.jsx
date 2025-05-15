import React, { useState } from 'react';
import useAuthStore from "@/store/useAuthStore";
import { Camera } from 'lucide-react';

export default function AvatarUploader() {
  const { user, updateUser, token } = useAuthStore();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Configuración de Cloudinary
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Manejar la selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El tamaño de la imagen no debe exceder 5MB');
        return;
      }

      setError(''); // Limpiar error anterior
      setImage(file);
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error subiendo a Cloudinary:', error);
      throw error;
    }
  };

  // Actualizar avatar en el backend
  const updateAvatar = async (avatarUrl) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update-avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ avatarUrl })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al actualizar el avatar');
      }

      return await response.json();
    } catch (error) {
      console.error('Error actualizando avatar:', error);
      throw error;
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('Por favor selecciona una imagen');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Subir imagen a Cloudinary
      const avatarUrl = await uploadImageToCloudinary(image);
      
      // Actualizar avatar en el backend
      const result = await updateAvatar(avatarUrl);
      
      // Actualizar store con el nuevo avatar
      updateUser({
        ...user,
        avatarUrl
      });
      
      setSuccess('Avatar actualizado exitosamente');
      setImage(null); // Limpiar el campo de archivo
    } catch (error) {
      console.error('Error completo:', error);
      setError('Error al actualizar el avatar: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Cambiar Avatar</h3>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vista previa del avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <Camera size={48} />
              </div>
            )}
          </div>
        </div>
        
        {/* Input para seleccionar archivo */}
        <div className="flex flex-col items-center">
          <label 
            htmlFor="avatar-upload" 
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Seleccionar imagen
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-2">
            Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB
          </p>
        </div>
        
        {/* Botón para enviar */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !image}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300 ${
              (isLoading || !image) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Avatar'}
          </button>
        </div>
      </form>
    </div>
  );
}