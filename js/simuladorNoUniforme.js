// En una atmosfera isotérmica la variación de la presión en función de la altitud x está dada por la ley de Laplace

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
});
