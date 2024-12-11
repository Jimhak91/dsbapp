export function pagosFactura(id, data) {
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
            const aplicacionesEncoded = encodeURIComponent(JSON.stringify(item.aplicaciones));
    
            return `
              <tr>
                <td>${index+1}</td>
                <td>${item.folioFactura}</td>
                <td>${aplicacionNombre}</td>
                <td>${item.nombre}</td>
                <td>${item.tipo}</td>
                <td>${item.deal}%</td>
                <td>$${item.subtotal}</td>
                <td>$${item.montoIva}</td>
                <td>$${item.totalFactura}</td>
                <td>
                  <button onClick="detailsAplicacion('${aplicacionesEncoded}', '${item.folioFactura}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pagosModal">
                    <span class="badge text-bg-primary rounded-pill">${item.aplicaciones.length}</span>
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
