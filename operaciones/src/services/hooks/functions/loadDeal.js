export function loadDeal(dataFetch) {
  try {
        console.log(dataFetch);
      // Verificamos que dataFetch no sea null y tenga la función read
      if (dataFetch && typeof dataFetch.read === 'function') {
          const data = dataFetch.read();
          // Si los datos existen y son válidos, los usamos
          if (data && data.length > 0) {
            console.log(data);
              putData(data);
              
          }
      } else if (typeof dataFetch === 'object' && !Array.isArray(dataFetch)) {
          // Si dataFetch es un objeto JSON (y no un array)
          console.log('DATOS RETORNADOS DE LA RESPONSE',dataFetch)
              // console.log('El objeto es un JSON:', dataFetch);
              updateUI(dataFetch); // Aquí puedes manejarlo como desees
      } else {
          console.error('dataFetch no es válido');
      }
  } catch (promise) {
      // Si se lanza una promesa, esperamos a que se resuelva
      if (promise instanceof Promise) {
          promise.then(() => {
              // Volvemos a intentar leer los datos después de que se resuelva la promesa
              const data = dataFetch.read();
              
              if (data && data.length > 0) {
                  putData(data);
                  if(data[0].idTipoOperacion === 1){
                    //DIRECTO
                    console.log('declaraciones directo');
                    DeclaracionesDirecto(data);
                  }else if(data[0].idTipoOperacion === 2){
                    //HNC
                    console.log('declaraciones hnc');
                    DeclaracionesHnc(data);

                  }else if(data[0].idTipoOperacion === 3){
                    //BNB
                    DeclaracionesBnb(data);
                    console.log('declaraciones bnb');
                  }
              }
          }).catch(error => {
              console.error('Error al resolver la promesa:', error);
          });
      } else {
          console.error('Error al obtener los datos:', promise);
      }
  }
}


function updateUI(data) {
    const dataParse = data.data;
    console.log('actualizando data con la response',dataParse);
    // console.log('data2', data.data2)
    // const header = document.getElementById('headerRegistro');
    // console.log(header);
    const ivaMonto = document.getElementById('ivaMonto');
    const header = document.getElementById('headerRegistro');
    const headerEstimulo = document.getElementById('headerEstimulo');
    const subtotalInput = document.querySelector('input[name="subtotal"]');
    const totalInput = document.querySelector('input[name="total"]');
    const montoDsbInput = document.querySelector('input[name="montoDsb"]');
    const montoPromotorInput = document.querySelector('input[name="montoPromotor"]');
    const ahorroInput = document.querySelector('input[name="ahorro"]');
    
    ivaMonto.textContent = `IVA: ${data.data2 ? data.data2 : 0}`
    headerEstimulo.textContent = `Estimulo total: ${data.data3 ? data.data3 : 0}`;
    subtotalInput.value = `${dataParse.subtotal ? dataParse.subtotal : 0}`;
    totalInput.value = `${dataParse.total ? dataParse.total : 0}`;
    montoDsbInput.value = `${dataParse.montoDsb ? dataParse.montoDsb : 0}`;
    montoPromotorInput.value = `${dataParse.montoPromotor ? dataParse.montoPromotor : 0}`;
    ahorroInput.value = `${dataParse.ahorro}`;
}

