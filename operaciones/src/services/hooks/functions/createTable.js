import { fetchData } from '../fetchData.js'
import { loadDeal } from './loadDeal.js';
export function CreateTable(dataFetch,table,year, mes){
    try {
        // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
        const data = dataFetch.read();
        // Si la promesa fue exitosa, imprimimos los datos en la consola
        console.log('Datos recibidos:', data);
      } catch (promise) {
        // Si se lanza una promesa (está en estado pendiente), esperamos a que se resuelva
        if (promise instanceof Promise) {
          promise.then(() => {
            //
            // Una vez que la promesa se resuelve, volvemos a intentar leer los datos
            const data = dataFetch.read();
            // bandera.setAttribute('value');
            // bandera.value = data[1].idTipoOperacion;

                var body = ``; // Inicializamos una variable vacía para almacenar el contenido de las filas
                for (let i = 0; i < data.length; i++) {    
                    body += `
                        <tr>
                            <td>${data[i].nombre}</td>
                            <td>${data[i].Grupo}</td>
                            <td>${data[i].razonSocial}</td>
                            <td>${data[i].mesAplicado} ${data[i].anualAplicado}</td>
                            <td>${data[i].totalEstimulo}</td>
                            <td>
                                <button value='${JSON.stringify(data[i].idCliente)}' year='${year}' mes='${mes}' data-bs-toggle="modal" class="btn btn-primary aplicacion" data-bs-target="#modalEditRegistro">
                                    <span class="badge text-bg-primary rounded-pill">${data.length}</span>
                                </button>
                            </td>
                        </tr>
                    `;
                }
                table.innerHTML = body; // Insertamos todo el contenido de una vez


            // ABRIR MODAL DE REGISTROS DE APLICACION
            document.querySelectorAll('button.btn.btn-primary.aplicacion[data-bs-target="#modalEditRegistro"]').forEach(btn=>{
              
              let idCliente = btn.getAttribute('value');
              let mes = btn.getAttribute('mes');
              let year = btn.getAttribute('year');

              btn.addEventListener('click',e => {
                //http://3.138.186.80:3005/operaciones/registros/buscar/34/5/2024
                const bandera = document.getElementById('bandera');
                const urlAccordion = `http://3.138.186.80:3005/operaciones/registros/buscar/${idCliente}/${mes}/${year}`
                console.log(urlAccordion)
                const dataAccordion = fetchData(urlAccordion);
                const accordion = document.getElementById('accordionExample');
                const itemsDeclaraciones = document.getElementById('declaraciones-items');
                


                try{ 
                  // Intentamos leer los datos. Si la promesa aún está pendiente, suspenderá.
                  const data = dataAccordion.read();
                  // Si la promesa fue exitosa, imprimimos los datos en la consola
                  console.log('Datos recibidos:', data);
                }catch(promise){
                  //DATA DEL MODAL//////////////////////////////////*************************************** */
                  if (promise instanceof Promise) {
                    promise.then(() => {
                      const data = dataAccordion.read();
                      bandera.value = data[0].idTipoOperacion;
                      console.log(bandera.value, bandera); // Para ver el valor actualizado en la consola

                      const itemsDeclaraciones = document.getElementById('declaraciones-items');
                      let declaraciones = '';

                      if (data[0].idTipoOperacion === 1) {
                        // DIRECTO
                        declaraciones = `
                          <div class="p-4 m-2" style="background-color: #c8e4b4; border-radius: 15px;">
                            <h4 style="color: #ffffff;"><b>DECLARACIONES</b></h4>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>FOLIO DE DECLARACION</th>
                                  <th>FECHA DE DECLARACION</th>
                                  <th>FECHA ELABORACION DEL ESCRITO</th>
                                  <th>FECHA RETORNO AVISO FIRMADO</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" class="form-control" name="folioDeclaracion"></td>
                                  <td><input type="text" class="form-control" name="fechaDeclaracion"></td>
                                  <td><input type="date" class="form-control" name="fechaElaboracionEscrito" ></td>
                                  <td><input type="date" class="form-control" name="fechaRetornoAvisoFirmado" ></td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>FECHA INGRESO AVISO</th>
                                  <th>FOLIO ACUSE AUTORIDAD</th> 
                                  <th>OPNION DE CUMPLIMIENTO</th>
                                  <th>FECHA DE GENERACION DE OPINION</th>
                                  <th>FECHA ENVIO EXPEDIENTE</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="date" class="form-control" name="fechaIngresoAviso" ></td>
                                  <td><input type="text" class="form-control" name="folioAvisoCliente" ></td>
                                  <td><input type="text" class="form-control" name="opinionCumplimiento" ></td>
                                  <td><input type="text" class="form-control" name="fechaGeneracionOpinionCumplimiento"></td>
                                  <td><input type="date" class="form-control" name="fechaEnvioExpediente" ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>`;
                      } else if (data[0].idTipoOperacion === 2) {
                        // TIPO DE OPERACION HNC
                        declaraciones = `
                          <div class="p-4 m-2" style="background-color: #c8e4b4; border-radius: 15px;">
                            <h4 style="color: #ffffff;"><b>DECLARACIONES</b></h4>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>RECEPCION DE LA PREVIA</th>
                                  <th>ENVIO DE LA PREVIA HNC</th>
                                  <th>FECHA DEL ACUSE RS</th> 
                                  <th>FOLIO DE ACUSE RS</th> 
                                  <th>FECHA DE RECEPCION DE DECLARACION</th>
                                  <th>ENVIO DECLARACION HNC</th>
                                  <th>FOLIO DE DECLARACION</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="date" class="form-control" name="recepcionPrevia"></td>
                                  <td><input type="date" class="form-control" name="envioPrevia"></td>
                                  <td><input type="date" class="form-control" name="fechaElaboracionAviso"></td>
                                  <td><input type="text" class="form-control" name="folioResponsableSolidario"></td>
                                  <td><input type="date" class="form-control" name="fechaRecepcionDeclaracion"></td>
                                  <td><input type="date" class="form-control" name="envioDeclaracion"></td>
                                  <td><input type="text" class="form-control" name="folioDeclaracion"></td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>FECHA DECLARACION</th>
                                  <th>RETORNO EXPEDIENTE POR HNC</th>
                                  <th>FOLIO AVISO CLIENTE</th>
                                  <th>FECHA DEL AVISO AL CLIENTE</th>
                                  <th>OPINION DE CUMPLIMIENTO</th>
                                  <th>FECHA DE GENERACION DE OPINION</th>
                                  <th>FECHA ENVIO EXPEDIENTE</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="date" class="form-control" name="fechaDeclaracion"></td>
                                  <td><input type="date" class="form-control" name="retornoExpediente"></td>
                                  <td><input type="text" class="form-control" name="folioAvisoCliente"></td>
                                  <td><input type="date" class="form-control" name="fechaAvisoCliente"></td>
                                  <td><input type="text" class="form-control" name="opinionCumplimiento" ></td>
                                  <td><input type="text" class="form-control" name="fechaGeneracionOpinionCumplimiento"></td>
                                  <td><input type="date" class="form-control" name="fechaEnvioExpediente"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>`;
                      } else if (data[0].idTipoOperacion === 3) {
                        // TIPO DE OPERACION BNB
                        declaraciones = `
                          <div class="p-4 m-2" style="background-color: #c8e4b4; border-radius: 15px;">
                            <h4 style="color: #ffffff;"><b>DECLARACIONES</b></h4>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>RECEPCION DE LA PREVIA</th>
                                  <th>FECHA ELABORACION DEL AVISO</th>
                                  <th>FOLIO RESPONSABLE SOLIDARIO</th> 
                                  <th>FECHA DE RECEPCION DE DECLARACION</th>
                                  <th>FOLIO DECLARACION</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="date" class="form-control" name="recepcionPrevia"></td>
                                  <td><input type="date" class="form-control" name="fechaElaboracionAviso"></td>
                                  <td><input type="text" class="form-control" name="folioResponsableSolidario"></td>
                                  <td><input type="date" class="form-control" name="fechaRecepcionDeclaracion"></td>
                                  <td><input type="text" class="form-control" name="folioDeclaracion"></td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                              <thead>
                                <tr>
                                  <th>FECHA DECLARACION</th>
                                  <th>FECHA AVISO CLIENTE</th>
                                  <th>FOLIO AVISO CLIENTE</th>
                                  <th>OPINION DE CUMPLIMIENTO</th>
                                  <th>FECHA OPINION CUMPLIMIENTO</th>
                                  <th>FECHA ENVIO EXPEDIENTE</th> 
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" class="form-control" name="fechaDeclaracion"></td>
                                  <td><input type="date" class="form-control" name="fechaAvisoCliente"></td>
                                  <td><input type="text" class="form-control" name="folioAvisoCliente"></td>
                                  <td><input type="text" class="form-control" name="opinionCumplimiento"></td>
                                  <td><input type="text" class="form-control" name="fechaGeneracionOpinionCumplimiento"></td>
                                  <td><input type="date" class="form-control" name="fechaEnvioExpediente"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>`;
                      }

                      itemsDeclaraciones.innerHTML = declaraciones;
                      console.log('DATA PARA EL MODAL',data);
                      var bodyAplicaciones = ``; // Inicializamos una variable vacía para almacenar el contenido de las filas
                      for (let i = 0; i < data.length; i++) {    
                        bodyAplicaciones += `
                            <div class="accordion-item${i}">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" registro='${data[i].idRegistro}' iData=${i} data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                                        Aplicacion ${i + 1}: ${data[i].mesAplicado} ${data[i].anualAplicado}
                                    </button>
                                </h2>
                                <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="mb-3">
                                            <label for="exampleFormControlTextarea${i}" class="form-label">Comentarios</label>
                                            <textarea 
                                                placeholder="${data[i].comentario ? data[i].comentario : 'Comentarios'}" 
                                                class="form-control" 
                                                id="exampleFormControlTextarea${i}" 
                                                rows="3"
                                            ></textarea>
                                            <input type="hidden" id="hiddenInput${i}" name="Comentario[${data[i].idRegistro}]">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }                    
                      accordion.innerHTML = bodyAplicaciones;
                      document.querySelectorAll('button.accordion-button').forEach(btn=> 
                        btn.addEventListener('click', e=>{
                          let idRegistro = e.target.getAttribute('registro');
                          let iData = e.target.getAttribute('iData');
                          

                          const textarea = document.getElementById(`exampleFormControlTextarea${iData}`);
                          const hiddenInput = document.getElementById(`hiddenInput${iData}`);
                          console.log('click del btn desplegable', iData, 'id de registro de aplicacion: ', idRegistro);

                          textarea.addEventListener('input', () => {
                              hiddenInput.value = textarea.value;
                          });
                          
                          console.log(idRegistro);
                          //http://3.138.186.80:3005/operaciones/registros/buscar/15  ENPOINT DEL REGISTRO
                          // console.log(idCliente,mes,year,accordion);
                          const form = document.getElementById('updateForm');

                          //URL PARA REALIZAR EL UPDATE DE EL REGISTRO
                          form.setAttribute('url', `http://3.138.186.80:3005/operaciones/registros/editar/${idRegistro}`);
                          
                          //ENPOINT PARA BUSCAR TODOS LOS REGISTROS DE ESE CLIENTE
                          //http://3.138.186.80:3005/operaciones/registros/buscar/CLIENTE/MES/YEAR
                          let url = `http://3.138.186.80:3005/operaciones/registros/buscar/${idRegistro}`;
                          console.log('url para buscar registro especifico', url);
                          // console.log(url);
                          //http://localhost:3005/operaciones/registros/buscar/4/1/2024
                          let dataRegistro = fetchData(url);
                          //METODO
                          loadDeal(dataRegistro); 
                        })
                      )
                    })}
                }
              });
            });     
          });
        } else {
          // Si hay un error, lo mostramos en la consola
          console.error('Error al obtener los datos:', promise);
        }
      }
}

function reloadInput(dataFetch,inputs){
  inputs.forEach(input => {
    input.addEventListener('input', () => {
        loadDeal(dataFetch); // Llamar a loadDeal al cambiar un input
    });
  });
}