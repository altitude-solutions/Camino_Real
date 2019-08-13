const { autoUpdater } = require('electron-updater');
const { dialog, BrowserWindow, ipcMain } = require('electron');

// ===============================================
// Disble autodownload
// ===============================================
autoUpdater.autoDownload = false;


// ===============================================
// Check for updates
// ===============================================
exports.check = () => {

    // ===============================================
    // Check for updates
    // ===============================================
    autoUpdater.checkForUpdates();


    // ===============================================
    // If an update is available notify
    // ===============================================
    autoUpdater.on('update-available', () => {
        let downloadProgress = 0;

        // ===============================================
        // Ask if update or not
        // ===============================================
        dialog.showMessageBox({
            type: 'info',
            title: 'Actualización Disponible',
            message: 'Una nueva versión de la applicación esta disponible.\n¿Desea actualizar ahora?',
            buttons: ['Actualizar', 'No']
        }, (buttonIndex) => {
            if (buttonIndex !== 0) return;

            // ===============================================
            // If 'Actualizar' is clicked start download
            // ===============================================
            autoUpdater.downloadUpdate();

            // ===============================================
            // Create a windows to show downloading progress
            // ===============================================
            let progressWin = new BrowserWindow({
                width: 350,
                // height: 80,
                height: 120,
                useContentSize: true,
                autoHideMenuBar: true,
                minimizable: false,
                fullscreen: false,
                fullscreenable: false,
                resizable: false
            });

            progressWin.loadURL(`file://${__dirname}/Views/progress.html`);
            progressWin.on('close', () => {
                progressWin = null;
            });

            ipcMain.on('download-progress-request', (e) => {
                e.returnValue = downloadProgress;
            });

            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent;
            });

            // ===============================================
            // When download is finished ask whether to install now or later
            // ===============================================
            autoUpdater.on('update-downloaded', () => {
                if (progressWin) progressWin.close();

                dialog.showMessageBox({
                    type: 'info',
                    title: 'Actualizacion Lista',
                    message: 'Una nueva versión esta lista.\n¿Salir e instalar?',
                    buttons: ['Si', 'Más tarde']
                }, (i) => {
                    // ===============================================
                    // If 'Now' is clicked quit and install
                    // ===============================================
                    if (i === 0) autoUpdater.quitAndInstall();
                });
            });
        });
    });
};