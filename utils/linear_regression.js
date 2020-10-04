import * as tf from '@tensorflow/tfjs-node-gpu';

const linear_regression = ({ trainY, trainX, learning_rate = 0.005, steps = 1000 }) => {
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
    const optimizer = tf.train.sgd(learning_rate);

    optimizer.minimize(function () {
      const predsYs = predict(tf.tensor1d(trainX));
      // console.log(predsYs);
      const stepLoss = loss(predsYs, tf.tensor1d(trainY));
      totalLoss = stepLoss.dataSync()[0];
      console.log('stepLoss', totalLoss);
      return stepLoss;
    });
  }

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

export default linear_regression;
