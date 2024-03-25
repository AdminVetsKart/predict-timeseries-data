const fs = require('fs');
const path = require('path');
const { createModel, loadModel, trainModel, forecast } = require('./model');
const trainingData = require('./data.json');

const modelPath = path.join(__dirname, 'model.json');

// Check if the model file exists
if (fs.existsSync(modelPath)) {
  // Load the existing model
  const net = createModel();
  loadModel(net, modelPath);

  // Make predictions using the loaded model
  const initialSequence = [[1, 5], [2, 4]];
  const numFuturePredictions = 2;
  const futureValues = forecast(net, initialSequence, numFuturePredictions);
  console.log('next 2 predictions', futureValues);
} else {
  // Create and train a new model
  const net = createModel();
  trainModel(net, trainingData);

  // Save the trained model to a file
  const modelData = net.toJSON();
  fs.writeFileSync(modelPath, JSON.stringify(modelData));

  // Make predictions using the newly trained model
  const initialSequence = [[1, 5], [2, 4]];
  const numFuturePredictions = 2;
  const futureValues = forecast(net, initialSequence, numFuturePredictions);
  console.log('next 2 predictions', futureValues);
}