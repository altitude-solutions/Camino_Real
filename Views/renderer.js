// ===============================================
// Electron imports
// ===============================================
const { ipcRenderer } = require('electron');

// ===============================================
// Imports
// ===============================================
let contacts = require('./reg');
let clients = require('./clients');
let tasks = require('./tasks');

// ===============================================
// Delet database function
// ===============================================
function deleteHotelDatabase() {
    // Delete contacts
    contacts.storage = [];
    localStorage.removeItem('contacts');
    // Delete Clients
    clients.clientList = [];
    localStorage.removeItem('clients');
    // Delete tasks
    tasks.taskList = [];
    localStorage.removeItem('tasks');
}

// ===============================================
// Import clients success
// ===============================================
ipcRenderer.on('clientListContent', (e, clientList) => {
    for (let i = 0; i < clientList.length; i++) {
        console.log(`Código: ${clientList[i]['Cod Cliente']}, Nombre: ${clientList[i]['Cliente']}`);
        clients.addNewClient({
            name: String(clientList[i]['Cliente']),
            code: String(clientList[i]['Cod Cliente'])
        });
    }
});


// ===============================================
// Generate report in EXCEL for showing in POWER BI
// ===============================================
window.generateReport = () => {
    ipcRenderer.send('generateReport', {
        registroContactos: contacts.storage,
        registroAcciones: tasks.taskList
    });
};


// ===============================================
// Load modal config
// ===============================================
require('./newClientModal');

// ===============================================
// Global container DOM Object
// ===============================================
let container = $('#content');

