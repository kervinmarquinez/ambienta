import { useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import useAuthStore from "@/store/useAuthStore";
import { logout } from "@/utils/auth";
import { useRouter } from "next/router";
import UserPostsList from "@/components/UserPostsList";
import RecentPostsList from "@/components/RecentPostsList";

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular un pequeño tiempo de carga para mostrar los datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Layout welcomeMessage="Bienvenido a tu feed">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda: Información del usuario y sus publicaciones */}
        <div className="md:col-span-2">
          
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-6"></div>
          ) : (
            user && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-3">Información del Usuario</h2>
                <p className="mb-2"><span className="font-medium">Nombre:</span> {user.name}</p>
                <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
                <p className="mb-2">
                  <span className="font-medium">Descripción:</span> {' '}
                  {user.description || "Aún no has añadido una descripción. Dirígete a Configuración para agregar una."}
                </p>
                <button
                  onClick={() => router.push('/configuracion')}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Editar perfil
                </button>
              </div>
            )
          )}

          {/* Mis publicaciones */}
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <UserPostsList />
          )}
        </div>

        {/* Columna derecha: Publicaciones recientes y consejos */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-3">Publicaciones Recientes</h2>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex flex-col space-y-2">
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <RecentPostsList />
              </div>
            )}
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/explorar')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver todas las publicaciones
              </button>
            </div>
          </div>
          
          {/* Consejos rápidos */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Consejos rápidos</h3>
            <ul className="list-disc list-inside text-sm space-y-2 text-blue-800">
              <li>Añade una descripción a tu perfil para que otros usuarios te conozcan</li>
              <li>Sube fotos de alta calidad para mostrar mejor tus espacios</li>
              <li>Añade información detallada sobre los muebles para ayudar a otros usuarios</li>
              <li>Explora publicaciones para encontrar ideas de decoración</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}