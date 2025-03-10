import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import FurnitureForm from './FurnitureForm';
import FurnitureList from './FurnitureList';
import useAuthStore from '@/store/useAuthStore';

export default function EditPostModal({ isOpen, onClose, post, onPostUpdated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [furnitures, setFurnitures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();

  // Configuración de Cloudinary
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Cargar datos del post cuando el componente se monta o cambia el post
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setDescription(post.description || '');
      setMainImagePreview(post.image || null); // Usamos la propiedad 'image' del post
      setFurnitures(post.furniture || []);
    }
  }, [post]);

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
        throw new Error('Cloudinary upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  // Manejar la selección de imagen principal
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Añadir mueble
  const addFurniture = async (furnitureData) => {
    try {
      // Subir imagen del mueble a Cloudinary
      const imageUrl = await uploadImageToCloudinary(furnitureData.image);

      // Crear objeto de mueble con la URL de la imagen
      const newFurniture = {
        ...furnitureData,
        imageUrl,
        // Mantener también el objeto File para la vista previa
        image: furnitureData.image,
        price: parseFloat(furnitureData.price) || 0
      };

      // Añadir mueble a la lista
      setFurnitures(prev => [...prev, newFurniture]);
    } catch (error) {
      console.error('Error añadiendo mueble:', error);
      alert('Hubo un error al añadir el mueble');
    }
  };

  // Eliminar mueble
  const removeFurniture = (index) => {
    setFurnitures(prev => prev.filter((_, i) => i !== index));
  };

  // Manejar la actualización del post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!title) {
      alert('Por favor, completa el título');
      return;
    }

    setIsLoading(true);

    try {
      let mainImageUrl = post.image; // Por defecto, usar la imagen existente

      // Si hay una nueva imagen, subirla a Cloudinary
      if (mainImage) {
        mainImageUrl = await uploadImageToCloudinary(mainImage);
      }

      // Preparar datos de muebles para enviar
      const furnitureData = furnitures.map(furniture => ({
        name: furniture.name,
        purchaseLink: furniture.purchaseLink || '',
        price: furniture.price || 0,
        imageUrl: furniture.imageUrl
      }));

      // Objeto para enviar a la API
      const postData = {
        title,
        description,
        imageUrl: mainImageUrl, // Usar la URL de la imagen (nueva o existente)
        furniture: furnitureData
      };
      
      console.log('Datos a enviar:', postData);

      // Actualizar el post
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(errorText || 'Error al actualizar el post');
      }
      
      const updatedPost = await response.json();
      console.log('Post actualizado exitosamente:', updatedPost);

      // Notificar al componente padre sobre la actualización exitosa
      if (onPostUpdated) {
        onPostUpdated(updatedPost);
      }

      // Cerrar el modal
      onClose();
      
      alert('Post actualizado exitosamente');
    } catch (error) {
      console.error('Error completo:', error);
      alert('Hubo un error al actualizar el post: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Editar publicación"
    >
      <div className="p-6">
        <form onSubmit={handleUpdatePost}>
          {/* Sección de Información Principal del Post */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa el título del post"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción opcional del post"
              rows="4"
            />
          </div>

          {/* Sección de Imagen Principal */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainImage">
              Imagen Principal (opcional)
            </label>
            <input
              type="file"
              id="mainImage"
              accept="image/*"
              onChange={handleMainImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            
            {mainImagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  {mainImage ? 'Nueva imagen seleccionada:' : 'Imagen actual:'}
                </p>
                <img 
                  src={mainImagePreview} 
                  alt="Vista previa" 
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Sección de Añadir Muebles */}
          <FurnitureForm onAddFurniture={addFurniture} />

          {/* Lista de Muebles Añadidos */}
          <FurnitureList 
            furnitures={furnitures} 
            onRemoveFurniture={removeFurniture} 
          />

          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 font-bold duration-300 bg-primary border-2 border-primary hover:bg-white hover:border-2 hover:border-primary hover:text-primary rounded-2xl br-2 px-8 py-2"
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Post'}
          </button>
        </form>
      </div>
    </Modal>
  );
}