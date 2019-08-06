// ===============================================
// Imports
// ===============================================
const { ipcRenderer } = require('electron');

// ===============================================
// Localstorage as local database
// ===============================================
exports.storage = JSON.parse(localStorage.getItem('contacts')) || []

exports.addContact = (data) => {
    // TODO: validate input data
    this.storage.push(data);
};


exports.save = () => {
    localStorage.setItem('contacts', JSON.stringify(this.storage));
};



// ===============================================
// Generate report in EXCEL for showing in POWER BI
// ===============================================
window.generateReport = () => {
    ipcRenderer.send('generaReport', localStorage.getItem('contacts'));
}

ipcRenderer.on('generate-success', (e, path) => {
    console.log(path);
});

ipcRenderer.on('generate-fail', (e, err) => {
    console.log(err);
});




// ===============================================
// Create new clients for autocompleting
// ===============================================
window.createNewClient = () => {
    // ===============================================
    // Show New Client Modal
    // ===============================================
    document.getElementById('newClientModalButton').click();
}