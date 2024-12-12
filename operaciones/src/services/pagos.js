import { fetchData } from "./hooks/fetchData.js"; 
import { createTableCheck } from "./hooks/functions/createTableCheck.js";
import { resolvePromise } from "./hooks/functions/resolvePromise.js";
import { renderTable } from "./hooks/functions/renderTable.js";
import { showModal } from "./hooks/functions/showModal.js";
import { PostPay } from "./hooks/functions/PostPay.js";
import { addOptions } from "./hooks/functions/addOptionsToSelect.js";
import { updateUrl } from "./hooks/functions/updateUrl.js";

// URL BASE PARA LOS ENDPOINTS
const urlBase = 'http://192.168.210.110:3005';
const urlPromotores = `${urlBase}/operaciones/promotores`;
const selectPromotores = document.getElementById('selectPromotor');
const checbox=document.querySelectorAll("form-check-input").forEach(input=>{
if(input.checked==True){
    console.log(input);
}else{
    console.log("se fue alv");
}
});
const btnhnc= document.querySelector(".btn.btn-primary.hnc");

const mesSelectHnC = document.getElementById('mesSelectHnC');
const anoSelectHnC = document.getElementById('anoSelectHnC');
const modalElement = document.getElementById('ModalPagosPromotores');

let urlPagosPromotores = `${urlBase}/operaciones/pagos/promotores`;
const tbodyPagosPromotores = document.querySelector('.tbody-pagos-promotores');
const headersPagosPromotores = [
    '#',               // Columna de índice
    'Razón Social',    // Columna de razón social
    'Monto',           // Columna de monto
    'Aplicacion Liberada', // Columna de estado del pago
    'Fecha de ultimo cobro',   // Columna de fecha de pago
];
const nodosPagosPromotores = [        // El índice se manejará directamente en el código de la tabla, no necesita un nodo
    'razonSocial',     // Propiedad de razón social
    'montoTotal',     // Propiedad del monto
    'nombre',      // Propiedad de estado del pago
    'fechaCobro',       // Propiedad de fecha de pago
];

