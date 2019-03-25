// Projama ejecutado en caída libre atmosfera constante

//constantes conocidad 
const g = 9.81;
const airDensity = 1.29;
const shapeFormCoef = 0.8;

let a = g; //la aceleración de la grvedad
let t = 72; //tiempo de vuelo
let areaParacaidas = 0.6;
let masaPerson = 72;

//Velocidad limite
function calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson) {
    let k = ((airDensity * areaParacaidas * shapeFormCoef) / 2).toFixed(6);
    let vLimit = Math.sqrt(masaPerson * g / k).toFixed(6);
    return {k:k,'velocidadLimite':vLimit};
}

function speedBeforeParachuteOpen(g, t) {
    return g * t;
}

function getTime(yF, y0, g){
    return Math.sqrt((2 * (yF - y0)) / (-g)).toFixed(6);
}

function speedBefordLand(vl, v0, x0, xf, g) {
    
    return Math.sqrt(Math.pow(vl,2) + ( Math.pow(v0,2) - Math.pow(vl,2)) * Math.exp( -((2 * g) / Math.pow(vl,2)) * (x0 - xf))).toFixed(2);
}

let limitSpeed = calcVelocidadLimite(airDensity, areaParacaidas, shapeFormCoef, g, masaPerson);
console.log(speedBefordLand(limitSpeed.velocidadLimite, speedBeforeParachuteOpen(g, getTime(1000, 2000, g)), 1000, 0, g));