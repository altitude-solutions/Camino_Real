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
    html += '                <option value="4">Seguimiento a propuesta encargado</option>';
    html += '                <option value="5">LEAD</option>';
    html += '                <option value="6">Contactado por cliente</option>';
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
    // Informacion de reserva
    let checkInDate = document.getElementById('checkInDate');
    let checkOutDate = document.getElementById('checkOutDate');
    let roomsQuantity = document.getElementById('roomsQuantity');
    // Información de seguimiento
    let whoIsInCharge = document.getElementById('whoIsInCharge');
    let phoneNumber = document.getElementById('phoneNumber');
    let personEmail = document.getElementById('personEmail');
    let additionalInfo = document.getElementById('additionalInfo');


    // ===============================================
    // Set today's date as min for checkIn
    // ===============================================
    let today = new Date();
    datePicker.value = `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`;
    checkInDate.setAttribute('min', `${today.getFullYear()}-${today.getMonth() + 1>=10?'':'0'}${today.getMonth() + 1}-${today.getDate()>=10?'':'0'}${today.getDate()}`);

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


});



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