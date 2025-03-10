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
  useEffect(() => {
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
  };

  // Renderizado condicional basado en estado
  if (loading) {
    return <div>Cargando tus publicaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (posts.length === 0) {
    return <div>Aún no has creado ninguna publicación.</div>;
  }

  // Componente principal
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Mis Publicaciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg overflow-hidden">
            <Link href={`/post/${post._id}`}>
              <div className="cursor-pointer">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.description}</p>
                </div>
              </div>
            </Link>
            <div className="flex justify-end p-3 border-t">
              <button 
                onClick={(e) => handleEdit(e, post)}
                className="text-blue-500 hover:text-blue-700 mr-4"
                aria-label="Editar post"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={(e) => handleDelete(e, post._id)}
                className="text-red-500 hover:text-red-700"
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