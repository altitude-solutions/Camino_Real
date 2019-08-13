// ===============================================
// Electron imports
// ===============================================
const { app, ipcMain, dialog } = require('electron');
const path = require('path');

// ===============================================
// Import excel module
// ===============================================
const excel = require('excel4node');
// TODO: migrade all excel operations from excel4node to xlsx
const excelWriter = require('xlsx');



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
    let listaTipoContacto = ['', 'Llamada', 'Visita'];
    let listaContesta = ['', 'Si', 'No'];
    let listaRespuesta = ['', 'Tarifario', 'Primera propuesta', 'Nueva propuesta', 'Reserva', 'No le interesa', 'No puede hablar - Volver a contactar', 'Otros'];

    // Create excel workbook
    let wb = new excel.Workbook({
        author: 'Altitude Solutions S.R.L.'
    });
    // Add a sheet to the workbook
    let ws = wb.addWorksheet('Base de datos');
    let ws2 = wb.addWorksheet('Registro de acciones');


    // Check if is 'save' or 'save as'
    let pathToFile;
    if (filecontent.lastPathToFile) {
        pathToFile = filecontent.lastPathToFile
    } else {
        pathToFile = dialog.showSaveDialogSync({
            defaultPath: app.getPath('documents'),
            filters: [
                { name: 'Excel', extensions: ['xlsx', 'xls'] },
                { name: 'Todos los archivos', extensions: ['*'] }
            ]
        });
        if (!pathToFile) return;
        if (!pathToFile.split('.')[1]) pathToFile += '.xlsx';

        e.sender.send('setLastPathToFile', { lastPathToFile: pathToFile });
    }


    // ===============================================
    // Start 'Base de datos spreadsheet'
    // ===============================================
    // Column titiles
    ws.cell(1, 1).string('Fecha de Contacto');
    ws.cell(1, 2).string('Fecha de Registro');
    ws.cell(1, 3).string('Vendedor');
    ws.cell(1, 4).string('Código Cliente');
    ws.cell(1, 5).string('Nombre Cliente');
    ws.cell(1, 6).string('Cliente Activo');
    ws.cell(1, 7).string('Motivo');
    ws.cell(1, 8).string('Tipo de Contacto');
    ws.cell(1, 9).string('Contesta');
    ws.cell(1, 10).string('Respuesta');
    ws.cell(1, 11).string('Respuesta Otro');
    ws.cell(1, 12).string('Fecha de Entrada');
    ws.cell(1, 13).string('Fecha de Salida');
    ws.cell(1, 14).string('Número de Cuartos');
    ws.cell(1, 15).string('Persona Encargada');
    ws.cell(1, 16).string('Teléfono');
    ws.cell(1, 17).string('Email');
    ws.cell(1, 18).string('Información Seguimiento');
    ws.cell(1, 19).string('Fecha Próximo Contacto');
    ws.cell(1, 20).string('Comentarios');

    if (filecontent.registroContactos[0]) {
        // Datos del reporte
        for (let i = 0; i < filecontent.registroContactos.length; i++) {
            if (filecontent.registroContactos[i].fechaDeContacto) {
                ws.cell(2 + i, 1).string(filecontent.registroContactos[i].fechaDeContacto);
            } else {
                ws.cell(2 + i, 1).number(0);
            }
            ws.cell(2 + i, 2).date(new Date(filecontent.registroContactos[i].fechaDeRegistro));
            ws.cell(2 + i, 3).string(filecontent.registroContactos[i].vendedor);
            ws.cell(2 + i, 4).number(Number(filecontent.registroContactos[i].codigoCliente));
            ws.cell(2 + i, 5).string(filecontent.registroContactos[i].nombreCliente);
            ws.cell(2 + i, 6).string(listaActivo[Number(filecontent.registroContactos[i].clienteActivo)]);
            ws.cell(2 + i, 7).string(lsitaMotivo[Number(filecontent.registroContactos[i].motivo)]);
            ws.cell(2 + i, 8).string(listaTipoContacto[Number(filecontent.registroContactos[i].tipoDeContacto)]);
            ws.cell(2 + i, 9).string(listaContesta[Number(filecontent.registroContactos[i].contesta)]);
            ws.cell(2 + i, 10).string(listaRespuesta[Number(filecontent.registroContactos[i].respuesta)]);
            if (filecontent.registroContactos[i].otraRespuesta) {
                ws.cell(2 + i, 11).string(filecontent.registroContactos[i].otraRespuesta);
            } else {
                ws.cell(2 + i, 11).string('-');
            }
            if (filecontent.registroContactos[i].fechaDeEntrada) {
                try {
                    ws.cell(2 + i, 12).string(filecontent.registroContactos[i].fechaDeEntrada);
                } catch (error) {
                    ws.cell(2 + i, 12).number(0);
                }
            } else {
                ws.cell(2 + i, 12).number(0);
            }
            if (filecontent.registroContactos[i].fechaDeSalida) {
                try {
                    ws.cell(2 + i, 13).string(filecontent.registroContactos[i].fechaDeSalida);
                } catch (error) {
                    ws.cell(2 + i, 13).number(0);
                }
            } else {
                ws.cell(2 + i, 13).number(0);
            }
            if (filecontent.registroContactos[i].cuartos) {
                ws.cell(2 + i, 14).number(Number(filecontent.registroContactos[i].cuartos));
            } else {
                ws.cell(2 + i, 14).string('-');
            }
            if (filecontent.registroContactos[i].personaACargo) {
                ws.cell(2 + i, 15).string(filecontent.registroContactos[i].personaACargo);
            } else {
                ws.cell(2 + i, 15).string('-');
            }
            if (filecontent.registroContactos[i].numeroTelefonico) {
                ws.cell(2 + i, 16).string(filecontent.registroContactos[i].numeroTelefonico);
            } else {
                ws.cell(2 + i, 16).string('-');
            }
            if (filecontent.registroContactos[i].personaemail) {
                ws.cell(2 + i, 17).string(filecontent.registroContactos[i].personaemail);
            } else {
                ws.cell(2 + i, 17).string('-');
            }
            if (filecontent.registroContactos[i].informaicionAdicional) {
                ws.cell(2 + i, 18).string(filecontent.registroContactos[i].informaicionAdicional);
            } else {
                ws.cell(2 + i, 18).string('-');
            }
            if (filecontent.registroContactos[i].fechaProximoContacto) {
                try {
                    ws.cell(2 + i, 19).string(filecontent.registroContactos[i].fechaProximoContacto);
                } catch (error) {
                    ws.cell(2 + i, 19).number(0);
                }
            } else {
                ws.cell(2 + i, 19).number(0);
            }
            if (filecontent.registroContactos[i].comentarios) {
                ws.cell(2 + i, 20).string(filecontent.registroContactos[i].comentarios);
            } else {
                ws.cell(2 + i, 20).string('-');
            }
        }

        // ===============================================
        // Start 'Registro de acciones spreadsheet'
        // ===============================================
        // Column titles
        ws2.cell(1, 1).string('Fecha de Creación');
        ws2.cell(1, 2).string('Fecha Límite')
        ws2.cell(1, 3).string('Cliente');
        ws2.cell(1, 4).string('Solicitud');
        ws2.cell(1, 5).string('Empleado asignado');
        ws2.cell(1, 6).string('Completado');

        // Data
        for (let i = 0; i < filecontent.registroAcciones.length; i++) {
            if (filecontent.registroAcciones[i].fechaDeCreacion) {
                try {
                    ws2.cell(2 + i, 1).date(new Date(filecontent.registroAcciones[i].fechaDeCreacion));
                } catch (error) {
                    ws2.cell(2 + i, 1).number(0);
                }
            } else {
                ws2.cell(2 + i, 1).number(0);
            }
            if (filecontent.registroAcciones[i].fechaLimite) {
                try {
                    ws2.cell(2 + i, 2).date(new Date(filecontent.registroAcciones[i].fechaLimite));
                } catch (error) {
                    ws2.cell(2 + i, 2).number(0);
                }
            } else {
                ws2.cell(2 + i, 2).number(0);
            }
            if (filecontent.registroAcciones[i].cliente) {
                ws2.cell(2 + i, 3).string(filecontent.registroAcciones[i].cliente.split(': ')[1]);
            } else {
                ws2.cell(2 + i, 3).string('-');
            }
            if (filecontent.registroAcciones[i].pedido) {
                ws2.cell(2 + i, 4).string(listaRespuesta[Number(filecontent.registroAcciones[i].pedido)]);
            } else {
                ws2.cell(2 + i, 4).string('-');
            }
            if (filecontent.registroAcciones[i].vendedor) {
                ws2.cell(2 + i, 5).string(filecontent.registroAcciones[i].vendedor);
            } else {
                ws2.cell(2 + i, 5).string('-');
            }
            if (filecontent.registroAcciones[i].entregado === false || filecontent.registroAcciones[i].entregado === true) {
                ws2.cell(2 + i, 6).string(filecontent.registroAcciones[i].entregado == '0' ? 'Pendiente' : 'Entregado');
            } else {
                ws2.cell(2 + i, 6).string('Pendiente');
            }
        }


        // ===============================================
        // Save File to selected path
        // ===============================================
        wb.write(pathToFile, (err, stats) => {
            if (err) {
                dialog.showErrorBox('No se pudo generar el reporte', `${err}`);
            }
        });

    } else {
        dialog.showErrorBox('No hay datos', 'Imposible generar reportes.\nNo se han generado datos.');
    }
});



