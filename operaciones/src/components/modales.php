

<!-- Modal NUEVO CLIENTE-->

<div class="modal fade" id="modalNewRecord" tabindex="-1" aria-labelledby="modalNewRecordLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
  <form url="http://3.138.186.80:3005/operaciones/clientes/nuevo" method="POST">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Nuevo Cliente</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modalDefaul">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Razon Social</span>
              <input name="razonSocial" type="text" class="form-control" placeholder="Ingrese la razon social" required name="razonSocial" aria-describedby="basic-addon1">
            </div>
    
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">RFC</span>
                <input required name="rfc" type="text" class="form-control" placeholder="Ingrese RFC" aria-describedby="basic-addon2">
            </div>

            <!-- <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Responsable Solidario</span>
              <input name="responsableSolidario" type="text" class="form-control" placeholder="Ingrese responsable solidario" required name="responsableSolidario" aria-describedby="basic-addon1">
            </div> -->

              <!-- SELECCION DE PROMOTOR -->
            <div class="mb-3">
              <!-- <label for="basic-url" class="form-label">Seleccione Promotor</label> -->
              <div class="input-group promotores">
                <span class="input-group-text" id="basic-addon3">Promotor</span>
                <select name="idPromotor" class="form-select" aria-label="Default select example"></select>
              </div>
              <div class="form-text" id="basic-addon4">info</div>
            </div>
            <!-- SELECCION DE TIPO DE SERVICIO -->
            <div class="mb-3">
              <!-- <label for="basic-url" class="form-label">Seleccione Promotor</label> -->
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Tipo de Servicio</span>
                <select name="idTipoServicio" class="form-select" aria-label="Default select example"></select>
              </div>
              <div class="form-text" id="basic-addon4">info</div>
            </div>
            <!-- SELECCION DE GRUPO -->
            <div class="mb-3">
              <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Grupo</span>
                  <select name="idGrupo" class="form-select" aria-label="Default select example"></select>
                </div>
                <div class="form-text" id="basic-addon4">info</div>
            </div>
    
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Plaza</span>
                <select name="idPlaza" class="form-select" aria-label="Default select example">
                </select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>
    
              <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Tipo de Operacion</span>
                <select name="idTipoOperacion" class="form-select" aria-label="Default select example"></select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>
              <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Selecciona tipo de cliente</span>
                <select name="idTipoCliente" class="form-select" aria-label="Default select example"></select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>  
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" class="btn btn-primary">Crear</button>
            </div>
          </div>
        </form>
        </div>
      </div>
  
    <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditRegistro">
    Launch demo modal
  </button> -->

  <!-- MODAL DE EDITAR REGISTRO **********************************************************************-->
  <div class="modal fade" id="modalEditRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
    <form method="PUT" id="updateForm">
      <!-- bandera*************************************************************************************************** -->
      <input name="bandera" hidden type="" id="bandera"> 
      <div class="modal-content">
        <div class="modal-header">
          <div class="container">
            <div class="row">
              <div class="col">
                <h1 class="modal-title fs-5" id="headerRegistro"></h1>
              </div>
              <div class="col">
                <h1 class="modal-title fs-2" style="color: blue;" id="headerEstimulo">Seleccione Aplicacion</h1>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column" style="gap: 15px;">

        <div class="progress" role="progressbar" aria-label="Danger striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div id="processBar" class="progress-bar progress-bar-striped bg-primary" ></div>
        </div>
          
          <div class="row">
            <div class="col-2">

            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Aplicacion
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Comentarios</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
            <!-- Columna lado derecho -->
            <div class="col-10">

            <div>
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <a class="nav-link active" href="#" data-bs-target="#carouselExampleDark" data-bs-slide-to="0">Deal</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" data-bs-target="#carouselExampleDark" data-bs-slide-to="1">Declaraciones</a>
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link" href="#" data-bs-target="#carouselExampleDark" data-bs-slide-to="2">Facturación</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" aria-disabled="true">Pagos</a>
                </li> -->
              </ul>
            </div>
              <!---->
              <div id="carouselExampleDark" class="carousel carousel-dark slide">
                <!-- <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div> -->
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="10000">

                  <div class="p-4 m-2" style="background-color: #b8c4e4; border-radius: 15px;" >
                      <!-- < ?php include './tableImpuestos.php' ?> -->
                      <h4 style="color: #ffffff;"><b>DESGLOSE DE IMPUESTOS</b></h4>
                      <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                        <thead>
                          <tr>
                            <th scope="col">IVA</th>
                            <th scope="col">ISR PERSONAS MORALES PFCAE</th>
                            <th scope="col">ISR RETENCIONES SALARIOS</th>
                            <th scope="col">ISR RETENCIONES ASIM. A SALARIOS-SERV PROF.</th>
                            <th scope="col">ISR RETENCIONES SERV. PROF. O ARRENDAMIENTO</th>
                          </tr>
                        </thead>
                        <tbody class="tableImpuestos">
                          
                          <tr>
                            <td>
                              <div class="input-group">
                                <span class="input-group-text" id="basic-addon3">$</span>
                                <input type="number" value="0" name="ivaCliente" class="form-control" placeholder="Ingrese IVA">
                              </div>
                            </td>
                              
                            <td>
                              <div class="input-group">
                                  <span class="input-group-text" id="basic-addon3">$</span>
                                  <input type="number" value="0" name="isrPmorales" class="form-control" placeholder="Ingrese ISR PFCAE">
                                </div>
                            </td>
                            <td>
                              <div class="input-group">
                                <span class="input-group-text" id="basic-addon3">$</span>
                                  <input type="number" value="0" name="isrRetencionesSalarios" class="form-control" placeholder="Ingrese ISR Salarios">
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                  <span class="input-group-text" id="basic-addon3">$</span>
                                  <input type="number" value="0"name="isrRetencionesAsim" class="form-control" placeholder="Ingrese ISR Asim. Salarios">
                                </div>
                            </td>
                            <td>
                              <div class="input-group">
                                  <span class="input-group-text" id="basic-addon3">$</span>
                                  <input type="number" value="0" name="isrRetencionesServ" class="form-control" placeholder="Ingrese ISR Arrendamiento">
                                </div>
                                
                            </td>
                          </tr>
                        <!-- <button type="submit">Guardar</button> -->
                          
                        </tbody>
                      </table>
                  </div>

                  <div class="p-4 m-2" style="background-color: #ffccac; border-radius: 15px;">
                    <!-- < ?php include './tableDeal.php' ?>  -->
                    <h4 style="color: #ffffff;"><b>DEAL</b></h4>
                    <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                    <thead>
                        <tr>
                          <th>DEAL</th>
                          <th>SUBTOTAL</th>
                          <th id="ivaMonto">IVA</th>
                          <th>TOTAL FACTURADO</th>
                          <th>PORCENTAJE DSB </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>  
                            <input type="number" value="0" class="form-control" name="deal" step="0.01">
                          </td>
                          <td><input type="number" value="0" class="form-control" name="subtotal" readonly step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="ivaFacturacion" step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="total" readonly step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="porcentajeDsb" step="0.01"></td>
                        
                        </tr>
                        <!-- Más filas pueden ser añadidas aquí -->
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover" style="border-radius: 10px; overflow: hidden;">
                      <thead>
                        <tr>
                          
                          <th>MONTO DSB </th>
                          <th>PORCENTAJE PROMOTOR</th>
                          <th>MONTO PROMOTOR</th>
                          <th>AHORRO</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          
                          <td><input type="number" value="0" class="form-control" name="montoDsb" readonly step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="porcentajePromotor"  step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="montoPromotor" readonly step="0.01"></td>
                          <td><input type="number" value="0" class="form-control" name="ahorro" readonly step="0.01"></td>
                        </tr>
                        <!-- Más filas pueden ser añadidas aquí -->
                      </tbody>
                    </table>
                    </div>

                  </div>
