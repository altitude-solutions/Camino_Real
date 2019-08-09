// ===============================================
// Imports
// ===============================================
let contacts = require('./reg');
let clients = require('./clients');

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
    html += '                <h3 class="text-justify">Información de propuesta o reservación</h3>';
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
    html += '            <textarea id="comentariosGenerales" class="form-control" rows="10" aria-label="Otros"></textarea>';
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
        contactType.value='0';
    });

    // ===============================================
    // Handle accept button click event
    // ===============================================
    saveButton.addEventListener('click', () => {
        // TODO: Validate data before saving
        let inputObject;
        // ===============================================
        // If other response is selected add this to the object if not skip it
        // ===============================================
        if (document.getElementById('otherResponse')) {
            inputObject = {
                fechaDeContacto: datePicker.value,
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
            for (let i = 0; i < suggestions.length; i++) {
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
    // Set second tab selector as active
    // ===============================================
    document.getElementById('firstTab').classList.remove('active');
    document.getElementById('secondTab').classList.add('active');

    // ===============================================
    // Create and show second tab
    // ===============================================
    let html = '';
    html += '<div class="row">';
    html += '    <div class="col-3">';
    html += '        columna 3';
    html += '    </div>';
    html += '    <div class="col-9">';
    html += '        columna 9';
    html += '    </div>';
    html += '</div>';
    container.html(html);
});


// ===============================================
// Force first click to start at first tab
// ===============================================
document.getElementById('firstTab').click();