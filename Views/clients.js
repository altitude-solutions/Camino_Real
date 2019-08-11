// ===============================================
// Imports
// ===============================================

// ===============================================
// Localstorage as local database
// ===============================================
exports.clientList = JSON.parse(localStorage.getItem('clients')) || []


// ===============================================
// Create a new Client
// ===============================================
exports.addNewClient = (client) => {
    this.clientList.push(client);
    localStorage.setItem('clients', JSON.stringify(this.clientList));
};


// ===============================================
// Check if tomethig matches and return possible options
// ===============================================
exports.getClientSuggestion = (token) => {
    let suggestion = [];
    Array.from(this.clientList).forEach(client => {
        if (client.name.toLowerCase().includes(token) || client.name.toUpperCase().includes(token)) {
            // if (client.name.toLowerCase().includes(token) || client.name.includes(token) || client.name.toUpperCase().includes(token)) {
            suggestion.push(client);
        } else {
            if (client.code.includes(token)) {
                suggestion.push(client);
            }
        }
    });
    return suggestion;
}