const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const modelFilePath = 'model.json';

// Function to check if the model file exists
function modelFileExists() {
    try {
        fs.accessSync(modelFilePath);
        return true;
    } catch (err) {
        return false;
    }
}

async function trainModelIfNeeded() {
    if (modelFileExists()) {
        // Model file exists, so load the model and make predictions
        const loadedModel = await tf.loadLayersModel(`file://${modelFilePath}`);
        const input = tf.tensor2d([[/* your input data here */]]);
        const prediction = loadedModel.predict(input);
        console.log('Prediction using loaded model:', prediction.arraySync()[0]);
    } else {
        // Model file does not exist, so train the model
        console.log('Model file does not exist. Training the model...');

        // Example training data (historical data)
        const trainingData = require('./trainingData.json');

        // Preprocess the data
        const processedData = trainingData.map(entry => [
            entry.price, 
            entry.open, 
            entry.high, 
            entry.low
        ]);

        // Convert processed data to tensors
        const xs = tf.tensor2d(processedData.slice(0, -1)); // Input sequences
        const ys = tf.tensor2d(processedData.slice(1)); // Target sequences

        // Define the model architecture
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 128, inputShape: [4] }));
        model.add(tf.layers.dense({ units: 4 }));

        // Compile the model
        model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

        // Train the model
        await model.fit(xs, ys, { epochs: 100 });

        // Save the trained model
        await model.save(`file://${modelFilePath}`);
        console.log('Model trained and saved successfully at:', modelFilePath);
    }
}

trainModelIfNeeded();
