export function addSelect(select, fetchData, selectedValue = null) {
  try {
    // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
    const data = fetchData.read();

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

        // Agregamos el evento para el botón "newRecord"
        document.querySelector('.btn.btn-primary[name=newRecord]')
          .addEventListener('click', () => {
            select.innerHTML = '';
            data.forEach(grupo => {
              const option = document.createElement('option');
              option.value = grupo.id;
              option.textContent = grupo.nombre;

              // Si existe selectedValue, verificamos si el grupo.id es igual a selectedValue
              if (selectedValue && grupo.id === selectedValue) {
                option.selected = true;
              }

              select.appendChild(option);
            });
          });
      });
    } else {
      // Si hay un error, lo mostramos en la consola
      console.error('Error al obtener los datos:', promise);
    }
  }
}
