import { fetchData } from "../fetchData.js";
import { LoadEnv } from "../loadEnv.js";
import { procesarForm } from "../formProcessor.js";

let API_URL,PORT;
  // Usar las variables de entorno
  // Cargar las variables y asignarlas a las globales
LoadEnv()
.then(env => {
  API_URL = env.API_URL;
  PORT = env.PORT;
  //FINAL DE LAS VARIABLES DE ENTORNO
  })
  .catch(err => console.error('Error cargando las variables de entorno:', err));
  
export function loadFacturas(dataFetch, table) {
    try {
      // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
      const data = dataFetch.read();
      // Si la promesa fue exitosa, imprimimos los datos en la consola
      console.log('Datos recibidos:', data);
    } catch (promise) {
      // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
      if (promise instanceof Promise) {

        promise.then(() => {
          
          // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
          const data = dataFetch.read();
          
          const body = data
          .map((item, index) => {
            const aplicacionNombre = item.aplicaciones && item.aplicaciones.length > 0
              ? item.aplicaciones[0].nombre
              : 'N/A';
    
            // Usamos encodeURIComponent para manejar caracteres especiales
            return `
              <tr>
                <td>${index+1}</td>
                <td>${item.folioFactura}</td>
                <td>${item.razonSocial}</td>
                <td>${item.statusPago}</td>
                <td>${item.tipoFactura}</td>
                <td>${item.deal}</td>
                <td>${item.subtotal}</td>
                <td>${item.montoIva}</td>
                <td>${item.totalFactura}</td>
                <td>
                  <button onClick="detailsAplicacion('${item.idFactura}', '${item.folioFactura}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pagosModal">
                    <span class="badge text-bg-primary rounded-pill">Aplicaciones</span>
                  </button>
                </td>
              </tr>
            `;
          })
          .join('');
    
        table.innerHTML = body;  

          
        });
      } else {
        // Si hay un error, lo mostramos en la consola
        console.error('Error al obtener los datos:', promise);
      }
    }
  }



  // Asegúrate de que esta función esté en el contexto global
