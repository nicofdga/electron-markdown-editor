import { app, dialog } from "electron";
import fs from 'fs';

export const open = async (event) => {
    // Get the user's documents folder
    const documentsPath = app.getPath('documents');

    try {
        // Show the open dialog for selecting a markdown file
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: 'Open Markdown File',
            defaultPath: documentsPath,
            buttonLabel: 'Open',
            properties: ['openFile'],
            filters: [
                { name: 'Markdown Files', extensions: ['md'] },
                { name: 'All Files', extensions: ['*'] },
            ],
        });

        // Handle user canceling the dialog
        if (canceled || filePaths.length === 0) {
            event.sender.send('open-markdown-response', 'No file selected');
            return;
        }

        // Read the content of the selected file
        const filePath = filePaths[0];
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                event.sender.send('open-markdown-response', `Error opening file: ${err.message}`);
            } else {
                event.sender.send('open-markdown-response', data); // Send the content of the file back to renderer
            }
        });
    } catch (err) {
        event.sender.send('open-markdown-response', `Unexpected error: ${err.message}`);
    }
}