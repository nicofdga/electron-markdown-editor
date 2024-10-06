import { create } from "zustand";

interface State {
    showPreview: boolean;
    showSettings: boolean;
    enablePreview: () => void;
    openSettings: () => void;
}

export const useAppSettings = create<State>((set) => ({
    showPreview: false,
    showSettings: false,
    enablePreview: () => set((state) => ({ showPreview: !state.showPreview })),
    openSettings: () => set((state) => ({ showSettings: !state.showSettings })),
}))