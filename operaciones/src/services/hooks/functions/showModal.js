export function showModal(data, modalTitle, modalElement) {
    // console.log(modalElement)
    const modalInstance = new bootstrap.Modal(modalElement);
    
    
    const modalBody = document.querySelector('.modal-body');
    const titleModal = document.querySelector('.modal-title');
    const saveBtn = document.querySelector('.btn.btn-primary.saveButton');
     saveBtn.removeAttribute('disabled'); // Activa el botón
    // // console.log(data, modalBody, titleModal, saveBtn);

     titleModal.textContent = modalTitle;

     // Construir el contenido del modal usando las propiedades de data
     const showModalBody = `
         <div class="card mb-3">
             <div class="card-body">
                 <h5 class="card-title">${data.razonSocial}</h5>
                 <p class="card-text"><strong>ID Registro:</strong> ${data.idRegistro}</p>
                 <p class="card-text"><strong>Promotor ID:</strong> ${data.Idpromotor}</p>
                 <p class="card-text"><strong>Monto Total:</strong> ${data.montoTotal}</p>
                 <p class="card-text"><strong>Estado:</strong> ${data.nombre}</p>
                 <p class="card-text"><strong>Liberado:</strong> ${data.liberado ? 'Sí' : 'No'}</p>
                 <p class="card-text"><small class="text-muted"><strong>Fecha de ultimo cobro</strong> ${new Date(data.fechaCobro).toLocaleDateString()}</small></p>
             </div>
         </div>
     `;
    
     // Insertar el contenido generado en el cuerpo del modal
     modalBody.innerHTML = showModalBody;
     // Mostrar el modal después de cargar todo el cuerpo
     modalInstance.show();

     // Retornar una promesa que se resuelve con el evento de clic de saveBtn
     return new Promise((resolve) => {
         saveBtn.addEventListener('click', (e) => {
             saveBtn.setAttribute('disabled', 'true'); // Desactiva el botón
             resolve(e); // Resuelve la promesa con el evento de clic
         });
     });
}

