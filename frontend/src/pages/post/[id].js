// src/pages/post/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "@/layout/Layout";
import useAuthStore from "@/store/useAuthStore";
import FurnitureList from '@/components/post-detail/FurnitureList';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuthStore();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo hacer la petición cuando tengamos el ID y el token
    if (id && token) {
      const fetchPostData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Error al cargar los detalles del post');
          }

          const postData = await response.json();
          setPost(postData);
        } catch (error) {
          console.error('Error fetching post data:', error);
          setError('No se pudo cargar el post');
        } finally {
          setLoading(false);
        }
      };

      fetchPostData();
    }
  }, [id, token]);

  // Los componentes de FurnitureItem y FurnitureList ahora están en archivos separados

  // Renderizado condicional basado en el estado
  if (loading) {
    return (
      <Layout welcomeMessage="Detalles del Post">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center w-full max-w-4xl">
            <div className="h-12 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 w-full bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout welcomeMessage="Detalles del Post">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout welcomeMessage="Detalles del Post">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Post no encontrado: </strong>
          <span className="block sm:inline">No pudimos encontrar el post que estás buscando.</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout welcomeMessage={post.title}>
      <div className="max-w-5xl mx-auto">
        {/* Información del autor */}
        {post.user && (
          <div className="mb-6">
            <Link href={`/user/${post.user._id}`}>
              <div className="flex items-center space-x-4 cursor-pointer">

                <div>
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-sm text-gray-500">
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
        )}

        {/* Imagen principal */}
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Título y descripción */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {post.description && (
            <p className="text-gray-700 text-sm">{post.description}</p>
          )}
        </div>

        {/* Muebles del post */}
        <FurnitureList furnitures={post.furniture} />

        {/* Botón para volver */}
        <div className="mt-8 mb-4">
          <button 
            onClick={() => router.back()} 
            className="bg-primary border-2 border-primary hover:bg-white hover:text-black text-black px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Volver
          </button>
        </div>
      </div>
    </Layout>
  );
}