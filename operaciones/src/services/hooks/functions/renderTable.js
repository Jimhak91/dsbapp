export function renderTable(headers, data, table, nodos, onClick) {
    const theadContent = headers.map(header => `<th>${header}</th>`).join('');
    table.innerHTML = `<thead><tr>${theadContent}</tr></thead>`;

    const tbodyContent = data.map((item, index) => {
        const rowContent = nodos.map(nodo => {
            const value = item[nodo] !== undefined ? item[nodo] : 'N/A';
            return `<td>${value}</td>`;
        }).join('');

        return `
            <tr>
                <td>${index + 1}</td>
                ${rowContent}
                <td>
                    <button type="button" class="btn btn-primary" data-index='${JSON.stringify(item)}'>
                        <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    table.innerHTML += `<tbody>${tbodyContent}</tbody>`;

    // Agregar el evento de clic a los botones y llamar a la función onClick con los datos del botón clicado
    table.querySelectorAll('.btn.btn-primary').forEach(button => {
        button.addEventListener('click', (event) => {
            const clickedData = JSON.parse(button.getAttribute('data-index'));
            onClick(clickedData); // Llama a la función de callback cada vez que se hace clic
            
        });
    });
}