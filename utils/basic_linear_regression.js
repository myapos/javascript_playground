import * as tf from '@tensorflow/tfjs-node-gpu';

// https://medium.com/@tristansokol/basic-tutorial-with-tensorflow-js-linear-regression-aa68b16e5b8e
const basic_linear_regression = (trainX, trainY) => {
  /** linear regression
   * y = mx + b
   * m,b : 1 dimensional tensors
   **/
  let totalLoss = 1000000000000000;

  const m = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));

  // console.log('trainX', trainX, ' trainY', trainY);
  console.log('Before: ');
  m.print();
  b.print();

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
      totalLoss = stepLoss.dataSync()[0];
      console.log('stepLoss', totalLoss);
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

  return {
    m,
    b,
    totalLoss,
  };
};

export default basic_linear_regression;
