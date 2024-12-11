import { showToast } from "./showToast.js";
import { reloadTable } from "./loadTables.js";
import { loadDeal } from "./functions/loadDeal.js";
export function postData(data, url, method) {
    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            try {
                // console.log('respuesta antes de if:',response);
                // Asegúrate de que la respuesta esté en formato JSON
                const res = typeof response === 'string' ? JSON.parse(response) : response;
                
                // Recarga la tabla y muestra el mensaje
                // reloadTable();
                showToast(res.details);
                console.log(response)
                // Valida que el método sea 'PUT' y que res.data exista
                if (method === 'PUT' && res.data) {
                    // console.log('retornando respuesta:',response);

                    let resData;
                    // Verifica si res.data es un objeto
                    if (typeof res.data === 'object' && res.data !== null) {
                        resData = res; // Es un objeto JSON
                    } else {
                        try {
                            resData = JSON.parse(res); // Intenta analizarlo como JSON
                        } catch (error) {
                            console.error('Error al analizar res.data:', error);
                            // Aquí puedes manejar el error, tal vez asignar un valor predeterminado o lanzar un error
                            return; // o manejar el error de otra manera
                        }
                    }
                    // console.log(resData);
                    loadDeal(resData);
                    // console.log(resData);
                    // Aquí puedes poner la lógica que deseas ejecutar con res.data
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
