const brain = require('brain.js');
const { recurrent } = brain;
const { LSTMTimeStep } = recurrent;
const fs = require('fs');

function createModel() {
  return new LSTMTimeStep({
    inputSize: 2,
    hiddenLayers: [10],
    outputSize: 2,
  });
}
//

function loadModel(net, modelPath) {
  const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
  net.fromJSON(modelData);
}

function trainModel(net, trainingData) {
  net.train(trainingData, { log: false, iterations: 500, errorThresh: 0.09 });
}

function forecast(net, initialSequence, numFuturePredictions) {
  return net.forecast(initialSequence, numFuturePredictions);
}

module.exports = { createModel, loadModel, trainModel, forecast };