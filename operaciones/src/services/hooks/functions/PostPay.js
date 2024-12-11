export function PostPay(data, url, method){
    // console.log(data, url, method);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                try {
                    // console.log(data);
                    // Asegúrate de que la respuesta esté en formato JSON
                    const res = typeof response === 'string' ? JSON.parse(response) : response;
                    // Muestra el mensaje
                    showToast(res.details);
                    resolve(res); // Resuelve la promesa con la respuesta
                } catch (error) {
                    console.error('Error al analizar la respuesta:', error);
                    showToast('Error al procesar la respuesta del servidor', 'bg-danger');
                    reject(error); // Rechaza la promesa con el error
                }
            },
            error: function(xhr, status, error) {
                // Manejo del error
                console.error('Error en la solicitud:', error);
                showToast('Error al enviar los datos', 'bg-danger');
                reject(error); // Rechaza la promesa con el error
            }
        });
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
