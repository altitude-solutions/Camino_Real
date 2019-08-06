const { remote } = require('electron');


let menuTemplate = [{
        label: "Herramientas",
        submenu: [{
                label: "Nuevo cliente",
                click: window.createNewClient,
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: "Generar Excel",
                click: window.generateReport,
                accelerator: 'CmdOrCtrl+G'
            }
        ]
    },
    {
        label: 'Borrar',
        click: () => {
            localStorage.removeItem('contacts');
        }
    }
];

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