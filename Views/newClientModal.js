// ===============================================
// Modal itself DOM object
// ===============================================
let newClientModal = $('#newClientModal');

// ===============================================
// Create new clients for autocompleting
// ===============================================
window.createNewClient = () => {
    // ===============================================
    // Show New Client Modal
    // ===============================================
    newClientModal.modal('show');
}

// ===============================================
// Modal buttons DOM objects
// ===============================================
let modalCancelButton = $('#modalCancelButton');
let modalAcceptButton = $('#modalAcceptButton');
// ===============================================
// Modal input fields DOM objects
// ===============================================
let modalClientNumber = $('#modalClientNumber');
let modalClientName = $('#modalClientName');

// ===============================================
// Focus to modal client name input feild
// And fill code field with correlative code
// ===============================================
newClientModal.on('shown.bs.modal', () => {
    if (clients.clientList[clients.clientList.length - 1]) {
        modalClientNumber.val(Number(clients.clientList[clients.clientList.length - 1].code) + 1);
    } else {
        modalClientNumber.val(1);
    }
    modalClientName.trigger('focus');
});

// ===============================================
// Handle button events
// ===============================================

// ===============================================
// On Cancel button
// ===============================================
modalCancelButton.click(() => {
    // ===============================================
    // Clear input fields
    // ===============================================
    modalClientName.val('');
});

// ===============================================
// On Accept button
// ===============================================
modalAcceptButton.click((e) => {

    // ===============================================
    // Validate if empty
    // ===============================================
    if (!modalClientNumber.val()) {
        e.preventDefault();
        modalClientNumber.trigger('focus');
        return;
    }

    if (!modalClientName.val()) {
        e.preventDefault();
        modalClientName.trigger('focus');
        return;
    }

    clients.addNewClient({
        name: modalClientName.val(),
        code: modalClientNumber.val()
    });

    modalCancelButton.trigger('click');
});

// ===============================================
// Asume name input field enter as accept click
// ===============================================
modalClientName.keyup((e) => {
    if (e.key === 'Enter') {
        modalAcceptButton.trigger('click');
    }
});