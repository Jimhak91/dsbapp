// Leer el archivo .env y cargar las variables de entorno
export function LoadEnv() {
    return fetch('/operaciones/.env') // Asegúrate de servir el archivo en el servidor
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el archivo .env');
        return response.text();
      })
      .then(data => {
        const variables = {};
        data.split('\n').forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) variables[key.trim()] = value.trim();
        });
        return variables;
      });
  }
  

  