<!-- ------------------------menu lateral izquierdo para las Declaraciones*------------------------------------------------------- -->
                  <div class="carousel-item" data-bs-interval="2000" id="declaraciones-items">
                  
                  </div>
<!-- ------------------------menu lateral izquierdo para las Declaraciones*------------------------------------------------------- -->

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" class="btn btn-primary" id="saveRegistro">Guardar Cambios</button>
        </div>
      </div>
      </form>
    </div>
  </div>

  <!-- MODAL EDITAR CLIENTES -->
   <!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#clienteModal">
  Launch demo modal
</button> -->

<!-- MODAL EDITAR DATOS GENERALES DEL CLIENTE -->
<div class="modal fade" id="clienteModal" tabindex="-1" aria-labelledby="clienteModal" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <form url="" id="putClientes" method="PUT">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="clienteModal-header">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="p-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevaAplicacion">Nueva aplicacion</button>
          </div>
          <h3>Datos Generales</h3>
          <div class="clienteModal">
          <div class="p-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Razon Social</span>
              <input name="razonSocial" id="editRs" type="text" class="form-control" placeholder="Ingrese nueva razon social" value="" required name="razonSocial" aria-describedby="basic-addon1">
            </div>
            
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">RFC</span>
                <input required name="rfc" id="editRfc" type="text" class="form-control" placeholder="Ingrese RFC"  aria-describedby="basic-addon2">
            </div>

            <!-- <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Responsable Solidario</span>
              <input name="responsable Solidario" id="editRs" type="text" class="form-control" placeholder="Ingrese responsable solidario" value="" required name="responsableSolidario" aria-describedby="basic-addon1">
            </div> -->
            
              <!-- SELECCION DE PROMOTOR -->
            <div class="mb-3">
              <!-- <label for="basic-url" class="form-label">Seleccione Promotor</label> -->
              <div class="input-group promotores">
                <span class="input-group-text" id="basic-addon3">Promotor</span>
                <select name="idPromotor" id="editPromotor" class="form-select" aria-label="Default select example">
                    <option selected ></option>

                    </select>
                </div>
              <div class="form-text" id="basic-addon4">info</div>
            </div>
            <!-- SELECCION DE TIPO DE SERVICIO -->
            <div class="mb-3">
              <!-- <label for="basic-url" class="form-label">Seleccione Promotor</label> -->
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Tipo de Servicio</span>
                <select name="idTipoServicio" id="editTipoServicio" class="form-select" aria-label="Default select example">                      
                </select>
              </div>
              <div class="form-text" id="basic-addon4">info</div>
            </div>
            <!-- SELECCION DE GRUPO -->
            <div class="mb-3">
              <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Grupo</span>
                  <select name="idGrupo" id="editGrup" class="form-select" aria-label="Default select example">
                  </select>
                </div>
                <div class="form-text" id="basic-addon4">info</div>
            </div>
    
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Plaza</span>
                <select name="idPlaza" id="editPlaza" class="form-select" aria-label="Default select example">
                  
                </select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>
    
              <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Tipo de Operacion</span>
                <select name="idTipoOperacion" id="editTipoOperacion" class="form-select" aria-label="Default select example">
                  
                </select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>
              <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Selecciona tipo de cliente</span>
                <select name="idTipoCliente" id="editTipoCliente" class="form-select" aria-label="Default select example">
                  
                </select>
              </div>
                <div class="form-text" id="basic-addon4">info</div>
              </div>
            </div>
          </div>     
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </div>
    </form>
  </div>
