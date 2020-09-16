import * as tf from '@tensorflow/tfjs-node-gpu';
import createDate from './createDate';
import convertToTimestaps from './convertToTimestamps';
import convertToTimestamps from './convertToTimestamps';

/**
 * It will print tensor info
 */
const tensorInfo = () => {
  console.log('TensorFlow.js version information: ');
  console.log(tf.version);

  console.log(`TensorFlow.js backend: ${tf.getBackend()}`);
};

function normalise(tensor, previousMin = null, previousMax = null) {
  const min = previousMin || tensor.min();
  const max = previousMax || tensor.max();
  const normalisedTensor = tensor.sub(min).div(max.sub(min));
  return {
    tensor: normalisedTensor,
    min,
    max,
  };
}

function denormalise(tensor, min, max) {
  const denormalisedTensor = tensor.mul(max.sub(min)).add(min);
  return denormalisedTensor;
}

function createModel() {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 1,
      useBias: true,
      activation: 'linear',
      inputDim: 1,
    }),
  );

  const optimizer = tf.train.sgd(0.1);
  model.compile({
    loss: 'meanSquaredError',
    optimizer,
  });

  return model;
}

async function trainModel(model, trainingFeatureTensor, trainingLabelTensor) {
  // const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks({ name: 'Training Performance' }, [
  //   'loss',
  // ]);

  return model.fit(trainingFeatureTensor, trainingLabelTensor, {
    batchSize: 32,
    epochs: 20,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => console.log(`epoch: ${epoch} loss: ${logs.loss}`),
    },
  });
}

async function predict(model, normalisedFeature, normalisedLabel) {
  tf.tidy(() => {
    console.log('normalisedFeature', normalisedFeature);
    // const date = [new Date()];
    const date = [new Date(), new Date('09-20-20')];
    // const date = [new Date()];

    const toTimeStamp = convertToTimestamps(date);

    // console.log('toTimeStamp', toTimeStamp);

    const inputTensor = tf.tensor1d(toTimeStamp);
    const normalisedInput = normalise(inputTensor, normalisedFeature.min, normalisedFeature.max);

    const normalisedOutputTensor = model.predict(normalisedInput.tensor);

    const outputTensor = denormalise(
      normalisedOutputTensor,
      normalisedLabel.min,
      normalisedLabel.max,
    );

    const outputValue = outputTensor.dataSync();

    console.log('outputValue:', outputValue);
  });
}
/**
 * It will use tensorflowJS to make some predictions in X time steps in the future
 */
const predictions = async ({ midsX, midsY, filledDates, filledValues }) => {
  //   console.log({
  //     midsX,
  //     midsY,
  //     // filledDates: JSON.stringify(filledDates, null, 2),
  //     filledDates,
  //     // filledValues: JSON.stringify(filledValues, null, 2),
  //     filledValues,
  //   });

  if (filledDates.length % 2 !== 0) {
    // If odd number of elements
    filledDates.pop(); // remove one element
  }

  if (filledValues.length % 2 !== 0) {
    // If odd number of elements
    filledValues.pop(); // remove one element
  }
  console.log('date:', createDate(filledDates[0]));

  const toDates = filledDates.map((d) => createDate(d));

  const timestamps = convertToTimestaps(toDates);

  // features are timestamps --> X axis

  // labels are filledValues --> Y axis

  // Extract Features (inputs)
  const featureValues = timestamps.map((p) => parseInt(p));
  const featureTensor = tf.tensor2d(featureValues, [featureValues.length, 1]);

  // Extract Labels (outputs)
  const labelValues = filledValues.map((p) => parseInt(p));
  const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

  console.log('featureValues', featureValues, ' labelValues', labelValues);
  /* normalize features and labels */

  const normalisedFeature = normalise(featureTensor);
  const normalisedLabel = normalise(labelTensor);

  console.log('normalisedFeature', normalisedFeature);
  const [trainingFeatureTensor, testingFeatureTensor] = tf.split(normalisedFeature.tensor, 2);
  const [trainingLabelTensor, testingLabelTensor] = tf.split(normalisedLabel.tensor, 2);

  const model = createModel();
  model.summary();

  const result = await trainModel(model, trainingFeatureTensor, trainingLabelTensor);
  console.log(result);

  const trainingLoss = result.history.loss.pop();
  console.log(`Training set loss: ${trainingLoss}`);
  const validationLoss = result.history.val_loss.pop();
  console.log(`Validation set loss: ${validationLoss}`);

  const lossTensor = model.evaluate(testingFeatureTensor, testingLabelTensor);
  const loss = await lossTensor.dataSync();
  console.log(`Testing set loss: ${loss}`);

  predict(model, normalisedFeature, normalisedLabel);
};

export default predictions;
