export function showToast(message, bgColor = 'bg-success') {
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
