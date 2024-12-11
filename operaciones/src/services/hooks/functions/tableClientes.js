import { addSelect } from "../putSelect.js";
import { fetchData } from "../fetchData.js";

export function tableClientes(datafetch, table){
  try {
    // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
    const data = datafetch.read();
    
    // Si la promesa fue exitosa, imprimimos los datos en la consola
    // console.log('Datos recibidos:', data);
} catch (promise) {
    // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
    if (promise instanceof Promise) {
        promise.then(() => {
            // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
            const data = datafetch.read();
            var body = ``; // Inicializamos una variable vacía para almacenar el contenido de las filas
            for (let i = 0; i < data.length; i++) {    
                body += `
                    <tr>
                        <td>${data[i].plaza}</td>
                        <td>${data[i].promotor}</td>
                        <td>${data[i].grupo}</td>
                        <td>${data[i].tipoCliente}</td>
                        <td>${data[i].operacion} </td>
                        <td>${data[i].tipoServicio}</td>
                        <td>${data[i].razonSocial}</td>
                        <td>${data[i].rfc}</td>
                        <td>
                            <button value='${JSON.stringify(data[i])}' class="btn btn-warning cliente" data-bs-toggle="modal" data-bs-target="#clienteModal">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `;
            }
            table.innerHTML = body; // Insertamos todo el contenido de una vez
            
            // Añadimos el event listener a todos los botones una vez que el contenido esté en el DOM
            const mHeader = document.getElementById('clienteModal-header');
            const btnNewAplication = document.querySelector('button.btn.btn-primary[data-bs-target="#nuevaAplicacion"]');
            document.querySelectorAll('button.btn.btn-warning.cliente').forEach(btn => {
                btn.addEventListener('click', () => {            
                    try {
                        const btnData = JSON.parse(btn.value);

                        mHeader.textContent = `Razon social: ${btnData.razonSocial}`;

                        const formUrl = document.getElementById('putClientes');
                        formUrl.setAttribute('url', `http://3.138.186.80:3005/operaciones/clientes/update/${btnData.id}`);
                        
                        const razonSocial = document.getElementById('editRs');
                        const inputRfc = document.getElementById('editRfc');

                        const dataPromotores = fetchData('http://3.138.186.80:3005/operaciones/promotores');
                        const editPromotor = document.getElementById('editPromotor');                      
                        addSelect(editPromotor, dataPromotores, btnData.promotor);

                        const dataTipoServicio = fetchData('http://3.138.186.80:3005/operaciones/servicios');
                        const editTipoServicio = document.getElementById('editTipoServicio');
                        addSelect(editTipoServicio,dataTipoServicio, btnData.tipoServicio)

                        const dataGrupos = fetchData('http://3.138.186.80:3005/operaciones/grupos');
                        const editGrup = document.getElementById('editGrup');
                        addSelect(editGrup,dataGrupos, btnData.grupo)

                        const dataPlaza = fetchData('http://3.138.186.80:3005/operaciones/plazas');
                        const editPlaza = document.getElementById('editPlaza');
                        addSelect(editPlaza,dataPlaza, btnData.plaza)

                        const dataTipoOperacion = fetchData('http://3.138.186.80:3005/operaciones/operaciones');
                        const editTipoOperacion = document.getElementById('editTipoOperacion');
                        addSelect(editTipoOperacion, dataTipoOperacion, btnData.operacion);

                        const dataTipoClientes = fetchData('http://3.138.186.80:3005/operaciones/clientes/tipos');
                        const editTipoCliente = document.getElementById('editTipoCliente');
                        addSelect(editTipoCliente,dataTipoClientes, btnData.tipoCliente)

  

                        btnNewAplication.value = `${btnData.id}`;
                        btnNewAplication.name = `${btnData.razonSocial}`

                        razonSocial.value = `${btnData.razonSocial}`
                        inputRfc.value = btnData.rfc;
                        


                    } catch (e) {
                        console.log('El valor no es un objeto JSON válido:', btn.value); // En caso de error
                    }
                });
            });
            
        });
        
    } else {
        // Si hay un error, lo mostramos en la consola
        console.error('Error al obtener los datos:', promise);
    }
  }
}