// En una atmosfera isotérmica la variación de la presión en función de la altitud x está dada por la ley de Laplace

const p0 = 1.29; //presion de la atmósfera a nivel del mar
const M = 0.0288; //peso molecular del aire 
const g = 9.81;
const K = Math.pow(1.3805*10, -23);
const T = 254; //Temperatura en kelvin



//Chart js

var canvas = document.getElementById('myChart');
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
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
            data: [0],
        }
    ]
};


setTimeout(() => {
    for (let i = 1; i <= 30000; i++) {
        console.log(p0 * Math.exp(-i /7482.2));

        setTimeout(() => {
            myLineChart.data.datasets[0].data[i] = (p0 * Math.exp(-i /7482.2));
            myLineChart.data.labels[i] = i;   
            myLineChart.update(); 
        }, 250);
        
        
    }    
}, 2000);

var option = {
	showLines: true
};
var myLineChart = Chart.Line(canvas,{
	data:data,
  options:option
});

