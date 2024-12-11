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
<?php include './components/nav.php'; ?>
<main class="row p-2">
    <!-- <div class="col-sm-1">
    <button type="button" class="btn btn-outline-primary">Pago
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
        </svg>
    </button>
    </div> -->

    <div class="col">
    <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col" style="display: flex; justify-content: center; align-items: center;">
                        <h4 class="card-title">Facturas Pendientes</h4>
                    </div>
                    <div class="col-sm-2">
                        <!-- <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#generarFacturaModal">
                            Nueva Factura
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
                            </svg>
                        </button> -->
                    </div>
                    <div class="col-sm-1">
                        <!-- <button type="button" class="btn btn-outline-primary">Pago
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
                            </svg>
                        </button> -->
                    </div>
                    <div class="col-sm-2">
                        <select class="form-select mes-facturas" aria-label="Default select example">
                            <option selected disabled>Seleccionar Mes</option>
                            <option value="0">Todas</option>
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
                    <div class="col-sm-1">
                        <select class="form-select year-facturas" aria-label="Default select example" id="selectYear">
                            <option selected>2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                    </div>
                    <div class="col-sm-1" style="display: flex; justify-content: center; align-items: center;">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                            <label class="form-check-label" for="flexSwitchCheckChecked">Pendientes</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
            <div class="card-header">
                <div class="col">
                    <h4>Facturas</h4>
                </div>
                <div class="col-sm-2">
                    <select class="form-select select-razonSocial" aria-label="Default select example">
                        <option selected disabled>Seleccione tipo de operacion</option>
                        <option value="3">Responsabilidad solidaria B&B</option>
                        <option value="2">Responsabilidad solidaria H&C</option>
                        <option value="1">Directo</option>                        
                    </select>
                </div>
                
                
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Folio de Factura</th>
                            <th>Razon Social</th>
                            <th>Estatus de la factura</th>
                            <th>Tipo de factura</th>
                            <th>Deal</th>
                            <th>subtotal</th>
                            <th>IVA</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="9">
                                <div class="d-flex align-items-center">
                                    <strong role="status">Loading...</strong>
                                    <div class="spinner-border ms-auto" aria-hidden="true"></div>
                                </div>
                            </td>                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#generarFacturaModal">
                    Nueva Factura
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>


    </div>
</main>
<?php include './components/modalesFacturacion.php'; ?>
<!-- <script src="./services/hooks/formProcessor.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script type="module" src="./services/facturacion.js"></script>
</body>
</html>


<?php } else {
    header("Location: /");
    exit();
}