import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuthStore from '../store/useAuthStore';
import useEditModalStore from '../store/useEditModalStore';
import { Edit, Trash2 } from 'lucide-react';
import EditPostModal from './EditPostModal';

export default function UserPostsList() {
  // Hooks de estado
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hooks personalizados - siempre en el mismo orden y nivel superior
  const { token, user } = useAuthStore();
  const { 
    isEditPostModalOpen, 
    currentPost, 
    closeEditPostModal, 
    openEditPostModal 
  } = useEditModalStore();

  // Función para obtener los posts del usuario
  const fetchUserPosts = async () => {
    try {
      // Hacer la petición para obtener los posts del usuario
      const response = await fetch(`http://localhost:5000/api/posts/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('No se pudieron cargar tus publicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchUserPosts();
    }
  }, [user, token]);

  // Función para manejar la edición
  const handleEdit = (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    openEditPostModal(post);
  };

  // Función para manejar la eliminación
  const handleDelete = async (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el post');
        }

        // Eliminar el post de la lista local
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        console.error('Error eliminando post:', error);
        alert('No se pudo eliminar la publicación');
      }
    }
  };

  // Función para manejar la actualización exitosa
  const handlePostUpdated = (updatedPost) => {
    // Actualizar la lista local de posts
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
    
    // También podemos refrescar toda la lista para asegurarnos de tener los datos más recientes
    fetchUserPosts();
  };

  // Renderizado condicional basado en estado
  if (loading) {
    return <div className="py-4 text-center text-gray-600">Cargando tus publicaciones...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-600">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 mb-4">Aún no has creado ninguna publicación.</p>
        <button 
          onClick={() => document.getElementById('create-post-button')?.click()}
          className="bg-primary text-black hover:bg-white hover:text-primary border border-primary px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Crear mi primera publicación
        </button>
      </div>
    );
  }

  // Componente principal
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Mis Publicaciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
            <Link href={`/post/${post._id}`}>
              <div className="cursor-pointer flex-grow">
                {/* Añadir clave única para forzar re-renderizado de la imagen cuando cambia */}
                <div className="relative w-full pt-[66%]"> {/* Aspect ratio 3:2 */}
                  <img 
                    src={`${post.image}?${new Date(post.updatedAt).getTime()}`} 
                    alt={post.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg line-clamp-1">{post.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2 h-10">
                    {post.description || "Sin descripción"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex justify-end p-3 border-t">
              <button 
                onClick={(e) => handleEdit(e, post)}
                className="text-blue-500 hover:text-blue-700 mr-4 p-1 rounded-full hover:bg-blue-50 transition-colors duration-300"
                aria-label="Editar post"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={(e) => handleDelete(e, post._id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-300"
                aria-label="Eliminar post"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar post */}
      <EditPostModal 
        isOpen={isEditPostModalOpen} 
        onClose={closeEditPostModal}
        post={currentPost}
        onPostUpdated={handlePostUpdated}
      />
    </div>
  );
}