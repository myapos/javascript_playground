import * as tf from '@tensorflow/tfjs-node-gpu';
import createDate from './createDate';
import convertToTimestaps from './convertToTimestamps';
import toDate from './toDate';

/* console.log('data:', { filledDates, filledValues });

  if (filledDates.length % 2 !== 0) {
    // If odd number of elements
    filledDates.pop(); // remove one element
  }

  if (filledValues.length % 2 !== 0) {
    // If odd number of elements
    filledValues.pop(); // remove one element
  }

  // const toDates = filledDates.map((d) => createDate(d));

  // const timestamps = convertToTimestaps(toDates, 'tensorflow');
  let timestamps = [];

  for (let j = 0; j < filledValues.length; j++) {
    timestamps.push(j);
  }

  // X --> timestamps
  // Y --> filledValues

  const trainX = tf.tensor1d(timestamps, 'int32');
  const trainY = tf.tensor1d(filledValues, 'int32');

 

  const m = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));

  function predict(x) {
    return tf.tidy(function () {
      return m.mul(x).add(b);
    });
  }

  function loss(prediction, actualValues) {
    const error = prediction.sub(actualValues).square().mean();
    return error;
  }

  function train() {
    const learningRate = 0.005;
    const optimizer = tf.train.sgd(learningRate);

    optimizer.minimize(function () {
      const predsYs = predict(trainX);
      console.log('predsYs: ', predsYs);
      const stepLoss = loss(predsYs, trainY);
      console.log('stepLoss: ', stepLoss.dataSync()[0]);
      return stepLoss;
    });
    return optimizer;
  }

  // const steps = 20;

  // for (let epochs = 1; epochs < steps; epochs++) {
  //   train();
  // } 
  */

/** linear regression
 * y = mx + b
 * m,b : 1 dimensional tensors
 **/

// create fake data and try to predict m and b
const linearFn = (x) => 0.2 * x + 0.9;
const num_of_samples = 10;
const trainX = [];
const trainY = [];

for (let i = 0; i < num_of_samples; i++) {
  const x = Math.random();
  trainX.push(x);
  trainY.push(linearFn(x));
}

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

// console.log('trainX', trainX, ' trainY', trainY);
console.log('Before: ');
m.print();
b.print();
// https://medium.com/@tristansokol/basic-tutorial-with-tensorflow-js-linear-regression-aa68b16e5b8e
const basic_linear_regression = async () => {
  function predict(x) {
    return tf.tidy(function () {
      return m.mul(x).add(b);
    });
  }

  function loss(prediction, labels) {
    //subtracts the two arrays & squares each element of the tensor then finds the mean.
    const error = prediction.sub(labels).square().mean();
    return error;
  }

  function train() {
    const learningRate = 0.005;
    const optimizer = tf.train.sgd(learningRate);

    optimizer.minimize(function () {
      const predsYs = predict(tf.tensor1d(trainX));
      // console.log(predsYs);
      const stepLoss = loss(predsYs, tf.tensor1d(trainY));
      console.log('stepLoss', stepLoss.dataSync()[0]);
      return stepLoss;
    });
  }

  const steps = 10000;

  for (let epochs = 1; epochs < steps; epochs++) {
    train();
  }

  console.log('After: ');
  m.print();
  b.print();
};

export default basic_linear_regression;
