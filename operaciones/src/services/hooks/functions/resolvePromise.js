
export function resolvePromise(dataFetch) {
    return new Promise((resolve, reject) => {
        try {
            const data = dataFetch.read();
            // console.log('Datos recibidos:', data);
            // renderTable(headers, data, table, nodos);
            resolve(data); // Retorna los datos si ya están disponibles
        } catch (promise) {
            if (promise instanceof Promise) {
                promise.then(() => {
                    const data = dataFetch.read();
                    resolve(data); // Retorna los datos cuando la promesa se resuelve
                }).catch(reject); // Maneja cualquier error en la promesa
            } else {
                reject(promise); // Rechaza si hay otro tipo de error
            }
        }
    });
}



