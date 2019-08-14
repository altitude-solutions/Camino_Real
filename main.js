// ===============================================
// Electron imports
// ===============================================
const { app, BrowserWindow } = require('electron');
const windowState = require('electron-window-state');


// ===============================================
// Run excel config
// ===============================================
require('./src/excelManager');


// ===============================================
// Import custom modules
// ===============================================
const updater = require('./src/updater');

let mainWindow;

function createWindow() {
    let state = windowState({
        defaultWidth: 1920,
        defaultHeight: 1080
    });

    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        minWidth: 1280,
        minHeight: 720,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });


    mainWindow.loadFile('Views/index.html');

    // Just for development
    if (process.env.HOTEL_ENVIRONMENT === 'dev') {
        mainWindow.webContents.openDevTools();
    }

    state.manage(mainWindow);

    mainWindow.on('ready-to-show', mainWindow.show);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


app.on('ready', () => {
    // ===============================================
    // Create window
    // ===============================================
    createWindow();

    // ===============================================
    // Check for updates after 2 seconds from app ready event
    // NOTE: Only if it is on production enviroment
    // ===============================================
    if (process.env.HOTEL_ENVIRONMENT !== 'dev') {
        setTimeout(updater.check, 2000);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});