// ===============================================
// Imports
// ===============================================
const { ipcRenderer } = require('electron');

// ===============================================
// Localstorage as local database
// ===============================================
exports.clientList = JSON.parse(localStorage.getItem('clients')) || []

exports.addNewClient = (client) => {
    // TODO: validate input data
    this.clientList.push(client);
    localStorage.setItem('clients', JSON.stringify(this.clientList));
};

exports.getClientSuggestion = (token) => {
    let suggestion = [];

    Array.from(this.clientList).forEach(client => {
        if (client.name.toLowerCase().includes(token) || client.name.includes(token) || client.name.toUpperCase().includes(token)) {
            suggestion.push(client);
        } else {
            if (client.code.includes(token)) {
                suggestion.push(client);
            }
        }
    });
    return suggestion;
}