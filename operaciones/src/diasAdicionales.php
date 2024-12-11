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
    <title>Calculo de dias</title>
    <script
        src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous">
    </script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link 
        rel="stylesheet" 
        href="./assets/css/operaciones/dias.css">
    
</head>
<body>
    <?php include './components/nav.php'; ?>
    <main class="p-2">
    <div class="card text-center">
        <div class="card-header">
        <h3 class="calendarioHeader">Calendario del Mes Actual</h3>
        </div>
        <div class="card-body">
            <div class="container my-5">
                <form year="" month="">
                    <div class="row" id="calendar"></div>
                    <button type="submit" class="btn btn-primary"></button>
                </form>
            </div>
        </div>
        <div class="card-footer text-body-secondary">
            RECUERDA BASARTE EN EL DOF
        </div>
    </div>


    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script>
        // Función para generar el calendario del mes actual
        function generateCalendar() {
            const calendarContainer = document.getElementById("calendar");
            const form = document.querySelector("form");
            
            console.log(form)

            const calendar =document.querySelector('.calendarioHeader');
            calendarContainer.innerHTML = ""; // Limpiar cualquier contenido previo
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            form.setAttribute("year", year);
            form.setAttribute("month", month);
            
            const monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            calendar.innerHTML = `<b>Calendario del Mes Actual de ${monthNames[month]}</b>`
            // Obtener el nombre del mes actual
            const monthName = monthNames[month];
            console.log(`Mes actual: ${monthName} ${year}`);
            // Obtener el último día del mes actual
            const lastDay = new Date(year, month + 1, 0).getDate();            
            // Crear un checkbox para cada día
            for (let day = 1; day <= lastDay; day++) {
                const colDiv = document.createElement("div");
                colDiv.className = "col-3 col-md-2 mb-3"; // Ajuste de columnas

                const formCheckDiv = document.createElement("div");
                formCheckDiv.className = "form-check";

                const checkbox = document.createElement("input");
                checkbox.value = day;
                checkbox.type = "checkbox";
                checkbox.className = "form-check-input";
                checkbox.name = `dia[${day}]`;
                checkbox.checked = true;

                const label = document.createElement("label");
                label.className = "form-check-label";
                label.htmlFor = `day${day}`;
                label.innerText = `${day}`;

                formCheckDiv.appendChild(checkbox);
                formCheckDiv.appendChild(label);
                colDiv.appendChild(formCheckDiv);
                calendarContainer.appendChild(colDiv);
            }
        }

        // Llamar a la función para generar el calendario al cargar la página
        generateCalendar();

        const forms = document.querySelectorAll('form').forEach(form => {    
            let year = form.getAttribute('year');
            let month = form.getAttribute('month');

            getForm(form, year, month);
        });

        function getForm(form, year, month) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                let url = form.getAttribute('url');
                let method = form.getAttribute('method');

                const formData = Object.fromEntries(new FormData(e.target));

                 // Crear una lista con solo los valores de los días
                const daysArray = Object.values(formData);

                // Unir los valores en una sola cadena separada por comas
                const days = daysArray.join(',');

                // Crear el objeto final con year, month y days
                const data = {
                    year: year,
                    month: month,
                    days: days
                };
                
                
                if (Object.values(data).some(value => value === "")) {
                    const response = {
                        message: 'error',
                        details: 'Datos vacíos o URL no válida'
                    };
                    console.log(JSON.stringify(response)); // Puedes mostrar un mensaje de error
                } else {
                    // Si los datos y la URL son válidos, procede con el envío
                    alert(JSON.stringify(data));
                    console.log(data)
                    //postData(data, url, method); // Llama a la función para hacer el POST
                    //clearForm(form); // Limpia el formulario después del envío
                    // console.log(data, url)
                }
            });
        }   
        function clearForm(form) {
            form.reset(); // Resetea todos los inputs del formulario a sus valores por defecto
        }

    </script>
</body>
</html>

<?php } else {
    header("Location: /");
    exit();
}