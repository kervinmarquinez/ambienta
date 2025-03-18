// src/layout/Layout.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import Sidebar from '../components/SideBar';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import CreatePost from '../components/CreatePost';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Layout({ children, welcomeMessage = "Bienvenido" }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { isCreatePostModalOpen, closeCreatePostModal } = useModalStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar si estamos en un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint md de Tailwind
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    // Comprobar al cargar
    checkMobile();

    // Escuchar cambios de tamaño de pantalla
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Manejar la creación exitosa de un post
  const handlePostCreated = (newPost) => {
    closeCreatePostModal();
    // Aquí podrías también mostrar un mensaje de éxito o refrescar datos
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar con diferente comportamiento en móvil vs. desktop */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobile={isMobile}
        />

        <div 
          className={`flex-1 transition-all duration-300 
            ${isMobile ? 'w-full' : isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}
        >
          <NavBar welcomeMessage={welcomeMessage} isMobile={isMobile} />

          <main className="p-3 md:p-6 bg-gray-100 min-h-screen">
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