function formatFecha(fecha) {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


addOptions(selectPromotores, fetchData(urlPromotores), (click) => {
    if (click) {
        urlPagosPromotores = `${urlBase}/operaciones/pagos/promotores?promotor=${click}`;
        const dataPagosPromotores = fetchData(urlPagosPromotores);
        resolvePromise(dataPagosPromotores)
            .then(data =>
                renderTable(
                    headersPagosPromotores,
                    data,
                    tbodyPagosPromotores,
                    nodosPagosPromotores,
                    (btnClickedData) => {
                        const url = `${urlBase}/operaciones/pagos/promotor`;
                        const method = 'POST';

                        showModal2(btnClickedData, modalElement)
                            .then(jsonData => 
                                PostPay(jsonData, url, method)
                                    .then(() => {
                                        const updatedDataFetch = fetchData(urlPagosPromotores);
                                        resolvePromise(updatedDataFetch)
                                            .then(updatedData =>
                                                renderTable(
                                                    headersPagosPromotores,
                                                    updatedData,
                                                    tbodyPagosPromotores,
                                                    nodosPagosPromotores
                                                )
                                            )
                                            .catch(error => console.error('Error al obtener datos actualizados:', error));
                                    })
                                    .catch(error => console.error('Error en PostPay:', error))
                            )
                            .catch(error => console.error('Error en showModal:', error));
                    }
                )
            )
            .catch(error => console.error('Error al obtener datos:', error));
    }
});

// Función para mostrar el modal con un campo de entrada para el monto
function showModal2(data, modalElement) {
    return new Promise((resolve, reject) => {
        // Generar contenido dinámico para el modal
        const showModalBody = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${data.razonSocial}</h5>
                    <p class="card-text"><strong>ID Registro:</strong> ${data.idRegistro}</p>
                    <p class="card-text"><strong>Promotor ID:</strong> ${data.Idpromotor}</p>
                    <p class="card-text"><strong>Monto Total:</strong> ${data.montoTotal}</p>
                    <p class="card-text"><strong>Estado:</strong> ${data.nombre}</p>
                    <p class="card-text"><strong>Liberado:</strong> ${data.liberado ? 'Sí' : 'No'}</p>
                    <p class="card-text"><small class="text-muted"><strong>Fecha de último cobro:</strong> ${new Date(data.fechaCobro).toLocaleDateString()}</small></p>
                </div>
                <div class="mb-3">
                    <label for="montoPagadoInput" class="form-label">Monto a Pagar</label>
                    <input type="number" class="form-control" id="montoPagadoInput" placeholder="Ingrese el monto a pagar" min="0" step="0.01" required>
                </div>
            </div>
        `;

        // Insertar contenido en el modal
        const modalBody = modalElement.querySelector('.modal-body');
        modalBody.innerHTML = showModalBody;

        // Mostrar el modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        // Resolver la promesa cuando el usuario haga clic en guardar
        const saveButton = modalElement.querySelector('.saveButton');
        saveButton.addEventListener(
            'click',
            () => {
                const montoPagadoInput = modalElement.querySelector('#montoPagadoInput');
                const montoPagado = parseFloat(montoPagadoInput.value);
                
                if (isNaN(montoPagado) || montoPagado <= 0) {
                    alert('Por favor, ingrese un monto válido.');
                    return;
                }
                
                modal.hide();
                resolve({
                    idAplicacion: data.idRegistro,
                    montoPagado,
                    comentarios: "PAGO REGISTRADO DESDE MODAL"
                });
            },
            { once: true } // Listener único
        );
    });
}




// ------------------------------- HnC -------------------------------

const headersPagosHnc = [
    '#', // Columna de índice
    'Razón Social',
    //'idRegistroApp',
    'Estimulo',
    'Deal',
    'Total',
];

const nodosPagosHnc = [
    'RazonSocial',
    //'idRegistro',
    'estimulo',
    'deal',
    'total',
];

const tbodyPagosHnc = document.querySelector('.aplicaciones-hnc');
if (!tbodyPagosHnc) {
    console.error("El elemento tbody de aplicaciones HnC no se encuentra en el DOM.");
    throw new Error("Error crítico: Verifica que el tbody correspondiente esté correctamente definido en el HTML.");
}

async function updateUrlPagosHnc() {
    const mes = mesSelectHnC.value;
    const ano = anoSelectHnC.value;

    if (!mes || mes === "Selecciona mes" || !ano || ano === "Selecciona año") {
        console.warn("Por favor selecciona ambos valores: mes y año.");
        return;
    }

    const urlPagosHnc = `${urlBase}/operaciones/pagos/hnc/${mes}/${ano}`;
    console.log("Nueva URL generada:", urlPagosHnc);

    try {
        // Obtener los datos basados en la nueva URL
        const dataPagosHnc = await fetchData(urlPagosHnc);

        // Crear tabla con los datos obtenidos
        createTableCheck(headersPagosHnc, dataPagosHnc, tbodyPagosHnc, nodosPagosHnc);

        // Después de que la tabla se haya generado, asignamos los eventos de los checkboxes
        const checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const idRegistro = event.target.dataset.idRegistro; // Extraemos el idRegistro del checkbox
                if (idRegistro) {
                    if (checkbox.checked) {
                        console.log("Checkbox marcado, idRegistro:", idRegistro);
                        // Acción cuando el checkbox está marcado
                    } else {
                        console.log("Checkbox desmarcado, idRegistro:", idRegistro);
                        // Acción cuando el checkbox está desmarcado
                    }
                } else {
                    console.error("idRegistro no definido en el checkbox.");
                }
            });
        });
    } catch (error) {
        console.error("Error al actualizar la tabla de HnC:", error);
    }
}

mesSelectHnC.addEventListener('change', updateUrlPagosHnc);
anoSelectHnC.addEventListener('change', updateUrlPagosHnc);

btnhnc.addEventListener('click', async () => {
    try {
        console.log("Botón HnC clickeado. Ejecutando acción...");

        // Obtener todos los checkboxes marcados
        const checkboxesMarcados = Array.from(document.querySelectorAll('.form-check-input:checked'));

        // Crear un array con los valores (idRegistro) de los checkboxes marcados
        const aplicacionesPagadas = checkboxesMarcados.map((checkbox) => checkbox.value);
        // Crear el JSON con la estructura requerida
        const jsonResultado = {
            Aplicacionespagadas: aplicacionesPagadas
        };
        console.log(jsonResultado)
        const urlhnc = 'http://192.168.210.110:3005/operaciones/pagos/provedor';
        const method = 'POST';        
        PostPay(jsonResultado, urlhnc, method)
                            .then(() => {
                                const updatedDataFetch = fetchData(urlPagosPromotores);
                                resolvePromise(updatedDataFetch)
                                    .then(updatedData => {
                                        createTableCheck(headersPagosHnc, updatedData, tbodyPagosHnc, nodosPagosHnc);

                                    })
                                    .catch(error => console.error('Error al obtener datos actualizados:', error));
                            })
                            .catch(error => console.error('Error en PostPay:', error))

    } catch (error) {
        console.error("Error en la operación del botón HnC:", error);
    }
});



// try {
//     const dataHncOptions = await fetchData(`${urlBase}/operaciones/pagos/hnc`);

// } catch (error) {
//     console.error("Error al cargar opciones iniciales de HnC:", error);
// }


//===============================================Pagos BNB=======================================


// Selección de mes y año
const mesSelect = document.getElementById('mesSelectbnb');
const tablaPagosbnb = document.getElementById('tablaPagosbnb');
function fetchAndRenderPagos() {
    const mes = mesSelect.value;
    const ano = anoSelect.value;

    // Validar que tanto mes como año estén seleccionados
    const isValidMes = mes && mes !== "Selecciona mes";
    const isValidAno = ano && ano !== "Selecciona año";

    // Mostrar mensaje si mes y año no están seleccionados
    if (!isValidMes || !isValidAno) {
        console.warn("Selecciona el mes y el año");
        tablaPagosbnb.innerHTML = '<tr><td colspan="3">Selecciona el mes y el año</td></tr>';
        return; // Detener la ejecución si no son válidos
    }

    // Construir la URL con ambos parámetros
    const url = `http://192.168.210.110:3005/operaciones/pagos/historial/mensuales?year=${ano}&month=${mes}`;

    console.log('URL generada:', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            renderTablePagos(data);
        })
        .catch(error => {
            console.error('Error al cargar los pagos:', error.message);
            tablaPagosbnb.innerHTML = '<tr><td colspan="3">Error al cargar los datos</td></tr>';
        });
}



function renderTablePagos(data) {
    console.log('Datos procesados para la tabla:', data);
    tablaPagosbnb.innerHTML = ''; 

    if (!data || data.length === 0) {
        console.warn('No hay datos para mostrar.');
        tablaPagosbnb.innerHTML = '<tr><td colspan="3">No hay pagos registrados</td></tr>';
        return;
    }

    data.forEach((pago, index) => {
        console.log('Procesando pago:', pago);

        const row = document.createElement('tr');

        // Índice
        const indexCell = document.createElement('th');
        indexCell.scope = 'row';
        indexCell.textContent = index + 1;
        row.appendChild(indexCell);

        // Monto
        const montoCell = document.createElement('td');
        montoCell.textContent = pago.monto || 'N/A'; 
        row.appendChild(montoCell);

        // Fecha de creación
        const fechaCell = document.createElement('td');
        fechaCell.textContent = pago.createdAt || 'N/A'; 
        row.appendChild(fechaCell);

        tablaPagosbnb.appendChild(row);
    });
}



// Listeners para cambios en los select
mesSelect.addEventListener('change', fetchAndRenderPagos);
anoSelect.addEventListener('change', fetchAndRenderPagos);

// Mensaje inicial
fetchAndRenderPagos();


//=============================================Pagos mensuales BNB=====================================
const cardHeader = document.querySelector('.card-header .row .col');

async function fetchCuotaData() {
    try {
        // Realizar la solicitud GET al endpoint
        const response = await fetch('http://192.168.210.110:3005/operaciones/pagos/historial/cuotas');
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        // Obtener los datos en formato JSON
        const cuotas = await response.json();

        // Verificar si hay cuotas
        if (cuotas.length === 0) {
            cardHeader.textContent = 'No hay pagos disponibles';
            return;
        }

        // Tomar el primer elemento de la lista de cuotas
        const cuota = cuotas[0]; // O ajustar según el criterio para elegir una cuota
        const { Monto, updatedAt } = cuota;

        // Formatear el mes y el año desde updatedAt
        const date = new Date(updatedAt);
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
            'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        // Mostrar el monto y la fecha formateada en la tarjeta
        cardHeader.textContent = `Pago ${month} ${year}: ${Monto}`;
    } catch (error) {
        console.error('Error al cargar los datos de la cuota:', error);
        cardHeader.textContent = 'Error al cargar el pago';
    }
}

fetchCuotaData();



let cuotaId = 1; 
const editPagoForm = document.querySelector('#editPagoForm');
const editMontoInput = document.querySelector('#editMontoInput');
const paymentInfo = document.querySelector('.payment-info');


document.addEventListener('DOMContentLoaded', () => {
    const editPagoForm = document.getElementById('editPagoForm');
    const editMontoInput = document.getElementById('editMontoInput');
    const editMontoDisplay = document.getElementById('editmonto'); // Elemento para mostrar el monto actualizado
    const modalInstance = new bootstrap.Modal(document.getElementById('editPagoModal')); // Instancia del modal

    // Agrega un evento al formulario del modal
    editPagoForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir la recarga de la página

        const newMonto = parseFloat(editMontoInput.value); // Obtener el nuevo monto ingresado

        if (isNaN(newMonto) || newMonto <= 0) {
            return;
        }

        try {
            // Realiza la solicitud PUT al backend
            const response = await fetch('http://192.168.210.110:3005/operaciones/pagos/cuotas/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Monto: newMonto }), // Enviar el nuevo monto
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al actualizar el monto.');
            }

            // Actualiza el contenido del monto en la interfaz
            const updatedMonto = parseFloat(responseData.cuota.Monto).toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            editMontoDisplay.textContent = `Pago Octubre 2024: $${updatedMonto}`;

            // Cierra el modal
            modalInstance.hide();

        } catch (error) {
            console.error('Error al actualizar el monto:', error.message);
        }
    });
});



