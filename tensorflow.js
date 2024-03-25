const tf = require('@tensorflow/tfjs');

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
model.fit(xs, ys, { epochs: 100 })
  .then(() => {
    console.log('Model trained successfully.');
    
    // Example prediction
    const input = tf.tensor2d([processedData[processedData.length - 1]]);
    const prediction = model.predict(input);
    console.log('Prediction:', prediction.arraySync()[0]);
  })
  .catch(error => {
    console.error('Error training the model:', error);
  });
