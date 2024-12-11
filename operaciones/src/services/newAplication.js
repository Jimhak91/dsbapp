const titleModal = document.getElementById('newAplicationHeader');
const inputId = document.querySelector('input.form-control[name="idCliente"]');
{/* <input required name="idCliente" type="text" class="form-control" hidden></input> */}
document.querySelectorAll('button.btn.btn-primary[data-bs-target="#nuevaAplicacion"]').forEach(btn => {
    btn.addEventListener('click', () => {
        inputId.value = `${btn.value}`;
        titleModal.textContent = `Nueva Aplicacion para: ${btn.name}`;
    });
});


