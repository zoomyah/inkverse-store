import { create } from "zustand";

interface UiState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  lastCartBurst: number; // timestamp for triggering cart badge burst
  triggerCartBurst: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  lastCartBurst: 0,
  triggerCartBurst: () => set({ lastCartBurst: Date.now() }),
}));
