import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import useAuthStore from "../store/useAuthStore";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        {/* Sidebar ahora es parte del layout principal */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Contenedor principal con margen izquierdo basado en el estado del Sidebar */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <NavBar welcomeMessage="Bienvenido a tu feed" />

          <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            
            {user && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-3">Información del usuario</h2>
                <p className="mb-2"><span className="font-medium">Nombre:</span> {user.name}</p>
                <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}