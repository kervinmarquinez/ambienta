import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';

export default function RecentPostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar publicaciones recientes');
        }

        const data = await response.json();
        // Limitamos a las 5 publicaciones más recientes
        const recentPosts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        
        setPosts(recentPosts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRecentPosts();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse flex items-start space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No hay publicaciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer group">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">
                {post.description || "Sin descripción"}
              </p>
              {post.user && (
                <p className="text-xs text-gray-400 mt-1">
                  Por: {post.user.name}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}