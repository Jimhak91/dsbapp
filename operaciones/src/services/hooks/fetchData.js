const getSuspender = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export function fetchData(url) {
  // En lugar de fetch, utilizamos una promesa con $.ajax
  const promise = new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        resolve(data); // Resolvemos con la data en caso de éxito
      },
      error: function(error) {
        reject(error); // Rechazamos con el error en caso de fallo
      }
    });
  });

  // Usamos la función getSuspender para manejar el estado de la promesa
  return getSuspender(promise);
}
