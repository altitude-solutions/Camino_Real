// ===============================================
// Imports
// ===============================================
const { ipcRenderer } = require('electron');

// ===============================================
// Localstorage as local database
// ===============================================
exports.storage = JSON.parse(localStorage.getItem('contacts')) || []

exports.addContact = (data) => {
    this.storage.push(data);
    localStorage.setItem('contacts', JSON.stringify(this.storage));
};

// ===============================================
// Generate report in EXCEL for showing in POWER BI
// ===============================================
window.generateReport = () => {
    ipcRenderer.send('generateReport', this.storage);
};