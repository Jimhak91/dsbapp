export function updateUrl(baseUrl, complement) {
    return new Promise((resolve, reject) => {
        try {
            if (!baseUrl || !complement) {
                throw new Error('Los parámetros baseUrl y complement son obligatorios');
            }
            
            // Concatenar baseUrl y complement para formar la URL completa
            const result = `${baseUrl}${complement}`;
            
            // Resolver la promesa con el resultado
            resolve(result);

        } catch (error) {
            // Rechazar la promesa en caso de error
            reject(`Error al construir la URL: ${error.message}`);
        }
    });
}