</div>
<!-- Modal nuevo promotor -->

<div class="modal fade" id="newPromotor" tabindex="-1" aria-labelledby="newPromotor" aria-hidden="true">
  <div class="modal-dialog">
  <form url="http://3.138.186.80:3005/operaciones/promotores/nuevo" method="POST">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="clienteModal-header">Nuevo Promotor</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><b>Nombre</b></span>
            <input name="nombre" required type="text" class="form-control" placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><b>Apellido</b></span>
            <input name="apellido" required type="text" class="form-control" placeholder="Ingrese apellido" aria-label="Username" aria-describedby="basic-addon1">
          </div>
      </div>
      <div class="response-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Crear</button>
      </div>
    </div>
    </form>
  </div>
</div>

<!-- Modal nueva plaza -->

<div class="modal fade" id="newPlaza" tabindex="-1" aria-labelledby="newPlaza" aria-hidden="true">
  <div class="modal-dialog">
  <form url="http://3.138.186.80:3005/operaciones/plaza/nuevo" method="POST">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Nueva Plaza</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nombre</span>
            <input required name="nombre" type="text" class="form-control" placeholder="Ingrese nombre de la plaza" aria-describedby="basic-addon1">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Crear</button>
      </div>
    </div>
    </form>
  </div>
</div>
<!-- Nuevo registro de aplicacion -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevaAplicacion" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> -->

