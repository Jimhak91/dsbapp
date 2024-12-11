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
    <title>OPERACIONES</title>
    <script
        src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous">
    </script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link 
        rel="stylesheet" 
        href="./assets/css/operaciones/index.css">
    
</head>
<body>
    
    <?php include './components/nav.php'; ?>
    <main>
        <!-- LEFT -->
        <div class="leftCol">
            <div class="col">
                <div class="p-2">
                    <!-- <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvasOpt" aria-controls="offCanvasOpt">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
                        </svg>
                    </button> -->
                </div>
                <div class="p-2">
                    <button name="newRecord" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNewRecord">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                        </svg>
                        Nuevo Cliente
                    </button>
                </div>
                <div class="p-2">
                    <button name="newPlaza" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newPlaza">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"/>
                        </svg>
                        Nueva Plaza
                    </button>
                </div>
                <div class="p-2">
                    <button name="newPromotor" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newPromotor">
                        <svg class="w-[34px] h-[34px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
                        </svg>
                        Nuevo Promotor
                    </button>
                </div>
            </div>
        </div>
        <!-- CENTER -->
        <div class="centerCol">
            <div class="p-4">
                
            <div class="row">
                <div class="col">
                    <div class="input-group p-2">
                        <span class="input-group-text" id="basic-addon3"><b>Mes de aplicacion</b></span>
                        <select class="form-select" aria-label="Selecciona un mes" id="selectMes">
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
                </div>
                <div class="col">
                    <div class="input-group p-2">
                        <span class="input-group-text" id="basic-addon3"><b>Año de aplicacion</b></span>
                        <select class="form-select" aria-label="Default select example" id="selectYear">
                        <option selected>2024</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        </select>
                    </div>
                    
                </div>
                
               
              </div>
              
                <div class="row p-2">
                    <?php include './components/tableEstimulo.php' ?>
                </div>
                <div class="row p-2">
                    <div class="col">
                    <?php include './components/tableDirecto.php' ?>
                    </div>
                    <div class="col">
                    <?php include './components/tableRsh&c.php'?>
                    </div>
                </div>
                <div class="row p-2">
                    <?php include './components/tableRsb&b.php' ?>
                </div>
                <div class="row p-2">
                    <?php include './components/tableClientes.php' ?>
                </div>
            </div>
            
        
        </div>
        <!-- RIGTH -->
        <div class="rigthCol">
            <!-- <button type="button" class="btn btn-primary">Boton</button> -->
        </div>
    </main>
<?php include './components/modales.php' ?>
<?php include './components/offcanvas.php'?>
<script type="module" src="./services/hooks/putSelect.js"></script>
<script type="module" src="./services/hooks/loadTables.js"></script>
<script type="module" src="./services/hooks/getEntries.js"></script>
<script src="./services/newAplication.js"></script>
<script>
    
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>

<?php } else {
    header("Location: /");
    exit();
}



