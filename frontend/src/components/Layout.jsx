// src/components/Layout.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import Sidebar from './SideBar';
import NavBar from './NavBar';
import Modal from './Modal';
import CreatePost from './CreatePost';
import ProtectedRoute from './ProtectedRoute';

export default function Layout({ children, welcomeMessage = "Bienvenido" }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { isCreatePostModalOpen, closeCreatePostModal } = useModalStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Manejar la creación exitosa de un post
  const handlePostCreated = (newPost) => {
    closeCreatePostModal();
    // Aquí podrías también mostrar un mensaje de éxito o refrescar datos
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <NavBar welcomeMessage={welcomeMessage} />

          <main className="p-6 bg-gray-100 min-h-screen">
            {children}
          </main>
        </div>
      </div>

      {/* Modal para crear post - disponible en todas las páginas */}
      <Modal 
        isOpen={isCreatePostModalOpen} 
        onClose={closeCreatePostModal}
        title="Crear nueva publicación"
      >
        <CreatePost onPostCreated={handlePostCreated} />
      </Modal>
    </ProtectedRoute>
  );
}