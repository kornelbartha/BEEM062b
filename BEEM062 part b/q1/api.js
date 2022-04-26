const woc_api_url = 'https://api.whatsonchain.com/v1/bsv/main/exchangerate';

async function getData() {
    const response = await fetch(woc_api_url)
    const data = await response.json()
    const rate = parseFloat(data['rate']); 
    return rate;
}

var layout = {
    title: 'BSV to USD exchange rate',
    xaxis: {
      title: 'Date/Time',
      titlefont: {
        family: 'verdana',
        size: 12,
        color: 'grey'
      },
      showticklabels: true,
      tickangle: 'auto',
      tickfont: {
        family: 'verdana',
        size: 10,
        color: 'black'
      },
      exponentformat: 'e',
      showexponent: 'all'
    },
    yaxis: {
      title: 'Exchange Rate',
      titlefont: {
        family: 'verdana',
        size: 12,
        color: 'grey'
      },
      showticklabels: true,
      tickangle: 45,
      tickfont: {
        family: 'verdana',
        size: 10,
        color: 'black'
      },
      exponentformat: 'e',
      showexponent: 'all'
    }
  };

getData().then(()=>{

    var time = new Date();
    
    var data = [{
        x: [time],
        y: [],
        mode: 'lines',
        line: {color: '#80CAF6'}
    }]
    
    Plotly.newPlot('graph', data, layout); 
});

var cnt = 0;

const interval = setInterval(async function() {
  
    var time = new Date();
  
    var update = {
    x:  [[time]],
    y: [[await getData()]]
    }
  
    Plotly.extendTraces('graph', update, [0])
  
    if(++cnt === 100) clearInterval(interval);
  }, 1000);