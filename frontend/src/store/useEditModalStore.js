
import { create } from "zustand";

const useEditModalStore = create((set) => ({
  isEditPostModalOpen: false,
  currentPost: null,
  
  // Abrir el modal con un post específico
  openEditPostModal: (post) => set({ 
    isEditPostModalOpen: true, 
    currentPost: post 
  }),
  
  // Cerrar el modal
  closeEditPostModal: () => set({ 
    isEditPostModalOpen: false, 
    currentPost: null 
  }),
}));

export default useEditModalStore;