// ===============================================
// First tab config
// ===============================================
document.getElementById('firstTab').addEventListener('click', () => {
    // ===============================================
    // Set first tab selector as active
    // ===============================================
    document.getElementById('secondTab').classList.remove('active');
    document.getElementById('firstTab').classList.add('active');

    // ===============================================
    // Create and show first tab
    // ===============================================
    let html = '';
    html += '<div class="row">';
    html += '    <div class="col-3">';
    html += '        <h3 class="text-justify">Información general</h3>';
    html += '        <div class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <span class="input-group-text" id="saleDate">Fecha</span>';
    html += '            </div>';
    html += '            <input id="datePicker" type="date" class="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="saleDate">';
    html += '        </div>';
    html += '        <div class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <span class="input-group-text" id="sellerID">Vendedor</span>';
    html += '            </div>';
    html += '            <input id="sellerName" type="text" class="form-control" placeholder="Vendedor" aria-label="Vendedor" aria-describedby="sellerID">';
    html += '        </div>';
    html += '        <div id="clientInputGroup" class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <span class="input-group-text" id="clientID">Cliente</span>';
    html += '            </div>';
    html += '            <input id="clientName" type="text" class="form-control" placeholder="Cliente" aria-label="Cliente" list="clientSuggestionList" aria-describedby="clientID">';
    html += '            <datalist id="clientSuggestionList"></datalist>';
    html += '        </div>';
    html += '        <div id="activeClientInputGroup" class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <label class="input-group-text" for="clientStatus">Cliente Activo</label>';
    html += '            </div>';
    html += '            <select class="custom-select" id="clientStatus">';
    html += '                <option value="0" selected>Seleccionar...</option>';
    html += '                <option value="1">Si</option>';
    html += '                <option value="2">No</option>';
    html += '            </select>';
    html += '        </div>';
    html += '    </div>';
    html += '    <div class="col-9">';
    html += '        <h3 class="text-justify">Información de contacto</h3>';
    html += '        <div class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <label class="input-group-text" for="contactReason">Motivo</label>';
    html += '            </div>';
    html += '            <select class="custom-select" id="contactReason">';
    html += '                <option value="0" selected>Seleccionar...</option>';
    html += '                <option value="1">Primer contacto</option>';
    html += '                <option value="2">Seguimiento específico</option>';
    html += '                <option value="3">Seguimiento a tarifario entregado</option>';
    html += '                <option value="4">Seguimiento a propuesta encargada</option>';
    html += '                <option value="5">LEAD</option>';
    html += '                <option value="6">Contactado por cliente</option>';
    html += '            </select>';
    html += '        </div>';
    html += '        <div class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <label class="input-group-text" for="contactType">Tipo de contacto</label>';
    html += '            </div>';
    html += '            <select class="custom-select" id="contactType">';
    html += '                <option value="0" selected>Seleccionar...</option>';
    html += '                <option value="1">Llamada</option>';
    html += '                <option value="2">Visita</option>';
    html += '            </select>';
    html += '        </div>';
    html += '        <div class="input-group mb-3">';
    html += '            <div class="input-group-prepend">';
    html += '                <label class="input-group-text" for="didClientAnswer">Contesta</label>';
    html += '            </div>';
    html += '            <select class="custom-select" id="didClientAnswer">';
    html += '                <option value="0" selected>Seleccionar...</option>';
    html += '                <option value="1">Si</option>';
    html += '                <option value="2">No</option>';
    html += '            </select>';
    html += '        </div>';
    html += '        <div class="row">';
    html += '            <div class="col" id="responseInfo">';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <label class="input-group-text" for="clientResponse">Respuesta</label>';
    html += '                    </div>';
    html += '                    <select class="custom-select" id="clientResponse">';
    html += '                        <option value="0" selected>Seleccionar...</option>';
    html += '                        <option value="1">Tarifario</option>';
    html += '                        <option value="2">Primera propuesta</option>';
    html += '                        <option value="3">Nueva propuesta</option>';
    html += '                        <option value="4">Reserva</option>';
    html += '                        <option value="5">No le interesa</option>';
    html += '                        <option value="6">No puede hablar - Volver a contactar</option>';
    html += '                        <option value="7">Otros</option>';
    html += '                    </select>';
    html += '                </div>';
    html += '            </div>';
    html += '            <div class="col">';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon1">Fecha de próximo contacto</span>';
    html += '                    </div>';
    html += '                    <input id="nextContactDate" type="date" class="form-control" aria-label="Fecha de entrada" aria-describedby="basic-addon1">';
    html += '                </div>';
    html += '            </div>';
    html += '        </div>';
    html += '        <hr>';
    html += '        <div class="row">';
    html += '            <div class="col">';
    html += '                <h3 class="text-justify">Información de propuesta o reserva</h3>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon1">Fecha de entrada</span>';
    html += '                    </div>';
    html += '                    <input id="checkInDate" type="date" class="form-control" aria-label="Fecha de entrada" aria-describedby="basic-addon1">';
    html += '                </div>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon1">Fecha de salida</span>';
    html += '                    </div>';
    html += '                    <input id="checkOutDate" type="date" class="form-control" aria-label="Fecha de salida" aria-describedby="basic-addon1">';
    html += '                </div>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon1">Número de cuartos</span>';
    html += '                    </div>';
    html += '                    <input id="roomsQuantity" type="number" min="1" class="form-control" placeholder="Número de cuartos" aria-label="Número de cuartos" aria-describedby="basic-addon1">';
    html += '                </div>';
    html += '            </div>';
    html += '            <div class="col">';
    html += '                <h3 class="text-justify">Información de seguimiento</h3>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon1">Persona encargada</span>';
    html += '                    </div>';
    html += '                    <input id="whoIsInCharge" type="text" class="form-control" placeholder="Nombre" aria-label="Persona Encargada" aria-describedby="basic-addon1">';
    html += '                </div>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon2">Número telefónico</span>';
    html += '                    </div>';
    html += '                    <input id="phoneNumber" type="tel" class="form-control" placeholder="71234567" aria-label="Número telefónico" aria-describedby="basic-addon2">';
    html += '                </div>';
    html += '                <div class="input-group mb-3">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text" id="basic-addon3">Correo electrónico</span>';
    html += '                    </div>';
    html += '                    <input id="personEmail" type="email" class="form-control" placeholder="foo@example.com" aria-label="e-mail" aria-describedby="basic-addon3">';
    html += '                </div>';
    html += '                <div class="input-group">';
    html += '                    <div class="input-group-prepend">';
    html += '                        <span class="input-group-text">Otros</span>';
    html += '                    </div>';
    html += '                    <textarea id="additionalInfo" class="form-control" rows="4" aria-label="Otros"></textarea>';
    html += '                </div>';
    html += '            </div>';
    html += '        </div>';
    html += '    </div>';
    html += '    <div class="col-12 d-flex justify-content-end mt-4">';
    html += '        <div class="input-group">';
    html += '            <div class="input-group-prepend">';
    html += '                <span class="input-group-text">Comentarios</span>';
    html += '            </div>';
    html += '            <textarea id="comentariosGenerales" class="form-control" rows="6" aria-label="Otros"></textarea>';
    html += '        </div>   ';
    html += '    </div>';
    html += '    <div class="col-12 d-flex justify-content-end mt-4">';
    html += '        <button class="btn btn-dark mr-3" id="cancelButton">Cancelar</button>';
    html += '        <button class="btn btn-dark" id="saveButton">Guardar</button>';
    html += '    </div>';
    html += '</div>';

    container.html(html);


    // ===============================================
    // First Tab DOM objects
    // ===============================================
    // Información general
    let datePicker = document.getElementById('datePicker');
    let sellerName = document.getElementById('sellerName');
    let clientName = document.getElementById('clientName');
    let clientSuggestionList = document.getElementById('clientSuggestionList');
    let clientStatus = document.getElementById('clientStatus');
    // Información de contacto
    let contactReason = document.getElementById('contactReason');
    let didClientAnswer = document.getElementById('didClientAnswer');
    let clientResponse = document.getElementById('clientResponse');
    let contactType = document.getElementById('contactType');
    let nextContactDate = document.getElementById('nextContactDate');
    // Informacion de reserva
    let checkInDate = document.getElementById('checkInDate');
    let checkOutDate = document.getElementById('checkOutDate');
    let roomsQuantity = document.getElementById('roomsQuantity');
    // Información de seguimiento
    let whoIsInCharge = document.getElementById('whoIsInCharge');
    let phoneNumber = document.getElementById('phoneNumber');
    let personEmail = document.getElementById('personEmail');
    let additionalInfo = document.getElementById('additionalInfo');
    // Comentarios del vendedor
    let comentariosGenerales = document.getElementById('comentariosGenerales');
    // Control buttons
    let cancelButton = document.getElementById('cancelButton');
    let saveButton = document.getElementById('saveButton');

    // ===============================================
    // Set today's date as min for checkIn
    // ===============================================
    let today = new Date();
    datePicker.value = `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`;
    checkInDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);
    checkOutDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);
    nextContactDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);

    // ===============================================
    // Handle other client response, create or remove otherResponse field
    // ===============================================
    document.getElementById('clientResponse').addEventListener('input', () => {
        if (document.getElementById('clientResponse').value === '7') {
            let otherResponseField = document.createElement('div');
            otherResponseField.className = 'input-group';
            otherResponseField.innerHTML = '<div class="input-group-prepend"> \
                                                <span class="input-group-text">Otro</span> \
                                            </div> \
                                            <textarea id="otherResponse" class="form-control" rows="3" aria-label="Otros"></textarea>';
            document.getElementById('responseInfo').appendChild(otherResponseField);

            document.getElementById('otherResponse').addEventListener('input', () => {
                if (!document.getElementById('otherResponse').value) {
                    document.getElementById('otherResponse').classList.add('is-invalid');
                } else {
                    document.getElementById('otherResponse').classList.remove('is-invalid');
                }
            });
        } else {
            if (document.getElementById('responseInfo').children.length >= 2) {
                document.getElementById('responseInfo').removeChild(document.getElementById('responseInfo').lastChild);
            }
        }
    });

    // ===============================================
    // Handle cancel button click event
    // ===============================================
    cancelButton.addEventListener('click', () => {
        clientName.value = '';
        clientStatus.value = '0';
        contactReason.value = '0';
        didClientAnswer.value = '0';
        clientResponse.value = '0';
        checkInDate.value = '';
        checkOutDate.value = '';
        roomsQuantity.value = '';
        whoIsInCharge.value = '';
        phoneNumber.value = '';
        personEmail.value = '';
        additionalInfo.value = '';
        comentariosGenerales.value = '';
        nextContactDate.value = '';
        contactType.value = '0';
        if (document.getElementById('responseInfo').children.length >= 2) {
            document.getElementById('responseInfo').removeChild(document.getElementById('responseInfo').lastChild);
        }
        clientResponse.removeAttribute('disabled');
        nextContactDate.removeAttribute('disabled');
        checkInDate.removeAttribute('disabled');
        checkOutDate.removeAttribute('disabled');
        roomsQuantity.removeAttribute('disabled');
        whoIsInCharge.removeAttribute('disabled');
        phoneNumber.removeAttribute('disabled');
        personEmail.removeAttribute('disabled');
        additionalInfo.removeAttribute('disabled');


        checkInDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);
        checkOutDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);
        checkInDate.removeAttribute('max');
    });

    // ===============================================
    // Remove warnings as valid inputs are filled
    // ===============================================
    // Contact date
    datePicker.addEventListener('input', () => {
        datePicker.classList.remove('is-invalid');
    });
    // Seller name
    sellerName.addEventListener('input', () => {
        sellerName.classList.remove('is-invalid');
    });
    // client name
    clientName.addEventListener('input', () => {
        clientName.classList.remove('is-invalid');
    });
    // Client status
    clientStatus.addEventListener('input', () => {
        if (clientStatus.value === '0') {
            clientStatus.classList.add('is-invalid');
        } else {
            clientStatus.classList.remove('is-invalid');
        }
    });
    // motivo
    contactReason.addEventListener('input', () => {
        if (contactReason.value === '0') {
            contactReason.classList.add('is-invalid');
        } else {
            contactReason.classList.remove('is-invalid');
        }
    });
    // tipo de contact
    contactType.addEventListener('input', () => {
        if (contactType.value === '0') {
            contactType.classList.add('is-invalid');
        } else {
            contactType.classList.remove('is-invalid');
        }
    });
    // contesta
    didClientAnswer.addEventListener('input', () => {
        if (didClientAnswer.value === '0') {
            didClientAnswer.classList.add('is-invalid');
        } else {
            didClientAnswer.classList.remove('is-invalid');
        }
        if (didClientAnswer.value === '2') {
            nextContactDate.value = `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()+1 }`;

            clientResponse.setAttribute('disabled', true);
            nextContactDate.setAttribute('disabled', true);
            checkInDate.setAttribute('disabled', true);
            checkOutDate.setAttribute('disabled', true);
            roomsQuantity.setAttribute('disabled', true);
            whoIsInCharge.setAttribute('disabled', true);
            phoneNumber.setAttribute('disabled', true);
            personEmail.setAttribute('disabled', true);
            additionalInfo.setAttribute('disabled', true);
        }
    });
    // respuesta cliente
    clientResponse.addEventListener('input', () => {
        if (clientResponse.value === '0') {
            clientResponse.classList.add('is-invalid');
        } else {
            clientResponse.classList.remove('is-invalid');
        }
    });
    // Fecha de Proximo contacto
    // nextContactDate.addEventListener('input', () => {
    //     if (!nextContactDate.value) {
    //         nextContactDate.classList.add('is-invalid');
    //     } else {
    //         nextContactDate.classList.remove('is-invalid');
    //     }
    // });

    // Validate checkin and checkout dates
    checkInDate.addEventListener('input', () => {
        let date1, date2;
        if (checkInDate.value) {
            date1 = new Date(checkInDate.value);
            date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours() + 4, date1.getMinutes(), date1.getSeconds(), date1.getMilliseconds());
            checkOutDate.setAttribute('min', `${date1.getFullYear()}-${date1.getMonth() + 1>=10?'':'0'}${date1.getMonth() + 1}-${date1.getDate()>=10?'':'0'}${date1.getDate()}`);
        }

        if (checkOutDate.value) {
            date2 = new Date(checkOutDate.value);
            date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours() + 4, date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
            checkInDate.setAttribute('max', `${date2.getFullYear()}-${date2.getMonth() + 1>=10?'':'0'}${date2.getMonth() + 1}-${date2.getDate()>=10?'':'0'}${date2.getDate()}`);
        }
    });
    checkOutDate.addEventListener('input', () => {
        let date1, date2;
        if (checkInDate.value) {
            date1 = new Date(checkInDate.value);
            date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours() + 4, date1.getMinutes(), date1.getSeconds(), date1.getMilliseconds());
            checkOutDate.setAttribute('min', `${date1.getFullYear()}-${date1.getMonth() + 1>=10?'':'0'}${date1.getMonth() + 1}-${date1.getDate()>=10?'':'0'}${date1.getDate()}`);
        }


        if (checkOutDate.value) {
            date2 = new Date(checkOutDate.value);
            date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours() + 4, date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
            checkInDate.setAttribute('max', `${date2.getFullYear()}-${date2.getMonth() + 1>=10?'':'0'}${date2.getMonth() + 1}-${date2.getDate()>=10?'':'0'}${date2.getDate()}`);
        }
    });
    // Validate Room quantity
    roomsQuantity.addEventListener('input', () => {
        if (roomsQuantity.value) {
            if (roomsQuantity.value) {
                if (roomsQuantity.value <= 0) {
                    roomsQuantity.value = 1;
                }
            }
        }
    });
    // Validate name
    whoIsInCharge.addEventListener('input', () => {
        if (whoIsInCharge.value) {
            if (whoIsInCharge.value.match(/^[a-zA-Z ]{2,30}$/)) {
                whoIsInCharge.classList.remove('is-invalid');
            } else {
                whoIsInCharge.classList.add('is-invalid');
            }
        } else {
            whoIsInCharge.classList.remove('is-invalid');
        }
    });
    // Validate phone number// TODO: todos los departamentos de bolivia
    phoneNumber.addEventListener('input', () => {
        if (phoneNumber.value) {
            if (phoneNumber.value.match(/^[6-7]{1,1}[0-9]{7,7}$/) || phoneNumber.value.match(/^[2]{1}[0-9]{6,6}$/)) {
                phoneNumber.classList.remove('is-invalid');
            } else {
                phoneNumber.classList.add('is-invalid');
            }
        }
    });
    // Validate email
    personEmail.addEventListener('input', () => {
        if (personEmail.value) {
            if (personEmail.value.match(/^[a-zA-Z0-9_.]{1,30}[@]{1}[a-zA-Z0-9_.]{1,30}[.]{1}[a-zA-Z0-9_.]{1,10}$/)) {
                personEmail.classList.remove('is-invalid');
            } else {
                personEmail.classList.add('is-invalid');
            }
        }
    });

    // ===============================================
    // Handle accept button click event
    // ===============================================
    saveButton.addEventListener('click', () => {
        // ===============================================
        // Validators
        // ===============================================
        // Validate register date
        if (!datePicker.value) {
            datePicker.classList.add('is-invalid');
            datePicker.focus();
            return;
        } else {
            datePicker.classList.remove('is-invalid');
        }
        // Validate seller name
        if (!sellerName.value) {
            sellerName.classList.add('is-invalid');
            sellerName.focus();
            return;
        } else {
            sellerName.classList.remove('is-invalid');
        }
        // Validate client name
        if (!clientName.value) {
            clientName.classList.add('is-invalid');
            clientName.focus();
            return;
        } else {
            clientName.classList.remove('is-invalid');
        }
        // Validate 'cliente activo'
        if (clientStatus.value === '0') {
            clientStatus.classList.add('is-invalid');
            clientStatus.focus();
            return;
        } else {
            clientStatus.classList.remove('is-invalid');
        }
        // Validate motivo
        if (contactReason.value === '0') {
            contactReason.classList.add('is-invalid');
            contactReason.focus();
            return;
        } else {
            contactReason.classList.remove('is-invalid');
        }
        // Validate contact type
        if (contactType.value === '0') {
            contactType.classList.add('is-invalid');
            contactType.focus();
            return;
        } else {
            contactType.classList.remove('is-invalid');
        }
        // Validate constesta
        if (didClientAnswer.value === '0') {
            didClientAnswer.classList.add('is-invalid');
            didClientAnswer.focus();
            return;
        } else {
            didClientAnswer.classList.remove('is-invalid');
        }
        // Validate response
        if (clientResponse.value === '0' && didClientAnswer.value !== '2') {
            clientResponse.classList.add('is-invalid');
            clientResponse.focus();
            return;
        } else {
            clientResponse.classList.remove('is-invalid');
        }
        // Validate other response
        if (clientResponse.value === '7') {
            if (!document.getElementById('otherResponse').value) {
                document.getElementById('otherResponse').classList.add('is-invalid');
                document.getElementById('otherResponse').focus();
                return;
            } else {
                document.getElementById('otherResponse').classList.remove('is-invalid');
            }
        }
        // Validate next contact date
        // if (!nextContactDate.value && didClientAnswer.value !== '2') {
        //     nextContactDate.classList.add('is-invalid');
        //     nextContactDate.focus();
        //     return;
        // } else {
        //     nextContactDate.classList.remove('is-invalid');
        // }

        // If one optional field is filled others should be filled too
        // TODO: 
        // checkInDate
        // checkOutDate
        // roomsQuantity

        // whoIsInCharge
        // phoneNumber
        // personEmail
        // if (checkInDate.value || checkOutDate.value || roomsQuantity.value || whoIsInCharge.value || phoneNumber.value || personEmail.value) {
        //     if(!checkInDate.value){
        //         checkInDate.classList.add('is-invalid');
        //     }else{
        //         checkInDate.classList.remove('is-invalid');
        //     }

        //     if(!checkOutDate.value){
        //         checkOutDate.classList.add('is-invalid');
        //     }else{
        //         checkOutDate.classList.remove('is-invalid');
        //     }

        //     if(!roomsQuantity.value){
        //         roomsQuantity.classList.add('is-invalid');
        //     }else{
        //         roomsQuantity.classList.remove('is-invalid');
        //     }

        //     if(!whoIsInCharge.value){
        //         whoIsInCharge.classList.add('is-invalid');
        //     }else{
        //         whoIsInCharge.classList.remove('is-invalid');
        //     }

        // }
        // TODO: END

        // Current time
        let now = new Date();
        let inputObject;
        // ===============================================
        // If other response is selected add this to the object if not skip it
        // ===============================================
        if (document.getElementById('otherResponse')) {
            inputObject = {
                fechaDeContacto: datePicker.value,
                fechaDeRegistro: now,
                vendedor: sellerName.value,
                codigoCliente: clientName.value.split(': ')[0],
                nombreCliente: clientName.value.split(': ')[1],
                clienteActivo: clientStatus.value,
                motivo: contactReason.value,
                contesta: didClientAnswer.value,
                respuesta: clientResponse.value,
                otraRespuesta: document.getElementById('otherResponse').value,
                fechaDeEntrada: checkInDate.value,
                fechaDeSalida: checkOutDate.value,
                cuartos: roomsQuantity.value,
                personaACargo: whoIsInCharge.value,
                numeroTelefonico: phoneNumber.value,
                personaemail: personEmail.value,
                informaicionAdicional: additionalInfo.value,
                comentarios: comentariosGenerales.value,
                fechaProximoContacto: nextContactDate.value,
                tipoDeContacto: contactType.value
            }
        } else {
            inputObject = {
                fechaDeContacto: datePicker.value,
                fechaDeRegistro: now,
                vendedor: sellerName.value,
                codigoCliente: clientName.value.split(': ')[0],
                nombreCliente: clientName.value.split(': ')[1],
                clienteActivo: clientStatus.value,
                motivo: contactReason.value,
                contesta: didClientAnswer.value,
                respuesta: clientResponse.value,
                fechaDeEntrada: checkInDate.value,
                fechaDeSalida: checkOutDate.value,
                cuartos: roomsQuantity.value,
                personaACargo: whoIsInCharge.value,
                numeroTelefonico: phoneNumber.value,
                personaemail: personEmail.value,
                informaicionAdicional: additionalInfo.value,
                comentarios: comentariosGenerales.value,
                fechaProximoContacto: nextContactDate.value,
                tipoDeContacto: contactType.value
            }
        }
        if (clientResponse.value === '1' || clientResponse.value === '2' || clientResponse.value === '3') {
            tasks.addNewTask({
                pedido: clientResponse.value,
                vendedor: sellerName.value,
                cliente: clientName.value,
                fechaDeCreacion: now,
                fechaLimite: new Date(nextContactDate.value),
                entregado: false
            });
        }
        contacts.addContact(inputObject);
        cancelButton.click();
    });

    // ===============================================
    // Give suggestions while client field is being written to
    // ===============================================
    clientName.addEventListener('input', () => {
        if (clientName.value) {
            // suggestions array returned by clients object
            let suggestions = clients.getClientSuggestion(clientName.value);
            // Purge datalist DOM object
            while (clientSuggestionList.firstChild) {
                clientSuggestionList.removeChild(clientSuggestionList.firstChild);
            }
            // Fill datalist DOM with new suggestions
            for (let i = 0; i < suggestions.length && i < 8; i++) {
                let opt = document.createElement('option');
                opt.value = `${suggestions[i].code}: ${suggestions[i].name}`;
                clientSuggestionList.appendChild(opt);
            }
        } else {
            // If no input purge suggestions
            while (clientSuggestionList.firstChild) {
                clientSuggestionList.removeChild(clientSuggestionList.firstChild);
            }
        }
    });
});


