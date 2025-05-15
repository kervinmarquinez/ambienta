import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuthStore from '../store/useAuthStore';


export default function ExplorePostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/posts`, {
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
        console.error('Error fetching posts:', error);
        setError('No se pudieron cargar las publicaciones');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAllPosts();
    }
  }, [token]);

  if (loading) {
    return <div className="text-center py-10">Cargando publicaciones...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">No hay publicaciones disponibles.</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Publicaciones Recientes</h2>
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
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.description}</p>
                  
                  {post.user && (
                    <div className="mt-2 flex items-center">
                      <span className="flex items-center text-sm">
                   <span className="font-medium text-gray-700">{post.user.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}