function putData(data) {
    console.log('data to put ui: ', data);
    const ivaMonto = document.getElementById('ivaMonto');
    const processBar = document.getElementById('processBar');
    const header = document.getElementById('headerRegistro');
    const headerEstimulo = document.getElementById('headerEstimulo');
    const ivaClienteInput = document.querySelector('input[name="ivaCliente"]');
    const isrPmoralesInput = document.querySelector('input[name="isrPmorales"]');
    const isrRetencionesSalariosInput = document.querySelector('input[name="isrRetencionesSalarios"]');
    const isrRetencionesAsimInput = document.querySelector('input[name="isrRetencionesAsim"]');
    const isrRetencionesServInput = document.querySelector('input[name="isrRetencionesServ"]');
    const dealInput = document.querySelector('input[name="deal"]');
    const subtotalInput = document.querySelector('input[name="subtotal"]');
    const ivaFacturacionInput = document.querySelector('input[name="ivaFacturacion"]');
    const totalInput = document.querySelector('input[name="total"]');
    const porcentajeDsbInput = document.querySelector('input[name="porcentajeDsb"]');
    const montoDsbInput = document.querySelector('input[name="montoDsb"]');
    const porcentajePromotorInput = document.querySelector('input[name="porcentajePromotor"]');
    const montoPromotorInput = document.querySelector('input[name="montoPromotor"]');
    const ahorroInput = document.querySelector('input[name="ahorro"]');
    
    // Actualizar los elementos del DOM con los valores de los datos
    ivaMonto.textContent = `IVA: $${data[0].ivaCalculado ? data[0].ivaCalculado : 0}`
    processBar.style.width = `${data[0].Processbar}%`;
    header.textContent = `${data[0].razonSocial}`;
    headerEstimulo.textContent = `Estimulo total: ${data[0].totalEstimulo}`;
    //IMPUESTOS
    ivaClienteInput.value = `${data[0].ivaCliente}`;
    isrPmoralesInput.value = `${data[0].isrPmorales}`;
    isrRetencionesSalariosInput.value = `${data[0].isrRetencionesSalarios ? data[0].isrRetencionesSalarios : 0}`;
    isrRetencionesAsimInput.value = `${data[0].isrRetencionesAsim ? data[0].isrRetencionesAsim : 0 }`;
    isrRetencionesServInput.value = `${data[0].isrRetencionesServ ? data[0].isrRetencionesServ : 0 }`;
    //DEAL
    dealInput.value = `${data[0].deal ? data[0].deal : 50}`;
    subtotalInput.value = `${data[0].subtotal ? data[0].subtotal : 0}`;
    ivaFacturacionInput.value = `${data[0].ivaFacturacion ? data[0].ivaFacturacion : 0}`;
    totalInput.value = `${data[0].total ? data[0].total : 0}`;
    porcentajeDsbInput.value = `${data[0].porcentajeDsb ? data[0].porcentajeDsb : 0}`;
    montoDsbInput.value = `${data[0].montoDsb ? data[0].montoDsb : 0}`;
    porcentajePromotorInput.value = `${data[0].porcentajePromotor ? data[0].porcentajePromotor : 0}`;
    montoPromotorInput.value = `${data[0].montoPromotor ? data[0].montoPromotor : 0}`;
    ahorroInput.value = `${data[0].ahorro ? data[0].ahorro : 0 }`;
}

function DeclaracionesDirecto(data) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Seleccionar inputs
    const folioDeclaracion = document.querySelector('input[name="folioDeclaracion"]');
    const fechaDeDeclaracion = document.querySelector('input[name="fechaDeclaracion"]');

    const fechaElaboracionEscrito = document.querySelector('input[name="fechaElaboracionEscrito"]');
    const fechaRetornoAvisoFirmado = document.querySelector('input[name="fechaRetornoAvisoFirmado"]');

    const fechaIngresoAviso = document.querySelector('input[name="fechaIngresoAviso"]');
    const folioAvisoCliente = document.querySelector('input[name="folioAvisoCliente"]');

    const opinionCumplimiento = document.querySelector('input[name="opinionCumplimiento"]');
    const fechaGeneracionOpinionCumplimiento = document.querySelector('input[name="fechaGeneracionOpinionCumplimiento"]');

    const fechaEnvioExpediente = document.querySelector('input[name="fechaEnvioExpediente"]');


    folioDeclaracion.value = data[0]?.folioDeclaracion || '';
    fechaDeDeclaracion.value = data[0]?.fechaDeclaracion || ''
    fechaElaboracionEscrito.value = data[0]?.fechaElaboracionEscrito || '';
    fechaRetornoAvisoFirmado.value = data[0]?.fechaRetornoAvisoFirmado || '';
    fechaIngresoAviso.value = data[0]?.fechaIngresoAviso || '';
    folioAvisoCliente.value = data[0]?.folioAvisoCliente || ''
    opinionCumplimiento.value = data[0]?.opinionCumplimiento || '';
    fechaGeneracionOpinionCumplimiento.value = data[0]?.fechaGeneracionOpinionCumplimiento || '';
    fechaEnvioExpediente.value = data[0]?.fechaEnvioExpediente || '';

    // Asignar valores desde el JSON o la fecha actual

    console.log(data);
}

