// ===============================================
// Electron imports
// ===============================================
const { app, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// ===============================================
// Import excel module
// ===============================================
const excel = require('excel4node');


// ===============================================
// IPC events
// ===============================================

// ===============================================
// Generate report
// ===============================================
ipcMain.on('generateReport', (e, filecontent) => {
    // ===============================================
    // Opciones para las listas de seleccion multiple
    // ===============================================
    let listaActivo = ['', 'Si', 'No'];
    let lsitaMotivo = ['', 'Primer contacto', 'Seguimiento específico', 'Seguimiento a tarifario entregado', 'Seguimiento a propuesta entragada', 'LEAD', 'Contactado por cliente'];
    let listaContesta = ['', 'Si', 'No'];
    let listaRespuesta = ['', 'Tarifario', 'Primera propuesta', 'Nueva propuesta', 'Reserva', 'No le interesa', 'No puede hablar - Volver a contactar', 'Otros'];

    // Create excel workbook
    let wb = new excel.Workbook({
        author: 'Microsoft Office User'
    });
    // Add a sheet to the workbook
    let ws = wb.addWorksheet('Base de datos');

    // ===============================================
    // Current time and date
    // ===============================================
    let now = new Date();
    let fileName = now.toString();
    // File name based on current date and system desktop path
    let pathToFile = path.join(app.getPath('desktop'), fileName + '.xlsx');

    // ===============================================
    // Start Excel document
    // ===============================================
    // Column titiles
    ws.cell(1, 1).string('Fecha de Contacto');
    ws.cell(1, 2).string('Fecha de Registro');
    ws.cell(1, 3).string('Vendedor');
    ws.cell(1, 4).string('Código Cliente');
    ws.cell(1, 5).string('Nombre Cliente');
    ws.cell(1, 6).string('Cliente Activo');
    ws.cell(1, 7).string('Motivo');
    ws.cell(1, 8).string('Contesta');
    ws.cell(1, 9).string('Respuesta');
    ws.cell(1, 10).string('Respuesta Otro');
    ws.cell(1, 11).string('Fecha de Entrada');
    ws.cell(1, 12).string('Fecha de Salida');
    ws.cell(1, 13).string('Número de Cuartos');
    ws.cell(1, 14).string('Persona Encargada');
    ws.cell(1, 15).string('Teléfono');
    ws.cell(1, 16).string('Email');
    ws.cell(1, 17).string('Información Seguimiento');
    ws.cell(1, 18).string('Fecha Próximo Contacto');
    ws.cell(1, 19).string('Comentarios');

    if (filecontent[0]) {
        // Datos del reporte
        for (let i = 0; i < filecontent.length; i++) {
            ws.cell(2 + i, 1).string(filecontent[i].fechaDeContacto);
            ws.cell(2 + i, 2).date(now);
            ws.cell(2 + i, 3).string(filecontent[i].vendedor);
            ws.cell(2 + i, 4).string(filecontent[i].codigoCliente);
            ws.cell(2 + i, 5).string(filecontent[i].nombreCliente);
            ws.cell(2 + i, 6).string(listaActivo[Number(filecontent[i].clienteActivo)]);
            ws.cell(2 + i, 7).string(lsitaMotivo[Number(filecontent[i].motivo)]);
            ws.cell(2 + i, 8).string(listaContesta[Number(filecontent[i].contesta)]);
            ws.cell(2 + i, 9).string(listaRespuesta[Number(filecontent[i].respuesta)]);
            if (filecontent[i].otraRespuesta) {
                ws.cell(2 + i, 10).string(filecontent[i].otraRespuesta);
            } else {
                ws.cell(2 + i, 10).string('-');
            }
            ws.cell(2 + i, 11).string(filecontent[i].fechaDeEntrada);
            ws.cell(2 + i, 12).string(filecontent[i].fechaDeSalida);
            ws.cell(2 + i, 13).string(filecontent[i].cuartos);
            ws.cell(2 + i, 14).string(filecontent[i].personaACargo);
            ws.cell(2 + i, 15).string(filecontent[i].numeroTelefonico);
            ws.cell(2 + i, 16).string(filecontent[i].personaemail);
            ws.cell(2 + i, 17).string(filecontent[i].informaicionAdicional);
            ws.cell(2 + i, 18).string(filecontent[i].fechaProximoContacto);
            ws.cell(2 + i, 19).string(filecontent[i].comentarios);

        }


        // Save File to system desktop
        wb.writeToBuffer().then(buffer => {
            // Use fs node module to write the file
            // fs.writeFileSync(pathToFile, buffer);
            fs.open(pathToFile, 'w', (err, file) => {
                if (err) {
                    dialog.showErrorBox('No se pudo generar el reporte', `${err}`);
                } else {
                    fs.write(pathToFile, buffer, (err) => {
                        if (err) {
                            dialog.showErrorBox('No se pudo generar el reporte', `${err}`);
                        } else {
                            dialog.showMessageBox({
                                title: 'Éxito',
                                message: 'El archivo se ha guardado exitosamente.'
                            });
                        }
                    });
                }
                fs.close(file, (err) => {
                    dialog.showErrorBox('Error de escritura', `${err}`);
                });
            });
        });
        // wb.write(pathToFile, (err, stats) => {
        //     if (err) {
        //         dialog.showErrorBox('No se pudo generar el reporte', `${err}`);
        //     } else {
        //         dialog.showMessageBox({
        //             title: 'Éxito',
        //             message: 'El archivo se guardo con éxito.'
        //         });
        //     }
        // });
    } else {
        dialog.showErrorBox('No hay datos', 'Imposible generar reportes.\nNo se han generado datos.');
    }
});



// ===============================================
// Load client list from and excel file
// ===============================================
// TODO: falta cargar el archivo. De momento solo muestra el path hacia el archivo
ipcMain.on('loadClientList', (e) => {
    // ===============================================
    // Select file
    // ===============================================
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        title: 'Importar clientes',
        defaultPath: app.getPath('documents'),
        filters: [
            { name: 'Excel', extensions: ['xlsx', 'xls'] },
            { name: 'Todos los archivos', extensions: ['*'] }
        ]
    }, (res) => {
        console.log(res[0]); // show path to file
    });
});