import { CreateTable } from "./hooks/functions/createTable.js";
import { fetchData } from "./hooks/fetchData.js";
import { loadFacturas } from "./hooks/functions/createTableFacturas.js";
import { procesarForm } from "./hooks/formProcessor.js";
import { LoadEnv } from "./hooks/loadEnv.js";

let API_URL,PORT;
  // Usar las variables de entorno
  // Cargar las variables y asignarlas a las globales
LoadEnv()
.then(env => {
  API_URL = env.API_URL;
  PORT = env.PORT;

  //INICIO DE LAS VARIABLES DE ENTORNO
//table
const table = document.querySelector('.table.table-striped');
const tbodyViewApp = document.getElementById('viewAplicaciones');
//console.log(tbodyViewApp); 
const urlFacturas = `${API_URL}:${PORT}/operaciones/facturas`;
const dataFacturas = fetchData(urlFacturas);
const selectRazonSocial = document.querySelector('select.form-select.select-razonSocial');
const nameFactura = document.querySelector("input[name='nombreAFacturar']");
const modalNuevaFactura = document.getElementById('generarFacturaModal');
const buttons = document.querySelectorAll('.btn.btn-primary'); // Seleccionar todos los botones con la clase
const modal = document.getElementById('generarFacturaModal'); //MODAL GENERAR NUEVA FACTURA
  

//btn generar factura modal
// const btnFactura = document.querySelector('.btn.btn-outline-primary[data-bs-target="#generarFacturaModal"]');
//
// const collapseElement = document.getElementById('collapseWidthExample');
document.querySelector('.btn.btn-outline-primary[data-bs-target="#generarFacturaModal"]').addEventListener('click', e => {
  tbodyViewApp.innerHTML = `
    <tr>
        <td colspan="6">
            Seleccione año, mes y tipo de operacion...
      </td>
    </tr>
    `;
})


 // Agregar evento de cambio al select
// Agregar evento al botón que abre el modal
document.querySelector('.btn.btn-primary[data-bs-target="#nuevoPagoModal"]').addEventListener('click', e => {
  // Asegurar que ambos colapsos estén ocultos al abrir el modal
  const collapse1 = document.getElementById('multiCollapseExample1');
  const collapse2 = document.getElementById('multiCollapseExample2');

  if (collapse1.classList.contains('show') && collapse2.classList.contains('show')) {
    collapse1.classList.remove('show');
    collapse2.classList.remove('show');
}
  // Agregar evento al selector de aplicaciones
  document.getElementById('aplicacionSelect').addEventListener('change', () => {
      // Mostrar los colapsos cuando se selecciona una opción válida
      if (document.getElementById('aplicacionSelect').value) {
          new bootstrap.Collapse(collapse1, {
              toggle: true
          });
          new bootstrap.Collapse(collapse2, {
              toggle: true
          });
      }
  });
  Array.from(buttons).find(btn => btn.textContent.trim() === 'Registrar Pago').addEventListener('click', e => {
    collapse1.classList.remove('show');
    collapse2.classList.remove('show');
  })


});

let month = null, year = null, operation = null, cliente ,urlRazonesSociales;

let razonSocial, year2, mes, pendiente;   

addSelect(selectRazonSocial,dataFacturas);


//filtros de tabla para mostrar las facturas corresponientes
const tbody = table.querySelector('tbody');

// const checkPendientes = document.getElementById('flexSwitchCheckChecked');
// console.log(checkPendientes);
const filtersTable = [
    document.querySelector('select.form-select.select-razonSocial'),
    document.querySelector('select.form-select.mes-facturas'),
    document.querySelector('select.form-select.year-facturas'),
    document.getElementById('flexSwitchCheckChecked'),
];

//array de selects para modificar las url to get
const selects = [
  document.getElementById('yearSelect'),
  document.getElementById('monthSelect'),
  document.getElementById('operationSelect'),
  document.getElementById('razonSocialSelect')
];

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];


updateUrlFacturas();



filtersTable.forEach(select => {
    if (select) {
        select.addEventListener('change', handleFacturasSelect);
    }
});




function handleFacturasSelect(e) {
    let selectedValue;

    if (e.target.type === 'checkbox') {
        // Para checkbox, revisa el estado 'checked' directamente
        //console.log(e.target.checked ? '3' : '1'); // Muestra 1 si está checked, 0 si no
        pendiente = e.target.checked ? '3' : '1';
    } else {
        // Para selects, usa el value
        selectedValue = e.target.value;
        console.log(selectedValue);

        // Aquí actualizamos los valores según el tipo de input
        if (e.target.classList.contains('year-facturas')) {
            year2 = selectedValue;
        } else if (e.target.classList.contains('mes-facturas')) {
            mes = selectedValue === '0' ? null : selectedValue;
        } else if (e.target.classList.contains('select-razonSocial')) {
            razonSocial = selectedValue;
        }
    }

    updateUrlFacturas();
}

  function updateUrlFacturas(baseUrl = urlFacturas) {
      const urlAplicaciones = `${baseUrl}?pendiente=${pendiente || ''}&razonsocial=${razonSocial || ''}&mes=${mes || ''}&year=${year2 || ''}`;
      console.log(' entradno a la data de facturas,Generated URL:', urlAplicaciones);
      const dataFacturas = fetchData(urlAplicaciones);
      loadFacturas(dataFacturas, tbody);
  }

  function updateUrl() {
      if (month != null && year != null && operation != null) {
        // document.getElementById("razonSocialSelect").hidden = false;
        urlRazonesSociales = `${API_URL}:${PORT}/operaciones/registros/aplicaciones/filtrar?mes=${month}&year=${year}&operacion=${operation}`;
        console.log('Razones sociales seleccionadas:',urlRazonesSociales);

        if (selects.find(select => select.id === 'razonSocialSelect')) {
          razonSocialSelect.hidden = false;
          NewAddSelect(
              razonSocialSelect, // Select
              fetchData(urlRazonesSociales), // URL de datos
              null, // Nodo (puedes pasar un elemento aquí si es necesario)
              'razonSocial', // Valor inicial (si aplica)
              'idCliente' // Valor seleccionado por defecto (si aplica)
          )
        }
        

      } 
      // viewAplicaciones(urlRazonesSociales,tbodyViewApp);
  }

  function updateAplicaciones(){
    if (cliente != null) {
      console.log(cliente)
      viewAplicaciones(urlRazonesSociales,tbodyViewApp,cliente);
      if (month != null && year != null && operation != null) {
        updateNameFactura(
          urlRazonesSociales, //URL DE RAZONES SOCIALES
          nameFactura, //input donde va a estar la razon social seleccionada
          cliente, //el idCliente seleccionado del endpoint
        )
      }
    }
  }

  function updateNameFactura(url, input, value){
    const dataFetch = fetchData(url);
    try{
      // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
      const data = dataFetch.read();
      // Si la promesa fue exitosa, imprimimos los datos en la consola
      console.log('Datos recibidos:', data); 
    }catch(promise){
      if (promise instanceof Promise) {
        promise.then(() => {
          // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
          const data = dataFetch.read();
          for (let i = 0; i < data.length; i++) {
            if(data[i].idCliente == value){
              console.log(data[i].razonSocial)
              nameFactura.value = data[i].razonSocial;
            }
          }
          

        })
      }

    }
  }




// Llamada a la función
selects.forEach(select => {
  select.addEventListener('change', handleSelectChange);
});





function handleSelectChange(e) {
    const selectedValue = e.target.value;
    // Verifica que el valor no sea undefined ni una cadena vacía
    if (selectedValue !== undefined && selectedValue !== "") {
        
        // Asigna el valor correspondiente a la variable adecuada
        switch (e.target.id) {
             case 'razonSocialSelect':
                cliente = selectedValue;
                updateAplicaciones();
                 break;
            case 'yearSelect':
                //console.log(e.target)
                year = selectedValue;
                updateUrl();
                break;
            case 'monthSelect':
                month = selectedValue;
                updateUrl();
                break;
            case 'operationSelect':
                operation = selectedValue;
                updateUrl();
                break;
        }
        // Llama a la función para actualizar la URL
        
    }
} 






function viewAplicaciones(url, table, id){
    const dataFetch = fetchData(url);
    
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
            // console.log(data);
                var body = ``; // Inicializamos una variable vacía para almacenar el contenido de las filas
                for (let i = 0; i < data.length; i++) {
                  if(data[i].idCliente == id){
                    let aplicaciones = data[i].aplicaciones
                    for (let i = 0; i < aplicaciones.length; i++) {
                      console.log(aplicaciones[i])
                      body += `
                         <tr>
                             <td>${aplicaciones[i].razonSocial}</td>
                             <td>${aplicaciones[i].grupo && aplicaciones[i].grupo !== 'N/A' ? aplicaciones[i].grupo : 'Aplicación sin grupo'}</td>
                             <td>${aplicaciones[i]?.mesAplicado ? months[aplicaciones[i].mesAplicado - 1] : 'Mes no disponible'}</td>
                             <td>${aplicaciones[i].anualPeriodo}</td>
                             <td>${aplicaciones[i].estimulo}</td>
                             <td class="text-center align-middle">
                                 <div class="form-check d-flex justify-content-center">
                                     <input name='aplicacion[${i}]' class="form-check-input" type="checkbox" value="${aplicaciones[i].idAplicacion}">
                                 </div>
                             </td>

                        </tr>
                      `;
                      
                    }
                    table.innerHTML = body;
                  }
                }
            
          });
        } else {
          // Si hay un error, lo mostramos en la consola
          console.error('Error al obtener los datos:', promise);
        }
      }

}

