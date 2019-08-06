// ===============================================
// Imports
// ===============================================
const register = require('./reg');
const clients = require('./clients');

// ===============================================
// DOM field elements
// ===============================================
let datePicker = document.getElementById('datePicker');
let seller = document.getElementById('seller');
let client = document.getElementById('client');
let contactType = document.getElementById('contactType');
let contactTime = document.getElementById('contactTime');
let clientStatus = document.getElementById('clientStatus');
let answerStatus = document.getElementById('answerStatus');
let isLead = document.getElementById('isLead');
let extraInfo = document.getElementById('extraInfo');
let clientSuggestionList = document.getElementById('clientSuggestionList');
// ===============================================
// DOM input groups
// ===============================================
let clientInputGroup = document.getElementById('clientInputGroup');
let contactTypeInputGroup = document.getElementById('contactTypeInputGroup');
let activeClientInputGroup = document.getElementById('activeClientInputGroup');
let responseInputGroup = document.getElementById('responseInputGroup');
let leadInputGroup = document.getElementById('leadInputGroup');
// ===============================================
// DOM controller elements
// ===============================================
let clearButton = document.getElementById('clearButton');
let saveButton = document.getElementById('saveButton');
let newClientModalButton = document.getElementById('newClientModalButton');
// ===============================================
// DOM graph element
// ===============================================
let diagram = document.getElementById('diagram');


// ===============================================
// Modal DOM elements
// ===============================================
let modalClientID = document.getElementById('modalClientID');
let modalClientName = document.getElementById('modalClientName');
let modalCancelButton = document.getElementById('modalCancelButton');
let modalAcceptButton = document.getElementById('modalAcceptButton');



// ===============================================
// Clear fields
// ===============================================
let clearFields = () => {
    datePicker.value = '';
    // seller.value = '';
    client.value = '';
    contactType.value = '0';
    contactTime.value = '0';
    clientStatus.value = '0';
    answerStatus.value = '0';
    isLead.value = '0';
    extraInfo.value = '';
}



// ===============================================
// Create entry
// ===============================================
saveButton.addEventListener('click', () => {
    let data = {
        datePicker: datePicker.value,
        seller: seller.value,
        client: client.value,
        contactType: contactType.value,
        contactTime: contactTime.value,
        clientStatus: clientStatus.value,
        answerStatus: answerStatus.value,
        isLead: isLead.value,
        extraInfo: extraInfo.value
    };
    console.log(data);

    register.addContact(data);
    register.save();

    clearFields();
});

clearButton.addEventListener('click', clearFields);


// ===============================================
// Clear modal fields
// ===============================================
let clearModal = () => {
    modalClientID.value = '';
    modalClientName.value = '';
}

// ===============================================
// Modal Cancel button listener
// ===============================================
modalCancelButton.addEventListener('click', () => {
    clearModal();
});

// ===============================================
// Modal Accept button listener
// ===============================================
modalAcceptButton.addEventListener('click', () => {
    clients.addNewClient({
        code: modalClientID.value,
        name: modalClientName.value
    });
    clearModal();
    modalCancelButton.click();
});

// ===============================================
// Name modal enter keystroke as accept
// ===============================================
modalClientName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') modalAcceptButton.click();
});


// ===============================================
// Make Client suggestions
// ===============================================
client.addEventListener('input', (e) => {
    if (client.value) {
        let suggestions = clients.getClientSuggestion(client.value);
        while (clientSuggestionList.firstChild) {
            clientSuggestionList.removeChild(clientSuggestionList.firstChild);
        }

        for (let i = 0; i < suggestions.length; i++) {
            let opt = document.createElement('option');
            opt.value = `${suggestions[i].code}: ${suggestions[i].name}`;
            clientSuggestionList.appendChild(opt);
        }
    } else {
        while (clientSuggestionList.firstChild) {
            clientSuggestionList.removeChild(clientSuggestionList.firstChild);
        }
    }
});

// ===============================================
// Input flow control for data input
// ===============================================
contactTime.addEventListener('input', (e) => {

    if (contactTime.value === '1') {
        // ===============================================
        // New Contact by default
        // ===============================================
        newClientModalButton.click();

    } else {
        // ===============================================
        // Select a registered client
        // ===============================================

    }

});