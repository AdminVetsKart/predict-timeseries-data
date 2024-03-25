const fs = require('fs');

// Function to convert JSON data into suitable format
function convertData(jsonData) {
    // Extracting fields from JSON data
    const date = jsonData["﻿\"Date\""];
    const price = parseFloat(jsonData["Price"]);
    const open = parseFloat(jsonData["Open"]);
    const high = parseFloat(jsonData["High"]);
    const low = parseFloat(jsonData["Low"]);
    const vol = parseVolume(jsonData["Vol."]);
    const changePercent = parseFloat(jsonData["Change %"].replace('%', ''));

    // Return converted data
    return {
        date: date,
        price: price,
        open: open,
        high: high,
        low: low,
        vol: vol,
        changePercent: changePercent
    };
}

// Function to parse volume string and convert to numeric value
function parseVolume(volumeString) {
    let vol = parseFloat(volumeString);
    if (volumeString.endsWith('M')) {
        vol *= 1000000;
    } else if (volumeString.endsWith('K')) {
        vol *= 1000;
    }
    return vol;
}

// Load JSON data
const jsonData = require('./prepare.json');
jsonData.reverse();
// Convert JSON data to suitable format
const convertedData = jsonData.map(convertData);

// Save converted data to trainData.json
fs.writeFileSync('trainingData.json', JSON.stringify(convertedData, null, 2));

console.log('Converted data saved to trainData.json');
