import { ipcMain } from 'electron';
import { save } from './ipc/save';
import { open } from './ipc/open';

export function setupIpcHandlers(): void {
    ipcMain.on('save-markdown', async (event, data) => save(event, data));
    ipcMain.on('open-markdown', async (event) => open(event));
}