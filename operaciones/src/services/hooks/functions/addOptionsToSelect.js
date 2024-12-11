export function addOptions(select, fetchData,onClick, selectedValue = null) {
    return new Promise((resolve, reject) => {
        try {
            // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
            const data = fetchData.read();
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

            resolve(); // Resuelve la promesa si todo va bien

        } catch (promise) {
            if (promise instanceof Promise) {
                promise.then(() => {
                    try {
                        const data = fetchData.read();
                        select.innerHTML = '';

                        data.forEach(grupo => {
                            const option = document.createElement('option');
                            option.value = grupo.id;
                            option.textContent = grupo.nombre;

                            if (selectedValue && grupo.nombre === selectedValue) {
                                option.selected = true;
                            }

                            select.appendChild(option);
                        });
                         // Agregar el evento de clic a los botones y llamar a la función onClick con los datos del botón clicado
                        select.addEventListener('change', e => {
                            // console.log(e.target.value);
                            let targetValue = e.target.value;
                            onClick(targetValue)
                        })

                        resolve(select); // Resuelve la promesa después de completar el llenado de opciones

                    } catch (error) {
                        reject(error); // Rechaza la promesa si ocurre un error
                    }
                }).catch(reject); // Si la promesa de fetchData falla, también se rechaza
            } else {
                reject(promise); // Rechaza la promesa si hay otro tipo de error
            }
        }
    });
}
