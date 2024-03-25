const fs = require('fs');
const csv = require('csv-parser');

// Function to convert CSV to JSON
function csvToJson(csvFilePath, jsonFilePath) {
    const jsonArray = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Convert the price-related columns to integers (assuming they are in a currency format)
            const columnsToConvert = ['Price', 'Open', 'High', 'Low'];
            columnsToConvert.forEach(col => {
                if (row[col]) {
                    row[col] = parseFloat(row[col].replace(/,/g, '')); // Remove commas and parse as float
                    row[col] = Math.round(row[col] * 100); // Convert to integer by multiplying by 100 and rounding
                }
            });
            jsonArray.push(row);
        })
        .on('end', () => {
            // Write JSON data to file
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 4));
            console.log('CSV file successfully converted to JSON.');
        });
}

// Usage: Pass the input CSV file path and desired output JSON file path
const csvFilePath = 'stock.csv';
const jsonFilePath = 'prepare.json';

csvToJson(csvFilePath, jsonFilePath);

console.log("CSV to JSON converted");
