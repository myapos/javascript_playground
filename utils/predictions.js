import * as tf from '@tensorflow/tfjs-node-gpu';
import createDate from './createDate';
import convertToTimestaps from './convertToTimestamps';
const tensorInfo = () => {
  console.log('TensorFlow.js version information: ');
  console.log(tf.version);

  console.log(`TensorFlow.js backend: ${tf.getBackend()}`);
};
/**
 * It will use tensorflowJS to make some predictions in X time steps in the future
 */
const predictions = ({ midsX, midsY, filledDates, filledValues }) => {
  //   console.log({
  //     midsX,
  //     midsY,
  //     // filledDates: JSON.stringify(filledDates, null, 2),
  //     filledDates,
  //     // filledValues: JSON.stringify(filledValues, null, 2),
  //     filledValues,
  //   });

  console.log('date:', createDate(filledDates[0]));

  const toDates = filledDates.map((d) => createDate(d));

  const timestamps = convertToTimestaps(toDates);

  /* step 1 define a model */
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, useBias: true, activation: 'linear', inputShape: [1] }));

  // Prepare the model for training: Specify the loss and the optimizer. tf.train.sgd(0.1)
  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

  model.summary();
  // load data for training.
  const xs = tf.tensor2d(timestamps, [timestamps.length, 1]);
  const ys = tf.tensor2d(filledValues, [filledValues.length, 1]);

  //   Train the model using the data.
  model
    .fit(xs, ys, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss= ${log.loss}`),
      },
    })
    .then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      model.predict(tf.tensor2d([5], [1, 1])).print();
    });
};

export default predictions;
