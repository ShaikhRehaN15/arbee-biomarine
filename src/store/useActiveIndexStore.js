import { create } from 'zustand';

export const useActiveIndexStore = create((set) => ({
  activeIndex: 2,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
