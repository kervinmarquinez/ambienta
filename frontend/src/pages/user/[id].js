// frontend/src/pages/user/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "@/layout/Layout";
import useAuthStore from "@/store/useAuthStore";
import { User } from 'lucide-react';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuthStore();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos del usuario
  useEffect(() => {
    // Solo hacer la petición cuando tengamos el ID y el token
    if (id && token) {
      const fetchUserData = async () => {
        try {
          // Petición para obtener datos del usuario
          const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Error al cargar el perfil del usuario');
          }

          const userData = await response.json();
          setUser(userData);

          // Una vez tenemos el usuario, cargamos sus posts
          fetchUserPosts(id);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('No se pudo cargar el perfil del usuario');
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id, token]);

  // Función para cargar los posts del usuario
  const fetchUserPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las publicaciones');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('No se pudieron cargar las publicaciones del usuario');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado condicional basado en el estado
  if (loading) {
    return (
      <Layout welcomeMessage="Perfil de Usuario">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout welcomeMessage="Perfil de Usuario">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout welcomeMessage="Perfil de Usuario">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Usuario no encontrado: </strong>
          <span className="block sm:inline">No pudimos encontrar el perfil que estás buscando.</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout welcomeMessage={`Perfil de ${user.name}`}>
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm mb-6">
          {/* Avatar del usuario */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-black">
                <User size={40} />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 italic">
              {user.description || "Este usuario no tiene descripción"}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de publicaciones del usuario */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Publicaciones de {user.name}</h2>
        
        {posts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 italic">Este usuario no tiene publicaciones todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map(post => (
              <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Link href={`/post/${post._id}`}>
                  <div className="cursor-pointer">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{post.description || "Sin descripción"}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(post.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}