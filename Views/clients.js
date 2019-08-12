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
    token = token.toLowerCase();
    let suggestion = [];

    // This does the same
    suggestion = this.clientList.filter(client => {
        return client.name.toLowerCase().includes(token) || client.code.includes(token);
    });

    return suggestion;
}