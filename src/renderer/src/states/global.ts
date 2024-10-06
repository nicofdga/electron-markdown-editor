import { create } from "zustand";

interface State {
    files: string[];
    setFiles: (files: string[]) => void;
}

export const useAppGlobalState = create<State>((set) => ({
    files: [],
    setFiles: (files) => set((state) => ({ files })),
}))