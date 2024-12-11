import { fetchData } from "./fetchData.js";
import { CreateTable } from "./functions/createTable.js";
import { tableClientes } from "./functions/tableClientes.js"
import { addSelect } from "./putSelect.js";
import { AddTdTable } from "./functions/addTdTable.js";

// Función para actualizar los parámetros de la URL
function updateURLParams(param, value) {
    const url = new URL(window.location); // Obtén la URL actual
    url.searchParams.set(param, value);   // Establece o actualiza el parámetro
    window.history.pushState({}, '', url); // Cambia la URL sin recargar la página
  }
  
  // Capturar el evento change del selector de mes
  document.getElementById('selectMes').addEventListener('change', function() {
    const mes = this.value;
    updateURLParams('mes', mes);
  
    // Obtener el valor actual del año seleccionado
    const year = document.getElementById('selectYear').value;
    
    // Llamar a la función loadTable con ambos valores
    loadTable(year, mes);
  });
  
  // Capturar el evento change del selector de año
  document.getElementById('selectYear').addEventListener('change', function() {
    const year = this.value;
    updateURLParams('year', year);
  
    // Obtener el valor actual del mes seleccionado
    const mes = document.getElementById('selectMes').value;
    
    // Llamar a la función loadTable con ambos valores
    loadTable(year, mes);
  });
  
  

// Función para cargar y crear la tabla
function loadTable(year,mes) {
  //MOSTRAR CALCULO TOTAL DE ESTIMULO POR TIPO DE OPERACION
    let urlEstimuloHnC = `http://192.168.210.110:3005/operaciones/estimulo/2/${mes}/${year}`;
    const dataEstimuloHnC =  fetchData(urlEstimuloHnC);
    const tdHnC = document.querySelector('.estimuloHnC');
    
    AddTdTable(dataEstimuloHnC,tdHnC);
    //MOSTRAR CALCULO TOTAL DE ESTIMULO POR TIPO DE OPERACION
    let urlEstimuloBnb = `http://192.168.210.110:3005/operaciones/estimulo/3/${mes}/${year}`;
    const dataEstimuloBnb =  fetchData(urlEstimuloBnb);
    const tdBnb = document.querySelector('.estimuloBnB');
    
    AddTdTable(dataEstimuloBnb,tdBnb);
//MOSTRAR CALCULO TOTAL DE ESTIMULO POR TIPO DE OPERACION
    let urlEstimuloDirecto = `http://192.168.210.110:3005/operaciones/estimulo/1/${mes}/${year}`;
    console.log(urlEstimuloDirecto);
    const dataEstimuloDirecto =  fetchData(urlEstimuloDirecto);
    const tdDirecto = document.querySelector('.estimuloDirecto');
    console.log(tdDirecto);
    AddTdTable(dataEstimuloDirecto,tdDirecto);
//MOSTRAR CALCULO TOTAL DE ESTIMULO POR MES Y YEAR
    let dataEstimulototal = `http://192.168.210.110:3005/operaciones/total/estimulo/${mes}/${year}`;
    const dataFetch = fetchData(dataEstimulototal);
    const estimuloTotal = document.querySelector('.estimuloTotal');
    AddTdTable(dataFetch,estimuloTotal);



    //MOSTRAR DATOS DE CADA UNA DE LAS TABLAS
    let urlDataBnb = `http://192.168.210.110:3005/operaciones/registros/3/${year}/${mes}`
    const dataBnb = fetchData(urlDataBnb);
    const tableBnb = document.querySelector('.tableRbnb-body');
    CreateTable(dataBnb, tableBnb, year, mes);

    let urlDataHnc = `http://192.168.210.110:3005/operaciones/registros/2/${year}/${mes}`
    
    const dataHnc = fetchData(urlDataHnc);
    const tableHnc = document.querySelector('.tableHnc-body');
    CreateTable(dataHnc,tableHnc, year, mes);
    
    let urlDataDirecto = `http://192.168.210.110:3005/operaciones/registros/1/${year}/${mes}`
    const dataDirecto = fetchData(urlDataDirecto);
    const tableDirecto = document.querySelector('.tableDirecto-body');
    CreateTable(dataDirecto,tableDirecto,year, mes);

    const datafetch = fetchData('http://192.168.210.110:3005/operaciones/clientes/');
    const table = document.querySelector('.tableClientes-body');
    tableClientes(datafetch,table);

    const dataPromotores = fetchData('http://192.168.210.110:3005/operaciones/promotores');
    
    const dataTipoServicio = fetchData('http://192.168.210.110:3005/operaciones/servicios');
    const dataGrupos = fetchData('http://192.168.210.110:3005/operaciones/grupos');
    const dataPlaza = fetchData('http://192.168.210.110:3005/operaciones/plazas');
    const dataTipoOperacion = fetchData('http://192.168.210.110:3005/operaciones/operaciones');
    const dataTipoClientes = fetchData('http://192.168.210.110:3005/operaciones/clientes/tipos');

    const selectPromotores = document.querySelector('.form-select[name="idPromotor"]');
    const selectTipoServicio = document.querySelector('.form-select[name="idTipoServicio"]');
    const selectGrupo = document.querySelector('.form-select[name="idGrupo"]');
    const selectPlaza = document.querySelector('.form-select[name="idPlaza"]');
    const selectTipoOperacion = document.querySelector('.form-select[name="idTipoOperacion"]');
    const selectTipoCliente = document.querySelector('.form-select[name="idTipoCliente"]');

    addSelect(selectTipoServicio,dataTipoServicio);
    addSelect(selectPromotores,dataPromotores);
    addSelect(selectTipoCliente,dataTipoClientes);
    addSelect(selectPlaza,dataPlaza);
    addSelect(selectGrupo,dataGrupos);
    addSelect(selectTipoOperacion,dataTipoOperacion);
    // addSelect(editPromotor, dataPromotores);
    
}

// Llamar a la función para cargar la tabla por primera vez


// Si deseas recargar solo la tabla en lugar de la página entera
export function reloadTable() {
    loadTable();
}

// Si deseas recargar toda la página
function reloadPage() {
    window.location.reload();
}