// ===============================================
// Second tab config
// ===============================================
document.getElementById('secondTab').addEventListener('click', () => {
    // ===============================================
    // Opciones para las listas de seleccion multiple
    // ===============================================
    let listaRespuesta = ['', 'Tarifario', 'Primera propuesta', 'Nueva propuesta'];
    // Pending tasks
    let pending = tasks.getTaskstoDo();

    // ===============================================
    // Set second tab selector as active
    // ===============================================
    document.getElementById('firstTab').classList.remove('active');
    document.getElementById('secondTab').classList.add('active');

    // ===============================================
    // Create and show second tab
    // ===============================================
    let html = '';
    html += '    <table class="table">';
    html += '        <thead>';
    html += '            <tr>';
    html += '                <th scope="col">#</th>';
    html += '                <th scope="col">Fecha de creación</th>';
    html += '                <th scope="col">Fecha límite de entrega</th>';
    html += '                <th scope="col">Cliente</th>';
    html += '                <th scope="col">Solicitud</th>';
    html += '                <th scope="col">Empleado asignado</th>';
    html += '                <th scope="col">Completado</th>';
    html += '            </tr>';
    html += '        </thead>';
    html += '        <tbody>';
    for (let i = 0; i < pending.length; i++) {
        html += '            <tr>';
        html += `                <th scope="row">${i+1}</th>`;
        html += `                <td>${new Date(pending[i].fechaDeCreacion).toLocaleDateString()}</td>`;
        html += `                <td>${new Date(pending[i].fechaLimite).toLocaleDateString()}</td>`;
        html += `                <td>${pending[i].cliente.split(': ')[1]}</td>`;
        html += `                <td>${listaRespuesta[ Number( pending[i].pedido) ]}</td>`;
        html += `                <td>${pending[i].vendedor}</td>`;
        html += '                <td>';
        html += '                    <div class="form-group form-check">';
        html += `                        <input type="checkbox" class="form-check-input" id="task-done-${i}">`;
        html += `                        <label class="form-check-label" for="task-done-${i}">Completado</label>`;
        html += '                    </div>';
        html += '                </td>';
        html += '            </tr>';
    }
    html += '        </tbody>';
    html += '    </table>';
    container.html(html);
    // ===============================================
    // Add event listeners for every task done checkbox
    // ===============================================
    for (let i = 0; i < pending.length; i++) {
        document.getElementById(`task-done-${i}`).addEventListener('input', () => {
            tasks.markAsDone(`${i}`);
            // refresh tab
            document.getElementById('secondTab').click();
        });
    }
});

// ===============================================
// Force first click to start at first tab
// ===============================================
document.getElementById('firstTab').click();