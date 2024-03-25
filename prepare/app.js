const fs = require('fs');
const plotly = require('plotly.js-dist');

const data = [
    {
        x: ["Price", "Open", "High"],
        y: [2910.05, 2899.95, 2920.00],
        type: "scatter",
        name: "Data 1"
    },
    {
        x: ["Price", "Open", "High"],
        y: [2901.95, 2905.05, 2915.80],
        type: "scatter",
        name: "Data 2"
    },
    {
        x: ["Price", "Open", "High"],
        y: [2887.50, 2855.90, 2890.00],
        type: "scatter",
        name: "Data 3"
    }
];

const layout = {
    title: "Price, Open, High Plot",
    xaxis: {
        title: "Categories"
    },
    yaxis: {
        title: "Values"
    }
};

const plotData = { data: data, layout: layout };

fs.writeFile('plot_data.json', JSON.stringify(plotData, null, 2), 'utf8', function (err) {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('Plot data exported as plot_data.json');
    }
});
