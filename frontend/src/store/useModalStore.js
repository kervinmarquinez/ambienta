// src/store/useModalStore.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isCreatePostModalOpen: false,
  openCreatePostModal: () => set({ isCreatePostModalOpen: true }),
  closeCreatePostModal: () => set({ isCreatePostModalOpen: false }),
}));

export default useModalStore;