// ===============================================
// Load client list from and excel file
// ===============================================
ipcMain.on('importClientList', (e) => {
    // ===============================================
    // Select file
    // ===============================================
    dialog.showOpenDialog({
        properties: ['openFile'],
        title: 'Importar clientes',
        defaultPath: app.getPath('documents'),
        filters: [
            { name: 'Excel', extensions: ['xlsx', 'xls'] },
            { name: 'Todos los archivos', extensions: ['*'] }
        ]
    }, (res) => {
        if (!res[0]) return;
        if (res[0].split('.')[res[0].split('.').length - 1] === 'xlsx' || res[0].split('.')[res[0].split('.').length - 1] === 'xls') {
            let workbook = excelWriter.readFile(res[0]);
            if (workbook.SheetNames.includes('Categoria PowerBI')) {
                // console.log(excelWriter.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[workbook.SheetNames.indexOf('Categoria PowerBI')]]));
                e.sender.send('clientListContent', excelWriter.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[workbook.SheetNames.indexOf('Categoria PowerBI')]]));
            } else {
                console.log('No existe');
            }
        } else {
            dialog.showErrorBox('Error leyendo el archivo', `${res[0]} no es un archivo válido.\nLas extenciones aceptadas son: xlsx y xls`);
        }
    });
});


// ===============================================
// Export client list to Excel
// ===============================================
ipcMain.on('exportClientList', (e, data) => {

    let pathToFile = dialog.showSaveDialogSync({
        defaultPath: app.getPath('documents'),
        filters: [
            { name: 'Excel', extensions: ['xlsx', 'xls'] },
            { name: 'Todos los archivos', extensions: ['*'] }
        ]
    });

    if (!pathToFile) return;
    if (!pathToFile.split('.')[1]) pathToFile += '.xlsx';

    // Workbook
    let wb = new excel.Workbook({
        author: 'Altitude Solutions S.R.L.'
    });

    let ws = wb.addWorksheet('Clientes');
    ws.cell(1, 1).string('Cod Cliente');
    ws.cell(1, 2).string('Nombre Cliente');

    ws.column(2).setWidth(50);

    for (let i = 0; i < data.length; i++) {
        ws.cell(2 + i, 1).number(Number(data[i].code));
        ws.cell(2 + i, 2).string(data[i].name);
    }


    wb.write(pathToFile, (err, stats) => {
        if (err) {
            dialog.showErrorBox('No se pudo generar el reporte', `${err}`);
        }
    });
});