document.getElementById('HacerPago').addEventListener('click', () => {
    // Abrir el modal al dar clic en el botón
    const hacerPagoModal = new bootstrap.Modal(document.getElementById('hacerPagoModal'));
    hacerPagoModal.show();
});


document.getElementById('hacerPagoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el monto ingresado
    const montoInput = document.getElementById('montoInput').value;
    const monto = parseFloat(montoInput);

    // Validar el monto
    if (isNaN(monto) || monto <= 0) {
        alert('Por favor, ingresa un monto válido.');
        return;
    }

    // Construir el payload
    const payload = {
        toperacion: 3, // Tipo de operación
        monto: monto.toFixed(2), // Aseguramos dos decimales
        comentarios: 'Pago mensual', // Comentarios estáticos
    };

    try {
        // Realizar la solicitud POST al backend
        const response = await fetch('http://192.168.210.110:3005/operaciones/pagos/mensuales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Respuesta del servidor:', result);

            // Agregar el nuevo registro a la tabla
            addRowToPagosTable(result.data);

            // Ocultar el modal y mover el foco al botón que lo abrió
            const hacerPagoModal = bootstrap.Modal.getInstance(document.getElementById('hacerPagoModal'));
            hacerPagoModal.hide();

            // Mover el foco al botón que abrió el modal
            const openModalButton = document.getElementById('HacerPago');
            if (openModalButton) {
                openModalButton.focus();
            }

            // Limpiar el formulario
            document.getElementById('hacerPagoForm').reset();
        } else {
            console.error('Error en el servidor:', result);
            alert('Error al registrar el pago: ' + result.message);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al conectar con el servidor.');
    }
});

