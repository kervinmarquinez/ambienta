import React, { useState } from 'react';
import FurnitureForm from './FurnitureForm';
import FurnitureList from './FurnitureList';
import useAuthStore from '@/store/useAuthStore';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [furnitures, setFurnitures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, token } = useAuthStore();

  // Configuración de Cloudinary
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Subir imagen a Cloudinary usando fetch
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

// Manejar la creación del post completo
const handleCreatePost = async (e) => {
  e.preventDefault();
  
  // Validaciones básicas
  if (!title || !mainImage) {
    alert('Por favor, completa el título y selecciona una imagen principal');
    return;
  }

  setIsLoading(true);

  try {
    // Subir imagen principal a Cloudinary
    const mainImageUrl = await uploadImageToCloudinary(mainImage);

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
      // Usar nombre de campo correcto según tu modelo de Post
      image: mainImageUrl, // o imageUrl según corresponda
      furniture: furnitureData
    };
    
    console.log('Datos a enviar:', postData);

    // Crear post
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    // Obtener la respuesta textual para análisis
    const responseText = await response.text();
    console.log('Respuesta completa del servidor:', responseText);
    
    try {
      // Intentar parsear como JSON
      const responseData = JSON.parse(responseText);
      
      if (!response.ok) {
        console.error('Error del servidor:', responseData);
        throw new Error(responseData.message || 'Error al crear el post');
      }
      
      console.log('Post creado exitosamente:', responseData);

      // Limpiar formulario
      setTitle('');
      setDescription('');
      setMainImage(null);
      setMainImagePreview(null);
      setFurnitures([]);

      alert('Post creado exitosamente');
    } catch (parseError) {
      console.error('Error al procesar la respuesta JSON:', parseError);
      throw new Error('Respuesta del servidor inválida: ' + responseText.substring(0, 100));
    }
  } catch (error) {
    console.error('Error completo:', error);
    alert('Hubo un error al crear el post: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Crear Nuevo Post de Decoración</h2>
      
      <form onSubmit={handleCreatePost}>
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
            Imagen Principal de la Sala
          </label>
          <input
            type="file"
            id="mainImage"
            accept="image/*"
            onChange={handleMainImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          
          {mainImagePreview && (
            <div className="mt-4">
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
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Creando...' : 'Crear Post'}
        </button>
      </form>
    </div>
  );
};