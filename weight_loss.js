/* It reads weight loss data from csv file located in data folder and generates two graphs. The first one
is a simple representation of the raw csv data. The second displays the average deviation per week. 

Usage: 

Verbose mode prints logs in the output about the calculated periods, difference days and segments
Example: npm start verbose */
import csv from 'csv-parser';
import fs from 'fs';
import createDate from './utils/createDate';
import * as tf from '@tensorflow/tfjs-node-gpu';

import calculate_weight_loss from './utils/calculate_weight_loss';
import predictions from './utils/predictions';
import basic_linear_regression from './utils/basic_linear_regression';
import linear_regression from './utils/linear_regression';
import verboseLog from './utils/verboseLog';
// const FILENAME = './data/weight_loss_minimal.csv';
const FILENAME = './data/weight_loss.csv';
const rawData = [];
const dates = [];
let values = [];

fs.createReadStream(FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    /* add data only if they exist */
    if (typeof row !== 'undefined' && row['Kgrs'] && row['Date']) {
      values.push(parseFloat(row['Kgrs'].replace(',', '.')));

      dates.push(row['Date']);
      rawData.push(row);
    }
  })
  .on('end', () => {
    verboseLog('CSV file successfully processed');
    const currentDate = new Date();
    const { midsX, midsY, filledDates, filledValues } = calculate_weight_loss({
      rawData,
      dates,
      currentDate,
    });

    /**Use tensorflow js to make predictions
     *
     * Steps to follow
     *
     */

    // predictions({ midsX, midsY, filledDates, filledValues });
    // basic_linear_regression({ midsX, midsY, filledDates, filledValues });

    const num_of_samples = 1000;
    let trainX = [];
    let trainY = [];
    // create fake data with a secret function and try to predict m and b
    const linearFn = (x) => 5 * x + 10;

    for (let i = 1; i <= num_of_samples; i++) {
      const x = i; //Math.random();
      trainX.push(x);
      trainY.push(linearFn(x));
    }

    // const result = basic_linear_regression(trainX, trainY);

    // console.log(result);

    const tuningParameters = [
      // {
      //   learning_rate: 0.0001,
      //   steps: 150000,
      //  // sgd
      // },
      {
        learning_rate: 0.04,
        steps: 2500,
      },
      // {
      //   learning_rate: 0.005,
      //   steps: 500,
      // },
      // {
      //   learning_rate: 0.1,
      //   steps: 2000,
      // },
      // {
      //   learning_rate: 0.01,
      //   steps: 500,
      // },
      // {
      //   learning_rate: 0.0001,
      //   steps: 10000,
      // },
    ];

    // const trainY = midsY.map((value) => parseFloat(value));
    // const trainX = midsY.map((value, index) => index);

    trainY = filledValues;

    // trainX = filledDates.map((date) => createDate(date)).map((date) => Date.parse(date) / 100000);
    trainX = [...Array(trainY.length).keys()];
    console.log('trainY', trainY);
    console.log('trainX', trainX);

    const results = tuningParameters.map((combination) => {
      return linear_regression({
        // values: midsY,
        trainY,
        trainX,
        learning_rate: combination.learning_rate,
        steps: combination.steps,
      });
    });

    // console.log('constants', constants);

    // find combination with minimum total loss

    // sort in increasing order and extract the first element

    const sortedResults = results.sort(function (a, b) {
      return a.totalLoss - b.totalLoss;
    });

    // console.log('sortedConstants', sortedConstants);

    const bestResult = sortedResults[0];

    // predict values to the future for next weeks
    /** linear regression
     * y = mx + b
     * m,b : 1 dimensional tensors
     **/
    const futureFn = (time, m, b) => m.mul(time).add(b); // m * time + b;

    // console.log('values length', values.length);

    const futures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((time) => values.length + time);

    console.log('futures', futures);
    bestResult.m.print();
    bestResult.b.print();

    futures.forEach((future) => {
      const value = futureFn(future, bestResult.m, bestResult.b);
      console.log('predicted for x:', future);
      value.print();
    });

    futures.forEach((future) => {
      const value = linearFn(future);
      console.log('real value for future', future, ':', value);
    });
  });