function addRowToPagosTable(pago) {
    const tablaPagosbnb = document.getElementById('tablaPagosbnb');

    if (!tablaPagosbnb) {
        console.error('El tbody de la tabla no se encuentra en el DOM.');
        return;
    }

    if (!pago || !pago.monto || !pago.createdAt) {
        console.error('Datos incompletos para agregar a la tabla:', pago);
        return;
    }

    // Crear una nueva fila
    const row = document.createElement('tr');

    // Índice dinámico basado en el número de filas existentes
    const indexCell = document.createElement('th');
    indexCell.scope = 'row';
    indexCell.textContent = tablaPagosbnb.children.length + 1; // +1 para incluir esta nueva fila
    row.appendChild(indexCell);

    // Celda del monto
    const montoCell = document.createElement('td');
    montoCell.textContent = `$${parseFloat(pago.monto).toFixed(2)}`;
    row.appendChild(montoCell);

    // Celda de la fecha
    const fechaCell = document.createElement('td');
    fechaCell.textContent = formatFecha(pago.createdAt); // Formatear la fecha
    row.appendChild(fechaCell);

    // Agregar la fila al tbody de la tabla
    tablaPagosbnb.appendChild(row);
}

//========================================================================
//---------------------------------------------------
// URL base del servidor
const BASE_URL = 'http://192.168.210.110:3005/operaciones/pagos/historial/';

