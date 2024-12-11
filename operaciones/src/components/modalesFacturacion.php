<!-- Modal de Pagos -->
<div class="modal fade" id="pagosModal" tabindex="-1" aria-labelledby="pagosModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="pagosModalLabel">Detalles de Pagos y Registros de Aplicación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Columna de Registro de Pagos -->
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col">
                                            <h6 id="headerRegistroPagos">Cargando...</h6>
                                        </div>
                                        <div class="col">
                                            <select class="form-select" id="selectIdCobro" required>
                                                <option selected disabled>Seleccione aplicacion</option>
                                                <option value="Cargando...">Cargando...</option>
                                                <!-- Agrega más años si es necesario -->
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Fecha de Pago</th>
                                                <th>Monto</th>
                                                <th># Transferencia</th>
                                                <th>Folio de Complemento</th>
                                            </tr>
                                        </thead>
                                        <tbody id="historialMovimientos">
                                            <tr><td colspan="5">Seleccione aplicacion.</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer text-body-secondary">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevoPagoModal">Nuevo Pago</button>
                                </div>
                            </div>
                        </div>

                        <!-- Columna de Registros de Aplicación -->
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header appPorFactura">
                                    <h6>Cargando...</h6>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Aplicacion</th>
                                                <th>Deal</th>
                                                <th>Ultimo Cobro</th>
                                                <th>Pagado</th>
                                                <th>Monto total</th>
                                            </tr>
                                        </thead>
                                        <tbody class="aplicacionesFactura">
                                            <tr>
                                                <td colspan="5">
                                                    <div class="d-flex align-items-center">
                                                        <strong role="status">Loading...</strong>
                                                        <div class="spinner-border ms-auto" aria-hidden="true"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onClick="resetTable()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- NUEVA FACTURA -->
<div class="modal fade" id="generarFacturaModal" tabindex="-1" aria-labelledby="generarFacturaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl"> <!-- Aumenté el tamaño del modal -->
        <form formName="nuevaFactura" url="http://3.138.186.80:3005/operaciones/facturas/nueva" method="POST">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="generarFacturaModalLabel">Generar Nueva Factura</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col">
                    <div class="form-floating mb-3">
                        <input name="folioFactura" type="text" class="form-control" id="floatingInput" required>
                        <label for="floatingInput">Folio de la factura</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating mb-3">
                        <input name="nombreAFacturar" type="text" class="form-control" id="floatingInput" required>
                        <label for="floatingInput">Nombre en la Factura</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating mb-3">
                        <select name="TipoFactura" class="form-control" id="floatingSelect" aria-label="Tipo Factura" required>
                            <option selected disabled>Tipo de Factura</option>
                            <option value="1">PPD</option>
                            <option value="2">PUE</option>
                            
                        </select>
                        <label for="floatingSelect">Tipo de Factura</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating mb-3">
                        <input disabled type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Monto de Factura</label>
                    </div>
                </div>

            </div>
            <h5 class="card-title">Seleccione aplicaciones para asignar factura</h5>
                <div class="card text-bg-secondar m-2">
                            <div class="card-header">
                                <div class="row">
                                    
                                    <div class="col">
                                        <select class="form-select" id="yearSelect" required>
                                            <option selected disabled>Año</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <!-- Agrega más años si es necesario -->
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" id="monthSelect" required>
                                            <option selected disabled value="0">Mes</option>
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
                                            <!-- Agrega más años si es necesario -->
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" id="operationSelect" required>
                                            <option selected disabled>Operacion</option>
                                            <option value="1">Directo</option>
                                            <option value="2">RS H&C</option>
                                            <option value="3">RS B&B</option>
                                            <!-- Agrega más años si es necesario -->
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" id="razonSocialSelect" required hidden>
                                            <option selected disabled>Razon Social</option>
                                            <!-- Agrega más años si es necesario -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Razón Social</th>
                                            <th>Grupo</th>
                                            <th>Mes Aplicado</th>
                                            <th>Periodo</th>
                                            <th>Total Estimulo</th>
                                            <th class="text-center align-middle">Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody id="viewAplicaciones">
                                        <tr>
                                             <td colspan="6">
                                                 Seleccione año, mes y tipo de operacion...
                                            </td>
                                        </tr>
                                        <!-- Agrega más filas según los registros disponibles -->
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="generarFactura" type="submit" class="btn btn-primary">Generar factura</button>
            </div>

        </div>
        </form>
    </div>
</div>


<!-- Modal Nuevo Pago -->
<div class="modal fade" id="nuevoPagoModal" tabindex="-1" aria-labelledby="nuevoPagoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="nuevoPagoForm" url="http://3.138.186.80:3005/operaciones/cobros/nuevo" method="POST">
                <div class="modal-header">
                    <h5 class="modal-title" id="nuevoPagoModalLabel">Cargando...</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Selección de Aplicación -->
                    <div class="mb-3">
                        <label for="aplicacionSelect" class="form-label">Seleccionar Aplicación</label>
                        <select class="form-select" id="aplicacionSelect" name="aplicacion" required>
                            <option value="" disabled selected>Seleccione una aplicación</option>
                            <!-- Agregar más opciones según sea necesario -->
                        </select>
                    </div>

                    <!-- Collapses -->
                    <div class="row">
                        <!-- Primer Collapse -->
                        <div class="col">
                            <div class="collapse multi-collapse" id="multiCollapseExample1">
                                <div class="card card-body">
                                    <!-- Monto a Abonar o Liquidar -->
                                    <div class="mb-3">
                                        <label for="montoInput" class="form-label">Monto a Abonar o Liquidar</label>
                                        <input type="number" class="form-control" name="monto" placeholder="Ingrese el monto" required step="0.0001" min="0">
                                    </div>
                                    <!-- Fecha de Pago -->
                                    <div class="mb-3">
                                        <label for="fechaPagoInput" class="form-label">Fecha de Pago</label>
                                        <input type="date" class="form-control" id="fechaPagoInput" name="fechaPago" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Segundo Collapse -->
                        <div class="col">
                            <div class="collapse multi-collapse" id="multiCollapseExample2">
                                <div class="card card-body">
                                    <!-- Número de Transferencia -->
                                    <div class="mb-3">
                                        <label for="transferenciaInput" class="form-label"># Transferencia</label>
                                        <input type="text" class="form-control" id="transferenciaInput" name="numeroTransferencia" placeholder="Ingrese el número de transferencia" required>
                                    </div>
                                    <!-- Folio de complemento de pago -->
                                    <div class="mb-3">
                                        <label for="folioInput" class="form-label">Folio de complemento de pago</label>
                                        <input type="text" class="form-control" id="folioInput" name="folioComplemento" placeholder="Ingrese folio de complemento" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Registrar Pago</button>
                </div>
            </form>
        </div>
    </div>
</div>




<!-- Modal -->
<div class="modal fade" id="ModalFolioComplemento" tabindex="-1" aria-labelledby="ModalFolioComplemento" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <form method="PUT" url="http://3.138.186.80:3005/operaciones/cobros/editar/movimiento" formReset="false">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ModalFolioComplemento">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body folioComplemento">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
      </form>
    </div>
  </div>
</div>