// document.getElementById('generarFactura').addEventListener('click', e => {
//     console.log('Clik en generar facturas, cargando de nuevo la tabla',e.target);
//     if (selects.find(select => select.id === 'razonSocialSelect')) {
//       razonSocialSelect.hidden = true;
//     }
//     updateUrlFacturas();

//   })





 
function addSelect(select, fetchData, selectedValue = null,) {
    try {
      // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
      const data = fetchData.read();
      //option default
      
      
      // Si la promesa fue exitosa, imprimimos los datos en la consola
      console.log('Datos recibidos:', data);
      
      // Limpiamos el contenido del select
      select.innerHTML = '';
  
      // Rellenamos el select con las opciones
      data.forEach(grupo => {
        const option = document.createElement('option');
        option.value = grupo.id;
        option.textContent = grupo.nombre;
  
        // Si existe selectedValue, verificamos si el grupo.id es igual a selectedValue
        if (selectedValue && grupo.nombre === selectedValue) {
          option.selected = true;
        }
  
        select.appendChild(option);
      });
  
    } catch (promise) {
      // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
      if (promise instanceof Promise) {
        promise.then(() => {
            // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
            const data = fetchData.read();
            
            // Creamos la opción predeterminada
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Todas';
            
            // Limpiamos el contenido del select
            select.innerHTML = '';
            
            // Añadimos la opción predeterminada al inicio
            select.appendChild(defaultOption);
            
            // Rellenamos el select con las opciones de datos
            data.forEach(grupo => {
                const option = document.createElement('option');
                option.value = grupo.razonSocial  ;
                option.textContent = grupo.razonSocial;
                // Si existe selectedValue, verificamos si el grupo.razonSocial es igual a selectedValue
                if (selectedValue && grupo.razonSocial === selectedValue) {
                    option.selected = true;
                }
    
                select.appendChild(option);
            });
        });
    } else {
        // Si hay un error, lo mostramos en la consola
        console.error('Error al obtener los datos:', promise);
      }
    }
  }





  function NewAddSelect(select, fetchData, selectedValue = null, jsonData = 'jsonData', jsonValue = 'jsonValue') {
    return new Promise((resolve, reject) => {
        try {
            // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
            const data = fetchData.read();

            // Limpiamos el contenido del select
            select.innerHTML = '';

            // Agregamos la opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = ''; // Valor vacío
            defaultOption.textContent = 'Seleccionar'; // Texto por defecto
            defaultOption.selected = true; // Marcado como seleccionado por defecto
            defaultOption.disabled = true; // Desactivado para obligar a elegir una opción
            select.appendChild(defaultOption);

            // Añadimos las opciones al select
            data.forEach(item => {
                const option = document.createElement('option');
                // Usamos las propiedades especificadas en jsonValue y jsonData
                option.value = item[jsonValue]; // Valor dinámico
                option.textContent = item[jsonData]; // Texto dinámico

                // Marcamos como seleccionado si coincide con selectedValue
                if (selectedValue && item[jsonValue] === selectedValue) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            // Escuchamos el evento `change` en el select para obtener el texto seleccionado
            select.addEventListener('change', () => {
                resolve(select.options[select.selectedIndex].text); // Retornamos el texto seleccionado
            });

            // Si ya hay un valor seleccionado, lo resolvemos de inmediato
            if (select.selectedIndex > -1) {
                resolve(select.options[select.selectedIndex].text); // Resolvemos con el texto inicial seleccionado
            }
        } catch (promise) {
            if (promise instanceof Promise) {
                promise.then(() => {
                    // Cuando la promesa se resuelva, volvemos a llamar la función
                    NewAddSelect(select, fetchData, selectedValue, jsonData, jsonValue)
                        .then(resolve) // Resolvemos la promesa con el texto seleccionado
                        .catch(reject); // Propagamos errores
                });
            } else {
                // Si hay un error diferente, lo rechazamos
                reject('Error al obtener los datos: ' + promise);
            }
        }
    });
}

  
    

    // Evento cuando el modal se ha cerrado completamente
    

    // Evento antes de que el modal comience a cerrarse
    modal.addEventListener('hide.bs.modal', function (event) {
        console.log('El modal está a punto de cerrarse.');
        // Aquí puedes ejecutar lógica antes de cerrar el modal
    });
    modal.addEventListener('hidden.bs.modal', function (event) {
      console.log('El modal se ha cerrado.');
      updateUrlFacturas();
    });

    

  procesarForm();
  

















//FINAL DE LAS VARIABLES DE ENTORNO
})
.catch(err => console.error('Error cargando las variables de entorno:', err));

