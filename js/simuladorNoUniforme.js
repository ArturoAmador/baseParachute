// En una atmosfera isotérmica la variación de la presión en función de la altitud x está dada por la ley de Laplace
/*
const p0 = 1.29; //presion de la atmósfera a nivel del mar
const M = 0.0288; //peso molecular del aire 
const g = 9.81;
const K = Math.pow(1.3805*10, -23);
const T = 254; //Temperatura en kelvin



//Chart js
window.dataArray = [];
window.label = [];
var canvas = document.getElementById('myChart');
var data = {
    labels: window.label,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 1,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 3,
            showLine:true,
            data: dataArray,
        }
    ]
};



setTimeout(() => {
    for (let i = 5700; i >= 0; i--) {

        console.log(p0 * Math.exp(-i /7482.2));
        dataArray.push(Math.abs(Math.exp(-i/7482.2) - Math.exp(-72/(2*7482.2)))); 
        if (i % 25 == 0) {
            window.label.push(i);
            myLineChart.update();       
        }
    }
}, 1000);


var option = {
	showLines: true
};
var myLineChart = Chart.Line(canvas,{
	data:data,
  options:option
});*/


function drawGrid(color, stepx, stepy) {
    ctx.save()
    ctx.strokeStyle = color;
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
 
    for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    ctx.restore();
 }
 
 var canvas = document.getElementById('canvas_1'), ctx = canvas.getContext('2d');
 ctx.font = '13px Helvetica';
 var wChar= ctx.measureText('m').width;
 
 var RungeKutta=function(masa, k, h){
    this.masa=masa;
    this.k=k;
    this.h=h;
 };

 RungeKutta.prototype={
     f: function(x,v,t){
     return(-9.8+this.k*v*v*Math.exp(-x/7482.2)/this.masa);
    },
     resolver:function(e){
        //variables auxiliares
         var k1, k2, k3, k4, l1, l2, l3, l4,
            //condiciones iniciales
             x=e.x,
             v=e.v,
             t=e.t;
 
        k1=this.h*v;
        l1=this.h*this.f(x, v, t);

        k2=this.h*(v+l1/2);
        l2=this.h*this.f((x+k1/2), (v+l1/2), (t+this.h/2));

        k3=this.h*(v+l2/2);
        l3=this.h*this.f(x+k2/2, v+l2/2, t+this.h/2);

        k4=this.h*(v+l3);
        l4=this.h*this.f(x+k3, v+l3, t+this.h);
        //nuevo estado del sistema
        x+=(k1+2*k2+2*k3+k4)/6;
        v+=(l1+2*l2+2*l3+l4)/6;
        //cambia el estado de la partÃ­cula
        e.t=t+this.h;
        e.x=x;
        e.v=v;
    }
 }
 
 
 var orgXP=4*wChar,
      orgY=canvas.height-2*wChar,
      orgX=canvas.width/3+2*wChar,
      orgXX=orgX+7*wChar,
 //escalas: horizontal y vertical
      escalaX=(canvas.width-orgXX-wChar)/1.0,      //100 segundos el maximo en caida libre
      escalaV=orgY/6.0,       //200 m/s es la mÃ¡xima velocidad en caÃ­da libre
      escalaY=(orgY-wChar)/30.0,           //escala de alturas en km
     escalaP=canvas.width/3-orgXP,
 //tiempo
     k, 
     masa,
     altura,
     acel=-9.8, //aceleraciÃ³n
 //objeto sistema
    sistema,
    estado={t:0.0, x:30000.0, v:0.0},
 //GrÃ¡ficas
     pPresion=[],
     flecha=[],
     pol=[],
     //color
     rojo=[255, 253, 251, 249, 244, 242, 240, 236, 234, 232, 230, 225, 223,
                         221, 217, 215, 213, 210, 206, 204, 202, 198, 196, 193, 191, 187,
                         185, 183, 179, 176, 174, 170, 168, 166, 164, 159, 157, 155, 151,
                         149, 147, 145, 140, 138, 136, 132, 130, 128, 125, 121, 119, 117,
                         113, 111, 108, 106, 102, 100, 98, 94, 91, 89, 85, 83, 81, 79, 74,
                         72, 70, 66, 64, 62, 60, 55, 53, 51, 47, 45, 43, 40, 36, 34, 32, 28,
                         26, 23, 21, 17, 15, 13, 9, 6, 4, 0];
 
   function grisPresion(g){
     imageData = g.createImageData(4*wChar, orgY);
     var z,y;
     var nivel;
     var pos=0;
     for(var y1=0; y1<orgY; y1++){
         y=(orgY-y1)/escalaY;
         z=Math.exp(-y/7.4621);
         nivel=Math.floor((rojo.length-1)*z)
         for(var x=0; x<4*wChar; x++){
              // set red, green, blue, and alpha:
             imageData.data[pos++] = 255;
             imageData.data[pos++] = rojo[nivel];
             imageData.data[pos++] = rojo[nivel];
             imageData.data[pos++] = 255; // opaque alpha
         }
     }
     g.putImageData(imageData, orgX-2*wChar, 0);
 }
  
 function presion(){
     pPresion.length=0;
     var y, x1, y1;
     for(var x=0.0; x<=30.0; x+=0.9){
         y=Math.exp(-x/7.4822);
         y1=orgY-escalaY*x;
         x1=orgXP+y*escalaP;
         pPresion.push({x:x1, y:y1});
     }
 }
  function graficaPresion(g){
     let y1;
     g.strokeStyle='black';
     g.fillStyle='black';
     g.textAlign='right';
     g.textBaseline='middle';
     g.beginPath();
     g.moveTo(orgXP, 0);
     g.lineTo(orgXP, orgY);
     //g.moveTo(orgXP, orgY);
     //g.lineTo(canvas.width/3, orgY);
     g.fillText('km', orgXP+2*wChar, wChar);
     for(let i=0; i<=30; i+=5){
         y1=orgY-escalaY*i;
         g.moveTo(orgXP-wChar, y1);
         g.lineTo(orgXP, y1);
         g.fillText(i, orgXP-wChar, y1);
         for(let j=0; j<5; j++){
             y1=orgY-escalaY*(i+j);
             g.moveTo(orgXP-wChar/2, y1);
             g.lineTo(orgXP, y1);
         }
     }
     let x1;
      g.textAlign='center';
     g.textBaseline='top';
     for(let i=0; i<=10; i+=2){
         x1=orgXP+i*escalaP/10;
         g.moveTo(x1, orgY);
         g.lineTo(x1, orgY+wChar);
         g.fillText(i/10, x1, orgY+wChar-2);
         if(i==10) break;
         x1=orgXP+(i+1)*escalaP/10;
         g.moveTo(x1, orgY);
         g.lineTo(x1, orgY+wChar);
      }
     g.stroke();
     g.strokeStyle='red';
     g.beginPath();
     g.moveTo(pPresion[0].x,pPresion[0].y);
     for(let i=1; i<pPresion.length; i++){
         g.lineTo(pPresion[i].x,pPresion[i].y);	
     }
     g.stroke();
 }
  
 function grafica(g){
     var x1, y1;
 //eje horizontal
     g.strokeStyle='black';
     g.fillStyle='black';
      g.textAlign='center';
     g.textBaseline='top';
     g.beginPath();
     g.moveTo(orgXX, orgY);
     g.lineTo(canvas.width, orgY);
     for(var i=0; i<=10; i+=2){
           x1=orgXX+escalaX*i/10;
           g.fillText(i/10, x1, orgY+wChar-2);
           g.moveTo(x1, orgY);
           g.lineTo(x1, orgY+wChar);
           x1=orgXX+escalaX*(i+1);
           g.moveTo(x1, orgY);
           g.lineTo(x1, orgY+wChar);
       }
      g.fillText('x', canvas.width-wChar, orgY-3*wChar/2);
 //eje vertical
     g.moveTo(orgXX, 0);
     g.lineTo(orgXX, canvas.height);
     g.fillText('v', orgXX+wChar, wChar);
      g.textAlign='right';
     g.textBaseline='middle';
     for(var i=0; i<=6; i++){
           y1=orgY-escalaV*i;
           g.fillText(i, orgXX-wChar, y1);
           g.moveTo(orgXX-wChar, y1);
           g.lineTo(orgXX, y1);
     }
     g.stroke();
     x1=orgXX+(1.0-estado.x/altura)*escalaX;
     y1=orgY+estado.v*escalaV/Math.sqrt(9.8*masa/k);
     pol.push({x:x1, y:y1});
     g.strokeStyle='blue';
       g.beginPath();
     g.moveTo(pol[0].x,pol[0].y);
     for(var i=1; i<pol.length; i++){
         g.lineTo(pol[i].x,pol[i].y);	
     }
     g.stroke();
     g.fillStyle='blue';
     g.beginPath();
     g.arc(x1,y1, 2,0,2*Math.PI);
     g.fill();
      g.strokeStyle='black';
      g.save();
     g.setLineDash([5]);
     g.beginPath();
     g.moveTo(x1,y1);
     g.lineTo(x1,orgY);
     g.moveTo(x1,y1);
     g.lineTo(orgXX,y1);
     g.stroke();
     g.restore();
  }
  
 function mueveParticula(g){
 //muestra la partÃ­cula en la nueva posiciÃ³n
     var y1=orgY-estado.x*escalaY/1000;
     g.strokeStyle='blue';
     g.beginPath();
     g.arc(orgX, y1, wChar, Math.PI, 2*Math.PI);
     g.stroke();
     g.beginPath();
      g.moveTo(orgX-wChar, y1);
      g.lineTo(orgX, y1+wChar);
      g.moveTo(orgX+wChar, y1);
      g.lineTo(orgX, y1+wChar);
      g.stroke();
     g.fillStyle='black';
     g.beginPath();
     g.arc(orgX, y1, wChar/2, 0, 2*Math.PI);
     g.fill();
  //marca la presiÃ³n en la grÃ¡fica
     var z=Math.exp(-estado.x/7482.2);
     var x1=orgXP+z*escalaP;
 //lÃ­neas a puntos
     g.strokeStyle='black';
     g.save();
     g.setLineDash([5]);
     g.beginPath();
     g.moveTo(orgX,y1);
     g.lineTo(orgXP,y1);
     g.moveTo(x1,y1);
     g.lineTo(x1,orgY);
     g.stroke();
     g.restore();
  
 //flechas de la fuerza sobre la partÃ­cula
      flechaFuerza(g, orgX+2*wChar, y1, 'black', -1, 9.8);
      flechaFuerza(g, orgX+2*wChar, y1, 'blue', 1, acel+9.8);
 }
 
   
 function flechaFuerza(g, x2, y2, color, sgn, f0){
 //longitud
     var lon=sgn*f0*2*wChar/9.8;
     if(Math.abs(lon)<1) return;
     flecha.length=0;
     flecha.push({x:x2+2, y:y2});
     flecha.push({x:x2+2, y:y2-lon});
     flecha.push({x:x2+4, y:y2-lon});
     flecha.push({x:x2, y:y2-lon-4*sgn});
     flecha.push({x:x2-4, y:y2-lon});
     flecha.push({x:x2-2, y:y2-lon});
     flecha.push({x:x2-2, y:y2});
 //color rojo
     g.fillStyle=color;
     g.beginPath();
     g.moveTo(flecha[0].x,flecha[0].y);
     for(var i=1; i<flecha.length; i++){
         g.lineTo(flecha[i].x,flecha[i].y);	
     }
     g.closePath();
     g.fill();
 }
   
  function muestraValores(g){
      g.textAlign='left';
     g.textBaseline='top';
     g.fillStyle='cyan';
     g.fillRect(orgX+4*wChar, 0, canvas.width-orgX-4*wChar, 2*wChar);
     g.fillStyle='black';
 //tiempo
     var x1=orgX+5*wChar;
     g.fillText('t: '+(estado.t).toFixed(1), x1, 2);
 //posiciÃ³n
     if(estado.x<0.0){
           estado.x=0.0;
     }
     x1+=(canvas.width-orgX-4*wChar)/4;
     g.fillText('x: '+(estado.x).toFixed(0), x1, 2);
 //velocidad
     x1+=(canvas.width-orgX-4*wChar)/4;
     g.fillText('v: '+(estado.v).toFixed(1), x1, 2);
         //aceleraciÃ³n
     x1+=(canvas.width-orgX-4*wChar)/4;
     g.fillText('a: '+acel.toFixed(2), x1, 2);
 }
 function dispositivo(g){
 //ejes
     graficaPresion(g);
     grisPresion(g);
  
     grafica(g);
     mueveParticula(g);
     muestraValores(g);   
 }
 
     
 var raf, 
     nuevo = document.getElementById('nuevo'),
     empieza = document.getElementById('empieza'),
    paso = document.getElementById('paso'),
     pausa=document.getElementById('pausa');
 
 drawGrid('lightgray', 10, 10);  
 empieza.disabled=true;
 pausa.disabled=true;
 
 
 nuevo.onclick = function (e) {	
       masa=parseFloat(document.getElementById('masa_1').value);
       var area=parseFloat(document.getElementById('area_1').value);
      altura=parseFloat(document.getElementById('altura_1').value)*1000;
  
     presion();
     estado={t:0.0, x:altura, v:0.0};
     k=1.29*area*0.8/2;
     sistema=new RungeKutta(masa, k, 0.5);
     pol.length=0;
     acel=-9.8;
  
  
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawGrid('lightgray', 10, 10); 
     dispositivo(ctx);
   //document.getElementById('readout').innerHTML='nuevo';
     empieza.disabled=false;
     pausa.disabled=true;
     paso.style.display='none';
     pausa.style.display='inline';
     if(raf!=undefined){
         window.cancelAnimationFrame(raf);
     }
 }
 
 
 empieza.onclick = function (e) {
    empieza.disabled=true;
     pausa.disabled=false;
     paso.style.display='none';
     pausa.style.display='inline';
     raf=window.requestAnimationFrame(animate);
 }
 
 pausa.onclick = function (e) {
   empieza.disabled=false;
     pausa.disabled=true;
     paso.style.display='inline';
     pausa.style.display='none';
     window.cancelAnimationFrame(raf);
 }
 paso.onclick = function (e) {
     update();
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawGrid('lightgray', 10, 10);  
     dispositivo(ctx);
 }
 function update() {
    sistema.resolver(estado);
    acel=-9.8+k*estado.v*estado.v*Math.exp(-estado.x/7482.2)/masa;
 }
 
 function animate(time) {
    update();
    if (estado.x<0){
    window.cancelAnimationFrame(raf);
        pausa.disabled=true;
    }else{
        raf=window.requestAnimationFrame(animate);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray', 10, 10);  
    dispositivo(ctx);
}
 
