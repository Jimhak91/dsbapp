export function AddTdTable(dataFetch, table){
    try {
        // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
        const data = dataFetch.read();
        // Si la promesa fue exitosa, imprimimos los datos en la consola
        
      } catch (promise) {
        // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
        if (promise instanceof Promise) {
          promise.then(() => {
            // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
            const data = dataFetch.read();
            console.log(data);

            if (data.length > 0 && data[0].hasOwnProperty('totalEstimulo')) {
                // Si totalEstimulo existe en el primer objeto, muestra el valor
                var body = `${data[0].totalEstimulo}`;
                table.innerHTML = body;
            } else {
                // Si no existe totalEstimulo, muestra los details
                var message = {message: 'success', details: 'sin datos'};
                console.log(message.details);
                table.innerHTML = message.details;
            } // Insertamos todo el contenido de una vez
                
          });
        } else {
          // Si hay un error, lo mostramos en la consola
          console.error('Error al obtener los datos:');
        }
      }
}