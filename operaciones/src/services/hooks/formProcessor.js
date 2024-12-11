export function procesarForm() {
    document.querySelectorAll('form').forEach(form => {    
        form.addEventListener('submit', e => {
            //prevenir el evento default para que no se refresque la pagina
            e.preventDefault()
            //mandar el FORM a lprocesar para extraer los entries
            getForm(form);
        });
    });
}

function getForm(form) {
    console.log('entrando al get form')
    // Captura la URL y el método desde los atributos del formulario
    let url = form.getAttribute('url');
    let method = form.getAttribute('method');
    let formReset = form.getAttribute('formReset');
    

    // Prevenir el comportamiento predeterminado (envío)
    // form.addEventListener('submit', e => e.preventDefault());
    // Crear un objeto con los datos del formulario
    const data = Object.fromEntries(
        new FormData(form) // Se pasa el formulario directamente
    );

    
    // Validar si alguno de los valores está vacío
    
        // Si los datos y la URL son válidos, procede con el envío
        //alert(JSON.stringify(data));
        console.log(data)
        postData(data, url, method); // Llama a la función para hacer el POST
        
        if(!formReset == 'false' && formReset){
            clearForm(form)
        }
        //clearForm(form); // Limpia el formulario después del envío
        // console.log(data, url);

}

function clearForm(form) {
    form.reset(); // Resetea todos los inputs del formulario a sus valores por defecto
}

function postData(data, url, method) {
    
    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            try {
                // Asegúrate de que la respuesta esté en formato JSON
                const res = typeof response === 'string' ? JSON.parse(response) : response;
                
                // Recarga la tabla y muestra el mensaje                
                showToast(res.details);
                console.log(res)
                // Valida que el método sea 'PUT' y que res.data exista
                
                if (res.data) {
                    let resData;

                    // Verifica si res.data es un objeto
                    if (typeof res.data === 'object' && res.data !== null) {
                        resData = res.data; // Es un objeto JSON

                    } else {
                        try {
                            resData = JSON.parse(res.data); // Intenta analizarlo como JSON
                        } catch (error) {
                            console.error('Error al analizar res.data:', error);
                            showToast('Error al procesar los datos', 'bg-danger');
                            return; // Finaliza la ejecución en caso de error
                        }
                    }
                    // Aquí puedes poner la lógica que deseas ejecutar con res.data
                    return resData;
                }
                
                
            } catch (error) {
                console.error('Error al analizar la respuesta:', error);
                showToast('Error al procesar la respuesta del servidor', 'bg-danger');
            }
        },
        error: function(xhr, status, error) {
            // Manejo del error
            console.error('Error en la solicitud:', error);
            showToast('Error al enviar los datos', 'bg-danger');
        }
    });
}

    function showToast(message, bgColor = 'bg-success') {
    // Generar un ID único para cada toast
    const toastId = `toast-${Date.now()}`;
    
    // Crear el HTML del Toast con un ID único
    const toastHTML = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="${toastId}" class="toast ${bgColor}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">Notificación</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;

    // Insertar el HTML en el body
    document.body.insertAdjacentHTML('beforeend', toastHTML);

    // Inicializar y mostrar el Toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Eliminar el Toast después de 10 segundos
    setTimeout(() => {
        toastElement.remove();
    }, 10000); // Elimina después de 10 segundos
}



