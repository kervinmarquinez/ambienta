import { create } from "zustand";
import { persist } from "zustand/middleware"; // Para persistencia

// Store con persistencia para mantener la sesión después de recargar la página
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Acción para iniciar sesión
      login: (userData, token) => set({ 
        user: userData, 
        token, 
        isAuthenticated: true 
      }),
      
      // Acción para actualizar datos del usuario
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
      
      // Acción para cerrar sesión
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: "auth-storage", // Nombre para localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;