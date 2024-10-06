import { ElectronAPI } from '@electron-toolkit/preload'

export interface File {
  filename: string;
  filepath: string;
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => void,
      saveFile: ({ filename, content }: { filename: string, content: string; }) => void
      onOpenFile: (callback: (response: string) => void) => void,
    }
  }
}
