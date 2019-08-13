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

exports.getLast = () => {
    return {
        contact: this.storage[this.storage.length - 1],
        index: this.storage.length - 1
    };
};


exports.updateContact = (index, update) => {
    this.storage[index] = update
    localStorage.setItem('contacts', JSON.stringify(this.storage));
}