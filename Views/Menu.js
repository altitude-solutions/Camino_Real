const { remote } = require('electron');


let menuTemplate = [{
    label: "Herramientas",
    submenu: [{
            label: "Nuevo cliente",
            click: window.createNewClient,
            accelerator: 'CmdOrCtrl+N'
        },
        {
            label: "Generar reporte",
            click: window.generateReport,
            accelerator: 'CmdOrCtrl+S'
        },
        {
            type: 'separator'
        },
        {
            label: 'Importar clientes',
            click: () => {
                ipcRenderer.send('importClientList');
            }
        },
        {
            label: 'Exportar clientes',
            click: () => {
                ipcRenderer.send('exportClientList', JSON.parse(localStorage.getItem('clients')));
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Borrar base de datos',
            click: () => {
                remote.dialog.showMessageBox({
                    title: 'Borrar base de datos',
                    message: 'Esta acción tiene efecto permanente. No se podrán recuperar los datos eliminados.',
                    buttons: ['Cancelar', 'Borrar']
                }, (index) => {
                    if (index === 0) return;
                    deleteHotelDatabase();
                });
            }
        }
    ]
}];

if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: remote.app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });
}

const menu = remote.Menu.buildFromTemplate(menuTemplate);
remote.Menu.setApplicationMenu(menu);