<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minuta - Temas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-5">
    <h2 class="text-center mb-4">Minuta de Reunión</h2>
    
    <form>
      <!-- Departamento que emite la minuta -->
      <div class="mb-3">
        <label for="departamento" class="form-label">Departamento que emite la minuta</label>
        <select class="form-select" id="departamento">
          <option selected disabled>Seleccione el departamento</option>
          <option value="finanzas">Finanzas</option>
          <option value="recursos_humanos">Recursos Humanos</option>
          <option value="it">Tecnología de la Información</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <!-- Responsable del departamento -->
      <div class="mb-3">
        <label for="responsableDepartamento" class="form-label">Responsable del Departamento</label>
        <select class="form-select" id="responsableDepartamento">
          <option selected disabled>Seleccione el responsable</option>
          <option value="jose_perez">José Pérez</option>
          <option value="maria_gomez">María Gómez</option>
          <option value="carlos_fernandez">Carlos Fernández</option>
          <option value="ana_martinez">Ana Martínez</option>
        </select>
      </div>

      <hr>

      <!-- Cliente a visitar -->
      <div class="mb-3">
        <label for="cliente" class="form-label">Cliente a visitar</label>
        <input type="text" class="form-control" id="cliente" placeholder="Nombre del cliente a visitar">
      </div>

      <!-- Objetivos -->
      <div class="mb-3">
        <label for="objetivos" class="form-label">Objetivos de la visita</label>
        <textarea class="form-control" id="objetivos" rows="3" placeholder="Escriba los objetivos de la visita"></textarea>
      </div>

      <!-- Tema 1 -->
      <div class="mb-3">
        <label for="tema1" class="form-label">Tema 1</label>
        <input type="text" class="form-control" id="tema1" placeholder="Introduce el tema">
      </div>
      
      <div class="mb-3">
        <label for="descripcion1" class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcion1" rows="3" placeholder="Descripción del tema"></textarea>
      </div>

      <div class="mb-3">
        <label for="responsable1" class="form-label">Responsable</label>
        <input type="text" class="form-control" id="responsable1" placeholder="Responsable del tema">
      </div>
      
      <hr>

      <!-- Acuerdos -->
      <div class="mb-3">
        <label for="acuerdos" class="form-label">Acuerdos alcanzados</label>
        <textarea class="form-control" id="acuerdos" rows="3" placeholder="Escriba los acuerdos alcanzados en la reunión"></textarea>
      </div>

      <!-- Fecha para la próxima visita -->
      <div class="mb-3">
        <label for="fechaProxima" class="form-label">Fecha para la próxima visita</label>
        <input type="date" class="form-control" id="fechaProxima">
      </div>

      <hr>

      <!-- Botón para agregar más temas -->
      <button type="button" class="btn btn-primary">Agregar otro tema</button>
      
      <!-- Botón de envío -->
      <button type="submit" class="btn btn-success mt-3">Guardar Minuta</button>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