function DeclaracionesBnb(data) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Seleccionar inputs
    const recepcionPrevia = document.querySelector('input[name="recepcionPrevia"]');
    const fechaElaboracionAviso = document.querySelector('input[name="fechaElaboracionAviso"]');
    const folioResponsableSolidario = document.querySelector('input[name="folioResponsableSolidario"]');
    const fechaRecepcionDeclaracion = document.querySelector('input[name="fechaRecepcionDeclaracion"]');
    const folioDeclaracion = document.querySelector('input[name="folioDeclaracion"]');
    const fechaDeclaracion = document.querySelector('input[name="fechaDeclaracion"]');
    const fechaAvisoCliente = document.querySelector('input[name="fechaAvisoCliente"]');
    const folioAvisoCliente = document.querySelector('input[name="folioAvisoCliente"]');
    const opinionCumplimiento = document.querySelector('input[name="opinionCumplimiento"]');
    const fechaGeneracionOpinionCumplimiento = document.querySelector('input[name="fechaGeneracionOpinionCumplimiento"]');
    const fechaEnvioExpediente = document.querySelector('input[name="fechaEnvioExpediente"]');


    // Asignar valores desde el JSON o la fecha actual
    recepcionPrevia.value =data[0]?.recepcionPrevia || '';
    fechaElaboracionAviso.value = data[0]?.fechaElaboracionAviso || '';
    folioResponsableSolidario.value = data[0]?.folioResponsableSolidario || '';
    fechaRecepcionDeclaracion.value = data[0]?.fechaRecepcionDeclaracion || '';
    folioDeclaracion.value = data[0]?.folioDeclaracion || '';
    fechaDeclaracion.value = data[0]?.fechaDeclaracion || '';

    fechaAvisoCliente.value = data[0]?.fechaAvisoCliente || '';
    folioAvisoCliente.value = data[0]?.folioAvisoCliente || '';
    opinionCumplimiento.value = data[0]?.opinionCumplimiento || '';
    fechaGeneracionOpinionCumplimiento.value = data[0]?.fechaGeneracionOpinionCumplimiento || '';
    fechaEnvioExpediente.value = data[0]?.fechaEnvioExpediente || '';

    console.log(data);
}

function DeclaracionesHnc(data) {
    console.log('data de hnc',data)
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    const recepcionPrevia = document.querySelector('input[name="recepcionPrevia"]');
    const envioPrevia = document.querySelector('input[name="envioPrevia"]');
    const fechaElaboracionAviso = document.querySelector('input[name="fechaElaboracionAviso"]');
    const folioResponsableSolidario = document.querySelector('input[name="folioResponsableSolidario"]');
    const fechaRecepcionDeclaracion = document.querySelector('input[name="fechaRecepcionDeclaracion"]');
    const folioDeclaracion = document.querySelector('input[name="folioDeclaracion"]');
    const opinionCumplimiento = document.querySelector('input[name="opinionCumplimiento"]');
    const fechaGeneracionOpinionCumplimiento = document.querySelector('input[name="fechaGeneracionOpinionCumplimiento"]');
    const fechaEnvioExpediente = document.querySelector('input[name="fechaEnvioExpediente"]');
    const envioDeclaracion = document.querySelector('input[name="envioDeclaracion"]');
    const retornoExpediente = document.querySelector('input[name="retornoExpediente"]');
    const fechaDeclaracion = document.querySelector('input[name="fechaDeclaracion"]');
    const folioAvisoCliente = document.querySelector('input[name="folioAvisoCliente"]');
    const fechaAvisoCliente = document.querySelector('input[name="fechaAvisoCliente"]');

    // Asignar valores desde el JSON o la fecha actual
    recepcionPrevia.value = data[0]?.recepcionPrevia || '';
    fechaElaboracionAviso.value = data[0]?.fechaElaboracionAviso || '';
    folioResponsableSolidario.value = data[0]?.folioResponsableSolidario || '';
    fechaRecepcionDeclaracion.value = data[0]?.fechaRecepcionDeclaracion || '';
    folioDeclaracion.value = data[0]?.folioDeclaracion || '';
    opinionCumplimiento.value = data[0]?.opinionCumplimiento || '';
    fechaGeneracionOpinionCumplimiento.value = data[0]?.fechaGeneracionOpinionCumplimiento || '';
    fechaEnvioExpediente.value = data[0]?.fechaEnvioExpediente || '';
    envioPrevia.value = data[0]?.envioPrevia || '';
    // recepcionAvisoResponsableSolidario.value = data[0]?.fechaRetornoAvisoFirmado || today;
    envioDeclaracion.value = data[0]?.envioDeclaracion || '';
    retornoExpediente.value = data[0]?.retornoExpediente || '';
    fechaDeclaracion.value = data[0]?.fechaDeclaracion || '';
    folioAvisoCliente.value = data[0]?.folioAvisoCliente || '';
    fechaAvisoCliente.value =  data[0]?.fechaAvisoCliente || '';
    
}


