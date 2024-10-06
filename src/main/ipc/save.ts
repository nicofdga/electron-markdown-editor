import { app, dialog } from 'electron';
import fs from 'fs';
import path from 'path';

export const save = (event, data) => {
    // Get the user's documents directory and use it as a default path for saving
    const defaultFilePath = path.resolve(app.getPath('documents'), data?.filename);

    // Show save dialog to allow user to select where to save the file
    dialog.showSaveDialog({
        title: 'Save Markdown File',
        defaultPath: defaultFilePath,
        buttonLabel: 'Save',
        filters: [
            { name: 'Markdown File', extensions: ['md'] },
        ],
    }).then((value) => {
        // Check if the user canceled the dialog
        if (value.canceled || !value.filePath) {
            event.sender.send('save-markdown-response', 'Save operation was canceled by the user.');
            return;
        }

        // Write the Markdown content to the selected file
        fs.writeFile(value.filePath, data?.content, (err) => {
            if (err) {
                event.sender.send('save-markdown-response', `Error writing to file: ${err.message}`);
            } else {
                event.sender.send('save-markdown-response', `Markdown file written successfully: ${value.filePath}`);
            }
        });
    }).catch((err) => {
        // Handle any unexpected errors from the dialog
        event.sender.send('save-markdown-response', `Unexpected error: ${err.message}`);
    });
}