"use client";
import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  hideLoading: () => set({ isLoading: false }),
  showLoading: () => set({ isLoading: true }),
}));

export default useLoadingStore;
