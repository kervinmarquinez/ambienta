import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

export default function Configuracion() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [description, setDescription] = useState(user?.description || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated, router]);

  useEffect(() => {
    setDescription(user?.description || '');
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluir el token en los encabezados
        },
        body: JSON.stringify({ description, currentPassword, newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user); // Actualizar el usuario en el store
        setSuccess('Perfil actualizado exitosamente');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      setError('Error al conectarse con el servidor');
    }
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
          <NavBar welcomeMessage="Aquí puedes cambiar tu descripción o tu contraseña" />

          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-6">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form onSubmit={handleUpdateProfile} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
                Actualizar Perfil
              </button>
            </form>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}