window.detailsAplicacion = function(idFactura, folio) {  

  const urlAplicaciones = `${API_URL}:${PORT}/operaciones/facturas/${idFactura}/aplicaciones`;
  const dataAplicaciones = fetchData(urlAplicaciones);
  console.log(urlAplicaciones);
  const headerPago = document.getElementById('nuevoPagoModalLabel');
  const RegistroPagos = document.getElementById('headerRegistroPagos');
  const appPorFactura = document.querySelector('.card-header.appPorFactura');
  const tableHistorial = document.getElementById('historialMovimientos');
  tableHistorial.innerHTML =`<tr><td colspan="5">Seleccione aplicacion.</td></tr>`;

  appPorFactura.innerHTML = `
  <h6>Registros de Aplicación con Factura: <b>${folio}</b></h6>
  `
  headerPago.innerHTML = `
  <h5 class="modal-title" id="nuevoPagoModalLabel">Registrar Nuevo Pago Para Factura:${folio}</h5>
  `
  RegistroPagos.innerHTML = `
  <h6 id="headerRegistroPagos">Pagos Realizados a: <b>${folio}</b></h6>
  `

  try {
    // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
    const data = dataAplicaciones.read();
    // Si la promesa fue exitosa, imprimimos los datos en la consola
    console.log('Datos recibidos:', data);
  } catch (promise) {
    if (promise instanceof Promise) {
      promise.then(() => {
      const data = dataAplicaciones.read();

        const selectCobro = document.getElementById('selectIdCobro');
      const defaultOption = `<option selected disabled>Aplicacion</option>`;
      const tableAplicaciones = document.querySelector('.aplicacionesFactura');
      const selectAplicacion = document.getElementById('aplicacionSelect');
      console.log(data.data)
      
      const body = data.data
      .map((item, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nombre}</td>
            <td>${item.deal}</td>
            <td>${item.cobro}</td>
            <td>${item.pagado}</td>
            <td>${item.montoTotal}</td>
          </tr>
        `;
      })
      .join('');  // Unir todos los elementos generados en un solo string
  
    tableAplicaciones.innerHTML = body;

      const options = data.data.map((option,index)=>{
        return`
        <option value="${option.idCobro}">Aplicacion: ${option.montoTotal}</option>
        `
        }).join(''); 

          selectCobro.innerHTML = defaultOption + options ;
          selectAplicacion.innerHTML = defaultOption + options;

          selectCobro.addEventListener('change', (event) => {
            // Recupera el valor seleccionado
            const selectedValue = event.target.value;
            detailsCobro(selectedValue)
            // Muestra el valor en la consola
          });
      })
      }else {
        // Si hay un error, lo mostramos en la consola
        console.error('Error al obtener los datos:', promise);
      } 
    
  } 
};


window.detailsCobro = async function(id) {
  const table = document.getElementById('historialMovimientos');
      console.log(table)
  
  if (!id || table == null) {
    console.log("Datos no procesados");
    return; // Salimos de la función si no hay un ID o la tabla es nula.
  }
  const urlHistorial = `${API_URL}:${PORT}/operaciones/cobros/${id}`;
  
  try {
    const response = await fetch(urlHistorial);
    

    // Manejo de la respuesta 404
    if (response.status === 404) {
      console.error('Error 404: No se encontraron registros ');
      table.innerHTML = `<tr><td colspan="5">No se encontraron registros</td></tr>`;
      return; // Salimos de la función
    }

    // Comprobamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }

    // Convertimos la respuesta a JSON
    const data = await response.json();

    // Verifica si data tiene la propiedad 'data' y es un array antes de usar map
    if (data && Array.isArray(data.data)) {
      
      // console.log('Datos recibidos:', data.data);
      const body = data.data.map((item, index) => {
        
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${item.fecha || 'No disponible'}</td>
            <td>${item.monto || 'No disponible'}</td>
            <td>${item.numTransferencia || 'No disponible'}</td>
            <td id="${item.id}" class="folioComplementoChange">
              ${item.folioComplemento || 'No disponible'}
              <button data-target='${JSON.stringify(item)}' type="button" class="btn btn-warning d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#ModalFolioComplemento">
                <svg data-target='${JSON.stringify(item)}' class="w-[21px] h-[21px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path data-target='${JSON.stringify(item)}' stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');
      table.innerHTML = body; // Insertar el HTML en la tabla        
      loadFolio()
      
    } else {
      console.error('La respuesta no contiene datos válidos:', data);
      table.innerHTML = `<tr><td colspan="5">No se encontraron registros.</td></tr>`;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    table.innerHTML = `<tr><td colspan="5">Error al obtener los datos. Por favor, intenta de nuevo más tarde.</td></tr>`;
  }
    
};


window.resetTable = async function() {
  const tableMovimientos = document.getElementById('historialMovimientos');
  tableMovimientos.innerHTML = `<tr><td colspan="5">Seleccione aplicacion.</td></tr>`;
}
//<div class="modal-body folioComplemento">

function loadFolio(){
  document.querySelectorAll('button.btn.btn-warning').forEach(btn => {
    btn.addEventListener('click', e => {
      const ModalBody = document.querySelector('div.modal-body.folioComplemento');
      let dataString = e.target.getAttribute('data-target');
      let data = JSON.parse(dataString);
      console.log(data)
      let inputBody =`
        <div class="input-group mb-3">
          <input type="text" name="folioComplemento" class="form-control" placeholder="${data.folioComplemento}" value="${data.folioComplemento}" aria-describedby="basic-addon2">
          <input hidden type="number" name="id" value="${data.id}">
          <span class="input-group-text" id="basic-addon2">Folio Complemento</span>
        </div>
      `;
      ModalBody.innerHTML = inputBody;

    });
  });
}