<div class="modal fade" id="nuevaAplicacion" tabindex="-1" aria-labelledby="nuevaAplicacionLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <form url="http://3.138.186.80:3005/operaciones/registros/nuevo" method="POST">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="newAplicationHeader">Cargando...</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input readonly required name="idCliente" type="number" class="form-control" hidden>
        
      <div class="input-group mb-3">
          <!-- <label for="mes" class="col-form-label">Mes</label> -->
          <span class="input-group-text" id="basic-addon1">Mes de aplicacion</span>
          <!-- <input required name="mes" type="text" class="form-control"> -->
          <select name="mesAplicado" class="form-select">
            <option selected value="">Selecciona un mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
      </div>
      <div class="input-group mb-3">

          <!-- <label for="anualidad" class="col-form-label">Año de aplicacion</label> -->
          <span class="input-group-text" id="basic-addon1">Año de aplicacion</span>
          <!-- <input required name="anualidad" type="text" class="form-control"> -->
          <select name="anualAplicado" class="form-select">
            <option selected value="2024">2024</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
      </div>


      <div class="input-group mb-3">
          <!-- <label for="periodo" class="col-form-label">Periodo</label> -->
          <span class="input-group-text" id="basic-addon1">Periodo de aplicacion</span>
          <!-- <input required name="periodo" type="text" class="form-control"> -->
          <select name="idPeriodo" class="form-select">
            <option selected value="">Selecciona un mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
      </div>

      <div class="input-group mb-3">

          <!-- <label for="anualidad" class="col-form-label">Año de aplicacion</label> -->
          <span class="input-group-text" id="basic-addon1">Año de aplicacion</span>
          <!-- <input required name="anualidad" type="text" class="form-control"> -->
          <select name="anualPeriodo" class="form-select">
            <option selected value="2024">2024</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
      </div>

      <!-- <div class="input-group mb-3"> -->
          <!-- <span class="input-group-text" id="basic-addon1">Estimulo</span> -->
          <input hidden readonly required name="estimulo" type="number" class="form-control" step="0.01" min="0" max="9999999.99" placeholder="00.00" value="0.0">
      <!-- </div> -->

      <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Deal del Cliente</span>
          <input required name="deal" type="number" class="form-control" step="0.01" min="0" max="9999.99" placeholder="00.00">
      </div>
      <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Deal del Promotor</span>
          <input required name="porcentajePromotor" type="number" class="form-control" step="0.01" min="0" max="99.99" placeholder="00.00">
      </div>

      
          <!-- <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nombre</span>
            <input required name="nombre" type="text" class="form-control" placeholder="Ingrese nombre de la plaza" aria-describedby="basic-addon1">
          </div> -->

        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Crear</button>
      </div>
      </form>
    </div>

  </div>
</div>
 <!-- Nuevo registro de aplicacion -->

 <!-- modal nueva factura -->
 <div class="modal fade" id="generarFacturaModal" tabindex="-1" aria-labelledby="generarFacturaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="generarFacturaModalLabel">Generar Nueva Factura</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="generarFacturaForm">
                    <!-- Folio de Factura -->
                    <div class="mb-3">
                        <label for="folioFactura" class="form-label">Folio de Factura</label>
                        <input type="text" class="form-control" id="folioFactura" placeholder="Ingresa el folio de la factura" required>
                    </div>

                    <!-- Total -->
                    <div class="mb-3">
                        <label for="totalFactura" class="form-label">Total</label>
                        <input type="number" class="form-control" id="totalFactura" placeholder="Ingresa el total de la factura" required>
                    </div>

                    <!-- Fecha de Alta -->
                    <div class="mb-3">
                        <label for="fechaAltaFactura" class="form-label">Fecha de Alta</label>
                        <input type="date" class="form-control" id="fechaAltaFactura" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary" form="generarFacturaForm">Guardar Factura</button>
            </div>
        </div>
    </div>
</div>