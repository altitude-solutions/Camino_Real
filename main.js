const { app, BrowserWindow, ipcMain } = require('electron');
const windowState = require('electron-window-state');
const path = require('path');

// ===============================================
// Import external modules
// ===============================================
const excel = require('excel4node');


// ===============================================
// Import custom modules
// ===============================================
const updater = require('./src/updater');

let mainWindow;

function createWindow() {
    let state = windowState({
        defaultWidth: 775,
        defaultHeight: 510
    });

    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        minWidth: 775,
        minHeight: 520,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });


    mainWindow.loadFile('Views/index.html');

    // Just for development
    mainWindow.webContents.openDevTools();

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
    // ===============================================
    // setTimeout(updater.check, 2000);
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





// ===============================================
// IPC events
// ===============================================

// ===============================================
// Generate report
// ===============================================
ipcMain.on('generaReport', (e, filecontent) => {
    let wb = new excel.Workbook();
    let ws = wb.addWorksheet('Base de datos');

    filecontent = JSON.parse(filecontent);

    // ===============================================
    // Aux variables
    // ===============================================
    let now = new Date();
    let fileName = now.toString();
    let pathToFile = path.join(app.getPath('desktop'), fileName + '.xlsx');

    // ===============================================
    // Fill file with data
    // ===============================================
    ws.cell(1, 1).string('Fecha de contacto');
    ws.cell(1, 2).string('Fecha de registro');
    ws.cell(1, 3).string('Vendedor');
    ws.cell(1, 4).string('Código Cliente');
    ws.cell(1, 5).string('Nombre Cliente');
    ws.cell(1, 6).string('Tipo de Contacto');
    ws.cell(1, 7).string('Primer contacto');
    ws.cell(1, 8).string('Cliente Activo');
    ws.cell(1, 9).string('Respuesta');
    ws.cell(1, 10).string('LEAD');
    ws.cell(1, 11).string('Información adicional');

    ws.column(1).setWidth(16);
    ws.column(2).setWidth(16);
    ws.column(3).setWidth(15);
    ws.column(4).setWidth(15);
    ws.column(5).setWidth(15);
    ws.column(6).setWidth(16);
    ws.column(7).setWidth(16);
    ws.column(8).setWidth(12);
    ws.column(9).setWidth(12);
    ws.column(10).setWidth(12);
    ws.column(11).setWidth(120);

    if (filecontent) {
        for (let i = 0; i < filecontent.length; i++) {
            // ws.cell( row, col ).content
            ws.cell(2 + i, 1).string(filecontent[i].datePicker);
            ws.cell(2 + i, 2).string(`${now.getFullYear()}-${now.getMonth()+1<10?'0':''}${now.getMonth()+1}-${now.getDate()<10?'0':''}${now.getDate()} ${now.getHours()<10?'0': ''}${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`);
            ws.cell(2 + i, 3).string(filecontent[i].seller);

            ws.cell(2 + i, 4).string(filecontent[i].client.split(':')[0]);
            ws.cell(2 + i, 5).string(filecontent[i].client.split(':')[1]);

            ws.cell(2 + i, 6).string(filecontent[i].contactType == 1 ? 'Llamada' : 'Visita');
            ws.cell(2 + i, 7).string(filecontent[i].contactTime == 1 ? 'Si' : 'No');
            ws.cell(2 + i, 8).string(filecontent[i].clientStatus == 1 ? 'Si' : 'No');
            ws.cell(2 + i, 9).string(filecontent[i].answerStatus == 1 ? 'Si' : 'Sin respuesta');
            ws.cell(2 + i, 10).string(filecontent[i].isLead == 1 ? 'Si' : 'No');
            ws.cell(2 + i, 11).string(filecontent[i].extraInfo);
        }

        wb.write(pathToFile, (err, stats) => {
            if (err) {
                e.sender.send('generate-fail', err);
            } else {
                e.sender.send('generate-success', pathToFile);
            }
        });

    } else {
        e.sender.send('generate-fail', 'No hay registros para guardar');
    }
});