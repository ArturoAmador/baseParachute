// Projama ejecutado en caída libre

//constantes conocidad 
const g = 9.81;
const airDensity = 1.29;
const shapeFormCoef = 0.8;

let a = g; //la aceleración de la grvedad
let t = 72; //tiempo de vuelo
let v = -g * t;
let areaParacaidas = 0.6;
let masaPerson = 72;

//Velocidad limite

function calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson) {
    let k = (airDensity * areaParacaidas * shapeFormCoef) / 2;
    let vLimit = Math.sqrt(masaPerson * g / k);
    return {k:k,'velocidad limite':vLimit};
}

function speedBeforeParachuteOpen(params) {
    
}

function speedLastPartParachute(params) {
    
}

function getTime(yF, y0, g){

    return Math.sqrt((yF - y0) / (2 * -g));

}

console.log(calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson));

console.log(getTime(1000, 2000, g));