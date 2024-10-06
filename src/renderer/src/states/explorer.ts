import { create } from "zustand";

export interface File {
    filename: string;
    filepath: string;
}

// Define the type for the Zustand store
interface State {
    currentFile: File | null; // The currently active file
    files: Map<string, File>; // A Map to hold all files, keyed by filename
    setFiles: (newFiles: Map<string, File>) => void; // Method to set the files state
    setCurrentFile: (newFile: File | null) => void; // Method to set the current active file
    addOrUpdateFile: (newFile: { key: string; file: File; }) => void; // Method to add or update a file
    removeFile: (filename: string) => void; // Method to remove a file by filename
    getFiles: () => File[]; // Method to get files as an array
}

// Create the Zustand store
export const useExplorerStates = create<State>((set, get) => ({
    currentFile: null,
    files: new Map(),

    setFiles: (newFiles) => set(() => ({ files: newFiles })),

    setCurrentFile: (newFile) => set(() => ({ currentFile: newFile })),

    // Add or update a file in the Map
    addOrUpdateFile: (newFile) =>
        set((state) => {
            state.files.set(newFile.key, newFile.file);
            return { files: new Map(state.files) }; // Create a new Map to ensure immutability
        }),


    // Remove a file from the Map by filename
    removeFile: (filename) =>
        set((state) => {
            const updatedFiles = new Map(state.files);
            updatedFiles.delete(filename);
            return { files: updatedFiles };
        }),

    // Get all files as an array
    getFiles: () => Array.from(get().files.values()),
}));
