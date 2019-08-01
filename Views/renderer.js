// ===============================================
// Imports
// ===============================================
const register = require('./reg');

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
// ===============================================
// DOM controller elements
// ===============================================
let clearButton = document.getElementById('clearButton');
let saveButton = document.getElementById('saveButton');
// ===============================================
// DOM graph element
// ===============================================
let diagram = document.getElementById('diagram');


// Set date to current date
datePicker.value = new Date();


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

function clearFields() {
    datePicker.value = '';
    seller.value = '';
    client.value = '';
    contactType.value = '0';
    contactTime.value = '0';
    clientStatus.value = '0';
    answerStatus.value = '0';
    isLead.value = '0';
    extraInfo.value = '';
}

clearButton.addEventListener('click', clearFields);