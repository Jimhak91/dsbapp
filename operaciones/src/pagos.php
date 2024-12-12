<?php
// Inicia la sesión
session_start();
// Accede a la variable de sesión
$email = $_SESSION['email'];
$profile = $_SESSION['profile'];
if(isset($profile) && isset($email) && $profile === 1){?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagos</title>
    <script
        src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous">
    </script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<?php include './components/nav.php';?>
<main class="container">
<!-- =============================================================================================-->
<div class="modal fade" id="ModalPagosPromotores" tabindex="1" aria-labelledby="ModalPagosPromotores" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalPagosPromotoresTitle">Registrar Pago</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="formPagosPromotores">
                        <div class="mb-3">
                            <label for="montoPagado" class="form-label">Monto a Pagar</label>
                            <input type="number" class="form-control" id="montoPagado" placeholder="Ingrese el monto a pagar" min="0" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="pagoFaltante" class="form-label">Pago Faltante</label>
                            <input type="text" class="form-control" id="pagoFaltante" readonly>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary saveButton">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="false">
  <!-- Controles de navegación personalizados -->
  <ul class="nav justify-content-center">
                <li class="nav-item">
        <a class="nav-link active" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" href="#">Generar Pagos</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" href="#">Historial de pagos</a>
        </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Pendientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> -->
        </ul>

  <!-- Contenido del carrusel -->
  <div class="carousel-inner">
    <!-- Slide 1 -->
    <div class="carousel-item active" >
      
    <div class="row">
        
            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Pendientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> -->
        <div class="col-md-8">
            <div class="card border-primary text-center m-2">
                <div class="card-header">
                    Pagos a Promotores
                </div>
                <div class="card-body">
                    <h5 class="card-title">APLICACIONES PAGADAS</h5>
                    <select class="form-select" id="selectPromotor" required>
                    <option value="" selected disabled>Selecciona promotor</option>
                </select>


                        <table class="table table-striped tbody-pagos-promotores">
                        </table>

                </div>
                <div class="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>

        </div>
        <div class="col-md-4" style="margin-bottom: 20px;">
            <div class="card text-center">
                <div class="card-header">
                    <div class="row">
                        <div class="col" id="editmonto">
                            Pago Octubre 2024: $600 000
                        </div>
                        <div class="col">
                        <div class="col">
                            <!-- Botón para abrir el modal -->
                            <button class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editPagoModal">
                                Editar
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="editPagoModal" tabindex="-1" aria-labelledby="editPagoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editPagoModalLabel">Editar Monto del Pago</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="editPagoForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="editMontoInput" class="form-label">Nuevo Monto</label>
                        <input type="number" class="form-control" id="editMontoInput" name="monto" placeholder="Ingrese el nuevo monto" step="any" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>
                </div>
                <div class="card-body">
                <h5 class="card-title">REGISTRO DE PAGOS B&B</h5>
                <div class="row">
                    <div class="col">
                        <select class="form-select" id="mesSelectbnb" required>
                            <option selected disabled>Selecciona mes</option>
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
                    <div class="col">
                        <select class="form-select" id="selectañobnb" required>
                            <option selected disabled>Selecciona año</option>
                            <!-- Agrega más opciones para cada mes -->
                        </select>
                        <script>
    // Generar opciones para el selector de año
    const anoSelect = document.getElementById('selectañobnb');
    for (let year = 2017; year <= new Date().getFullYear(); year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anoSelect.appendChild(option);
    }
</script>

                    </div>

                </div>
                        
            <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Fecha de pago</th>
                        </tr>
                    </thead>
                    <tbody id="tablaPagosbnb">
                        <!-- Contenido dinámico -->
                    </tbody>
                </table>
            </div class="">
            <button type="submit" class="btn btn-primary" id="HacerPago">Hacer pago</button>
            </div>
        </div>
    </div>
                        <!--     Modal Hacer pago     -->


                        <div class="modal fade" id="hacerPagoModal" tabindex="-1" aria-labelledby="hacerPagoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="hacerPagoModalLabel">Registrar Pago Mensual</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="hacerPagoForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="montoInput" class="form-label">Monto</label>
                        <input type="number" class="form-control" id="montoInput" name="monto" placeholder="Ingrese el monto" step="any" required>
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

                        <!-- Termina modal hacer pago -->

        <div class="card border-warning text-center">
            <div class="card-header">
                Pagos HnC
            </div>
            <div class="card-body">
                <h5 class="card-title">APLICACIONES</h5>
                <div class="row">
                <div class="col">
                            <select class="form-select" id="mesSelectHnC" required>
                                <option selected disabled>Selecciona mes</option>
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
                        <div class="col">
                            <select class="form-select" id="anoSelectHnC" required>
                                <option selected disabled>Selecciona año</option>
                            </select>
                        </div>
                    </div>

                    <script>
                        // Generar opciones para el selector de año para HnC
                        const anoSelectHnC = document.getElementById('anoSelectHnC');
                        for (let year = 2017; year <= new Date().getFullYear(); year++) {
                            const option = document.createElement('option');
                            option.value = year;
                            option.textContent = year;
                            anoSelectHnC.appendChild(option);
                        }
                    </script>


                    

                </div>
                        
                <table class="table table-striped aplicaciones-hnc">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Estimulo</th>
                                    <th scope="col">Deal</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center align-middle">
                                        <div class="form-check d-flex justify-content-center">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            </div>
            <div class="card-footer text-body-secondary">
                <button class="btn btn-primary hnc">
                    GENERAR PAGO HNC
                </button>
            </div>
        </div>
        

    </div>

    <!-- Slide 2 -->
    <div class="carousel-item" >
    <div class="container my-5">
    <h2 class="text-center">Historial de Pagos</h2>

    <!-- Fila superior: Pagos B&B y Pagos a Promotores -->
    <div class="row">

          <!-- Pagos a Promotores -->
          <div class="col-md-6">
            <div class="card text-center">
                <div class="card-header">Pagos a Promotores</div>
                <div class="card-body">
                    <h5 class="card-title">PAGOS</h5>
                    <div class="row">
                        <div class="col">
                            <select class="form-select" id="mesSelectPromotores" required>
                                <option selected disabled>Selecciona mes</option>
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
                        <div class="col">
                            <select class="form-select" id="añoSelectPromotores" required>
                                <option selected disabled>Selecciona año</option>
                            </select>
                        </div>
                    </div>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Monto Pagado</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tablaHistorialPagosPromotores">
                            <tr>
                                <td colspan="5" class="text-center">No hay datos para mostrar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Historial de Pagos B&B -->
        <div class="col-md-6">
            <div class="card text-center">
                <div class="card-header">Historial de Pagos B&B</div>
                <div class="card-body">
                    <h5 class="card-title">PAGOS</h5>
                    <div class="row">
                        <div class="col">
                            <select class="form-select" id="mesSelectByB" required>
                                <option selected disabled>Selecciona mes</option>
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
                        <div class="col">
                            <select class="form-select" id="anioSelectByB" required>
                                <option selected disabled>Selecciona año</option>
                            </select>
                            <script>
                        // Generar opciones para el selector de año
                        const anoSelectByB = document.getElementById('anioSelectByB');
                        for (let year = 2017; year <= new Date().getFullYear(); year++) {
                            const option = document.createElement('option');
                            option.value = year;
                            option.textContent = year;
                            anoSelectByB.appendChild(option);
                        }
                    </script>
                        </div>
                    </div>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Fecha de pago</th>
                            </tr>
                        </thead>
                        <tbody id="tablaPagosByB">
                            <!-- Contenido dinámico -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

  
    </div><div class="row mt-4">
    <div class="col-md-12">
        <div class="card text-center">
            <div class="card-header">Pagos HnC</div>
            <div class="card-body">
                <h5 class="card-title">PAGOS</h5>
                <div class="row">
                    <div class="col">
                        <select class="form-select" id="mesSelectHnChist" required>
                            <option selected disabled>Selecciona mes</option>
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
                    <div class="col">
                        <select class="form-select" id="añoSelectHnChist" required>
                            <option selected disabled>Selecciona año</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                </div>
                <table class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Razón Social</th>
                            <th scope="col">Provedor</th>
                            <th scope="col">Monto Pagado</th>

                        </tr>
                    </thead>
                    <tbody id="tablaHistorialPagosHnC">
                        <tr>
                            <td colspan="6" class="text-center">No hay datos para mostrar</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</div>

<!-- =============================================================================================-->

</main>
<script type="module" src="./services/pagos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
<?php } else {
    header("Location: /");
    exit();
}
