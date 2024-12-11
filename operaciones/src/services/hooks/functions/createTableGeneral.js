export function createTableGeneral(headers, dataFetch, table, nodos) {
    try {
        // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
        const data = dataFetch.read();
        console.log('Datos recibidos:', data);

        // Genera la tabla con los datos recibidos y los nodos especificados
        renderTable(headers, data, table, nodos);
    } catch (promise) {
        // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
        if (promise instanceof Promise) {
            promise.then(() => {
                const data = dataFetch.read();
                renderTable(headers, data, table, nodos);
            });
        }
    }
}

function renderTable(headers, data, table, nodos) {
    // Generamos el encabezado de la tabla
    const theadContent = headers.map(header => `<th>${header}</th>`).join('');
    table.innerHTML = `<thead><tr>${theadContent}</tr></thead>`;

    // Generamos el cuerpo de la tabla
    const tbodyContent = data.map((item, index) => {
        // Creamos cada fila de acuerdo con los nodos especificados
        const rowContent = nodos.map(nodo => {
            const value = item[nodo] !== undefined ? item[nodo] : 'N/A';
            return `<td>${value}</td>`;
        }).join('');

        return `
            <tr>
                <td>${index + 1}</td>
                ${rowContent}
            </tr>
        `;
    }).join('');

    // Añadimos el tbody al contenido de la tabla
    table.innerHTML += `<tbody>${tbodyContent}</tbody>`;
}