// Generar años dinámicamente
const añoSelectPromotores = document.getElementById('añoSelectPromotores');
const añoSelectHnC = document.getElementById('añoSelectHnChist');
const currentYear = new Date().getFullYear();

// Generar opciones de años para ambos filtros
for (let year = 2017; year <= currentYear; year++) {
    const optionPromotores = document.createElement('option');
    optionPromotores.value = year;
    optionPromotores.textContent = year;
    añoSelectPromotores.appendChild(optionPromotores);

    const optionHnC = document.createElement('option');
    optionHnC.value = year;
    optionHnC.textContent = year;
    añoSelectHnC.appendChild(optionHnC);
}

// Función para realizar una solicitud AJAX
async function obtenerHistorialPagos(endpoint, params) {
    try {
        const url = new URL(endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Función para actualizar la tabla de "Pagos a Promotores"
async function actualizarTablaPromotores() {
    const mes = $('#mesSelectPromotores').val();
    const año = $('#añoSelectPromotores').val();

    if (!mes || !año) {
        return;
    }

    const endpoint = `${BASE_URL}promotores`;
    const params = { year: año, month: mes };

    const datos = await obtenerHistorialPagos(endpoint, params);

    const tablaHistorialPromotores = $('#tablaHistorialPagosPromotores');
    tablaHistorialPromotores.empty();

    if (datos.length === 0) {
        tablaHistorialPromotores.append('<tr><td colspan="5" class="text-center">No hay datos para mostrar</td></tr>');
        return;
    }

    datos.forEach((pago, index) => {
        tablaHistorialPromotores.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${pago.nombre}</td>
                <td>${pago.montoPagado}</td>
                <td>${pago.Status}</td>
            </tr>
        `);
    });
}

// Función para actualizar la tabla de "Pagos HnC"
async function actualizarTablaHnC2() {
    const mes = $('#mesSelectHnChist').val();
    const año = $('#añoSelectHnChist').val();

    if (!mes || !año) {
        return;
    }

    const endpoint = `${BASE_URL}provedores`;
    const params = { year: año, month: mes };

    const datos = await obtenerHistorialPagos(endpoint, params);

    const tablaHistorialHnC = $('#tablaHistorialPagosHnC');
    tablaHistorialHnC.empty();

    if (datos.length === 0) {
        tablaHistorialHnC.append('<tr><td colspan="5" class="text-center">No hay datos para mostrar</td></tr>');
        return;
    }

    datos.forEach((pago, index) => {
        tablaHistorialHnC.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${pago.nombre}</td>
                <td>${pago.montoPagado}</td>
                <td>${pago.Status}</td>
                <td>${pago.comentarios || 'N/A'}</td>
            </tr>
        `);
    });
}

// Escuchar cambios en los filtros de cada tabla
$('#mesSelectPromotores, #añoSelectPromotores').on('change', actualizarTablaPromotores);
$('#mesSelectHnChist, #añoSelectHnChist').on('change', actualizarTablaHnC2);

// Cargar datos por defecto si todos los filtros tienen valores iniciales
$(document).ready(() => {
    if ($('#mesSelectPromotores').val() && $('#añoSelectPromotores').val()) {
        actualizarTablaPromotores();
    }

    if ($('#mesSelectHnChist').val() && $('#añoSelectHnChist').val()) {
        actualizarTablaHnC2();
    }
});



const mesSelectByB = document.getElementById('mesSelectByB');
const tablaPagosByB = document.getElementById('tablaPagosByB');
const anoSelectByB = document.getElementById('anioSelectByB');

function fetchAndRenderPagosByB() {
    const mes = mesSelectByB.value;
    const ano = anoSelectByB.value;

    // Validar que tanto mes como año estén seleccionados
    const isValidMes = mes && mes !== "Selecciona mes";
    const isValidAno = ano && ano !== "Selecciona año";

    // Mostrar mensaje si mes y año no están seleccionados
    if (!isValidMes || !isValidAno) {
        console.warn("Selecciona el mes y el año");
        tablaPagosByB.innerHTML = '<tr><td colspan="3">Selecciona el mes y el año</td></tr>';
        return; // Detener la ejecución si no son válidos
    }

    // Construir la URL con ambos parámetros
    const url = `http://192.168.210.110:3005/operaciones/pagos/historial/mensuales?year=${ano}&month=${mes}`;

    console.log('URL generada:', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            renderTablePagosByB(data);
        })
        .catch(error => {
            console.error('Error al cargar los pagos:', error.message);
            tablaPagosByB.innerHTML = '<tr><td colspan="3">Error al cargar los datos</td></tr>';
        });
}

function renderTablePagosByB(data) {
    console.log('Datos procesados para la tabla:', data);
    tablaPagosByB.innerHTML = ''; 

    if (!data || data.length === 0) {
        console.warn('No hay datos para mostrar.');
        tablaPagosByB.innerHTML = '<tr><td colspan="3">No hay pagos registrados</td></tr>';
        return;
    }

    data.forEach((pago, index) => {
        console.log('Procesando pago:', pago);

        const row = document.createElement('tr');

        // Índice
        const indexCell = document.createElement('th');
        indexCell.scope = 'row';
        indexCell.textContent = index + 1;
        row.appendChild(indexCell);

        // Monto
        const montoCell = document.createElement('td');
        montoCell.textContent = pago.monto || 'N/A'; 
        row.appendChild(montoCell);

        // Fecha de creación
        const fechaCell = document.createElement('td');
        fechaCell.textContent = pago.createdAt || 'N/A'; 
        row.appendChild(fechaCell);

        tablaPagosByB.appendChild(row);
    });
}

// Listeners para cambios en los select
mesSelectByB.addEventListener('change', fetchAndRenderPagosByB);
anoSelectByB.addEventListener('change', fetchAndRenderPagosByB);

// Mensaje inicial
fetchAndRenderPagosByB();

const BASE_URL23 = 'http://192.168.210.110:3005/operaciones/pagos/historial/';
async function fetchPagosHnC(year, month) {
    const url = `${BASE_URL}provedores?year=${year}&month=${month}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en fetch:', error);
        return [];
    }
}

async function actualizarTablaHnC() {
    const mes = document.getElementById('mesSelectHnChist').value;
    const año = document.getElementById('añoSelectHnChist').value;

    if (!mes || !año) {
        alert('Por favor selecciona mes y año.');
        return;
    }

    const data = await fetchPagosHnC(año, mes);

    const tablaHistorial = document.getElementById('tablaHistorialPagosHnC');
    tablaHistorial.innerHTML = '';

    if (data.length === 0) {
        tablaHistorial.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay datos para mostrar</td>
            </tr>`;
        return;
    }

    data.forEach((pago, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${pago.razonSocial || 'N/A'}</td>
                <td>${pago.nombre || 'N/A'}</td>
                <td>${pago.montoPagado || 'N/A'}</td>
                
            </tr>`;
        tablaHistorial.insertAdjacentHTML('beforeend', row);
    });
}

// Listeners para actualizar la tabla al cambiar mes o año
document.getElementById('mesSelectHnChist').addEventListener('change', actualizarTablaHnC);
document.getElementById('añoSelectHnChist').addEventListener('change', actualizarTablaHnC);

// Llamar a la función cuando se cargue la página si los valores están seleccionados
document.addEventListener('DOMContentLoaded', () => {
    if (
        document.getElementById('mesSelectHnChist').value &&
        document.getElementById('añoSelectHnChist').value
    ) {
        actualizarTablaHnC();
    }
});
