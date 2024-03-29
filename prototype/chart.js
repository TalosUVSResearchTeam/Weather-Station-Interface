window.onload = function () { LoadData() }

function LoadData(){

    function fillDataset(dataarray, datasetdata){
        for (var i=0; i<dataarray.length; i++) {
            datasetdata[i] = {
                label:"Test " + i,
                data: dataarray[i],
                fill: false,
                backgroundColor: colors[i],
                borderColor: colors[i],
            }
        }
        return datasetdata;
    }

    var xAllValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    var yAllValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
    var xRainValues = [1, 2, 7, 8, 9, 10];
    var yRainValues = [7, 8, 8, 9, 9, 9];
    
    var y1Values = [7, 8, 8, 9, 9, 9];
    var y2Values = [7, 4, 8, 2, 9, 7];
    var y3Values = [1, 8, 6, 12, 9, 9];
    var y4Values = [6, 8, 3, 1, 3, 7];
    

    //Chart Colors
    var tempGaugeColors = [ '#032580', '#0582CA', '#F85E00', '#E81717'];
    var gaugeColors = [ '#5F9324', '#FFB30F', '#F85E00', '#E81717'];
    var colors = [ '#fa4dc8', '#7E34D1', '#0582CA', '#490F60', '#5F9324', '#FFB30F', '#F85E00', '#E81717'];
    var dustColor = ['#5F9324', '#5F932480'];
    var rainColor = ['#437F97', '#437F9780'];
    var airQColor = ['#FFB30F', '#FFB30F80'];
    
    //Gauge Variables
    var curValue = 2;
    var curMinValue = 0;
    var curLim = [1,2,3,4];

    //Gauge Functions
    var chartName = document.getElementById('temp').getContext('2d');//Temperature
    gFunction(chartName, curValue, curMinValue, curLim, "Temperature", tempGaugeColors);

    var chartName = document.getElementById('hum').getContext('2d');//Humidity
    gFunction(chartName, curValue, curMinValue, curLim, "Humidity", gaugeColors);
    
    var chartName = document.getElementById('bar').getContext('2d');//Barometric pressure
    gFunction(chartName, curValue, curMinValue, curLim, "Barometric pressure", gaugeColors);
    
    //Creation of Dynamic Array
    var datasetdata0 = [];
    var datasetdata1 = [];
    var datasetdata2 = [];
    var datasetdata3 = [];
    var datasetdata4 = [];
    var dataarray = [y1Values,y2Values,y3Values];
    var dataarray2 = [y1Values,y2Values,y3Values, y4Values];

    var chartName = document.getElementById('bme');//BME280
    DynamicLineFunction(chartName,xRainValues,fillDataset(dataarray,datasetdata0),"Temperature,Humidity and Barometric pressure");
    
    //var chartName = document.getElementById('bme');//BME280
    //mulLineFunction(chartName,xRainValues,y1Values,y2Values,y3Values,"Temperature,Humidity and Barometric pressure");
    
    //Line Functions
    var chartName = document.getElementById('dust');//Dust
    cFunction(chartName, xRainValues, yRainValues, "Dust", dustColor);

    var chartName = document.getElementById('rain');//Rain
    cFunction(chartName, xRainValues, yRainValues, "Rain", rainColor);

    var chartName = document.getElementById('mq2');//MQ2
    DynamicLineFunction(chartName,xRainValues,fillDataset(dataarray,datasetdata1),"MQ2");

    var chartName = document.getElementById('mq3');//MQ3
    DynamicLineFunction(chartName,xRainValues,fillDataset(dataarray,datasetdata2),"MQ3");

    var chartName = document.getElementById('mq4');//MQ4
    DynamicLineFunction(chartName,xRainValues,fillDataset(dataarray,datasetdata3),"MQ4");

    var chartName = document.getElementById('mq135');//MQ135
    DynamicLineFunction(chartName,xRainValues,fillDataset(dataarray2,datasetdata4),"MQ135");

    var chartName = document.getElementById('aq');//Air Quality
    cFunction(chartName, xRainValues, yRainValues, "Air Quality", airQColor);
}


function cFunction(chartName, xValues, yValues, chartText, color) {
    var chart = new Chart(chartName, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor:color[1],
                borderColor: color[0],
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: chartText, 
            }
        }
    });
    chart.render();
}

function DynamicLineFunction(chartName,xValues,datasetdata,chartText) {
    var chart = new Chart(chartName, {
        type: "line",
        data: {
            labels: xValues,
            datasets: datasetdata
        },
        options: {
            legend: {
                //position: 'left',//left when resize
                labels: {
                    fontSize: 12,
                    boxWidth:1
                }
                },
            title: {
                display: true,
                text: chartText,							
            }
        }
    });
    chart.render();
}			

function gFunction(chartName, curValue, curMinValue, curLim, chartText, colors) {
    var chart = new Chart(chartName, {
        type: "gauge",
        data: {
            datasets: [{
                value: curValue,
                minValue: curMinValue,
                backgroundColor: colors,
                data: curLim,
            }]
        },
        options: {
            needle: {
                radiusPercentage: 10,
                widthPercentage: 3.0,
                lengthPercentage: 80,
                color: '#ffffff'
            },
            valueLabel: {
                display: true,
                formatter: (value) => {
                return Math.round(value);
                },
                fontSize: 14,
                color: 'black',
                backgroundColor: '#ffffff',
                borderRadius: 10,
                padding: {
                top: 1,
                bottom: 10
                }
            },
            title: {
                display: true,
                text: chartText
            }
            }
    });
    chart.render();
}
