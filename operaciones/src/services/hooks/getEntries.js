import { postData } from "./postData.js";

const forms = document.querySelectorAll('form').forEach(form => {    
    // let url = form.getAttribute('url');
    getForm(form);
});

function getForm(form) {
    form.addEventListener('submit', e => {
        let url = form.getAttribute('url');
        let method = form.getAttribute('method');
        e.preventDefault();

        const data = Object.fromEntries(
            new FormData(e.target)
        );
        console.log('data obtenida del entries:',data)
        postData(data, url, method);
        // if (Object.values(data).some(value => value === "")) {
        //     const response = {
        //         message: 'error',
        //         details: 'Datos vacíos o URL no válida'
        //     };
        //     console.log(JSON.stringify(response)); // Puedes mostrar un mensaje de error
        // } else {
        //     // Si los datos y la URL son válidos, procede con el envío
        //     //alert(JSON.stringify(data));
        //       // Llama a la función para hacer el POST
        //     //clearForm(form); // Limpia el formulario después del envío
        //     // console.log(data, url)
        // }
    });
}   
function clearForm(form) {
    form.reset(); // Resetea todos los inputs del formulario a sus valores por defecto
}

