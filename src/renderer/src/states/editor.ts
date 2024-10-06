import { create } from "zustand";

interface State {
    doc: string;
    setDoc: (doc: string) => void;
}

export const useEditorStates = create<State>((set) => ({
    doc: '',
    setDoc: (doc: string) => set(() => ({ doc })),
}))