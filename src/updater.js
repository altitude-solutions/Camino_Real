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
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-available', () => {
        let downloadProgress = 0;

        dialog.showMessageBox({
            type: 'info',
            title: 'Actualización Disponible',
            message: 'Una nueva versión de la applicación esta disponible.\n¿Desea actualizar ahora?',
            buttons: ['Actualizar', 'No']
        }, (buttonIndex) => {
            if (buttonIndex !== 0) return;

            autoUpdater.downloadUpdate();

            let progressWin = new BrowserWindow({
                width: 350,
                height: 35,
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

            autoUpdater.on('dowload-progress', (d) => {
                downloadProgress = d.percent;
            });

            autoUpdater.on('update-downloaded', () => {
                if (progressWin) progressWin.close();

                dialog.showMessageBox({
                    type: 'info',
                    title: 'Actualizacion Lista',
                    message: 'Una nueva versión esta lista.\n¿Salir e instalar?',
                    buttons: ['Si', 'Más tarde']
                }, (i) => {
                    if (i === 0) autoUpdater.quitAndInstall();
                });
            });
        });
    });
};