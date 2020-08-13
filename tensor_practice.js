const tf = require('@tensorflow/tfjs-node-gpu');

console.log('TensorFlow.js version information: ');
console.log(tf.version);

console.log(`TensorFlow.js backend: ${tf.getBackend()}`);
