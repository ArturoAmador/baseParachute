//constantes conocidad 
const g = 9.81;
const airDensity = 1.29;
const shapeFormCoef = 0.8;



//Velocidad limite
function calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson) {
    let k = ((airDensity * areaParacaidas * shapeFormCoef) / 2).toFixed(2);
    let vLimit = Math.sqrt(masaPerson * g / k).toFixed(2);
    return vLimit;
}

function speedBeforeParachuteOpen(g, t) {
    return g * t;
}

function getTime(yF, y0, g){
    return Math.sqrt((2 * (yF - y0)) / (-g)).toFixed(2);
}

function speedBefordLand(vl, v0, x0, xf, g) {
    return Math.sqrt(Math.pow(vl,2) + ( Math.pow(v0,2) - Math.pow(vl,2)) * Math.exp( -((2 * g) / Math.pow(vl,2)) * (x0 - xf))).toFixed(2);
}


function runSimulator(e) {
    e.preventDefault();
    console.log('runSimulador');

    let a = g; //la aceleración de la grvedad
    let areaParacaidas = $('#area').val();
    let masaPerson = $('#masa').val();
    let alturaInicial = $('#salto').val();
    let alturaParacaidasOpen = $('#abrirParcaidas').val();
    let limitSpeed = calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson);

    let timeFreeFall = getTime(alturaParacaidasOpen, alturaInicial, g);
    let speedInitSecondFase = speedBeforeParachuteOpen(g, getTime(alturaParacaidasOpen, alturaInicial, g));
    let velocidadFinal = speedBefordLand(limitSpeed, speedBeforeParachuteOpen(g, getTime(alturaParacaidasOpen, alturaInicial, g)), alturaParacaidasOpen, 0, g);



    if (alturaParacaidasOpen < 1500 && alturaInicial !== "") {
        if(!confirm('Esto no es lo más recomendable dado que podria ser perjudicial para la salud, ¿Esta seguro de su decición?')){
            return;
        }
    }

    if (areaParacaidas === "" || masaPerson === "" || alturaInicial === "") {
        $('.modal').show();
        return;
    }

    let html = '<table class="table table-striped">'
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Campo</th>`;
    html += `<th scope="col">Resultado</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>Tiempo en caida libre</td>`;
    html += `<td>${timeFreeFall} s</td>`;
    html += `</tr>`;
    html += `<tr>`;
    html += `<td>Velocidad Limite</td>`;
    html += `<td>${limitSpeed} m/s</td>`;
    html += `</tr>`;
    html += `<tr>`;
    html += `<td>Velocidad Antes de abrir el paracaidas</td>`;
    html += `<td>${speedInitSecondFase} m/s</td>`;
    html += `</tr>`;
    html += `<tr>`;
    html += `<td>Velocidad Antes al aterrizar</td>`;

    if (velocidadFinal > 30) {
        html += `<td style='background:red;'>${velocidadFinal} m/s</td>`;
    }else{
        html += `<td>${velocidadFinal} m/s</td>`;
    }
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;

    if (alturaParacaidasOpen === "") {
        
    }
    $('#tablePlace').html(html);
    
}

function closeModal() {
    $('.modal').hide();
}