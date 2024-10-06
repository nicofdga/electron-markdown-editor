import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { File } from "./index.d";

// Custom APIs for renderer
const api = {
  openFile: () => ipcRenderer.send('open-markdown'),
  onOpenFile: (callback) => {
    ipcRenderer.on('open-markdown-response', (response) => callback(response));
  },
  saveFile: ({ filename, content }: { filename: string, content: string; }) => ipcRenderer.send('save-markdown', { filename, content }),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
