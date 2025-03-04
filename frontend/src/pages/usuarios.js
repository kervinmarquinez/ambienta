import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import useAuthStore from "../store/useAuthStore";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import UsersList from "@/components/UsersList";

export default function Usuarios() {
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

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica la autenticación
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
          <NavBar welcomeMessage="Encuentra otros usuarios"/>

          <main className="p-6 bg-gray-100 min-h-screen">
            <UsersList />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}