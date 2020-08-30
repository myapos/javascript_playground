/* It reads weight loss data from csv file located in data folder and generates two graphs. The first one
is a simple representation of the raw csv data. The second displays the average deviation per week. 
Usage: 
verbose mode prints logs in the output about the calcluated periods, difference days and segments
Example: npm start verbose */
import csv from 'csv-parser';
import fs from 'fs';
import { plot } from 'nodeplotlib';

import addMean from './utils/addMean';
import dateDiffInDays from './utils/dateDiffInDays';
import verboseLog from './utils/verboseLog';
import missingValues from './utils/missingValues';
import reverseArray from './utils/reverseArray';

// const FILENAME = './data/weight_loss.csv';
const FILENAME = './data/weight_loss_minimal.csv';

const rawValues = [];
const dates = [];
const rawData = [];

fs.createReadStream(FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    // console.log('received data', row);

    rawData.push(row);
    rawValues.push(parseFloat(row['Kgrs'].replace(',', '.')));

    dates.push(row['Date']);
  })
  .on('end', () => {
    verboseLog('CSV file successfully processed');

    // verboseLog(`values ${values} length ${values.length}`);
    // detect any missing dates and fill them

    // first in forward mode
    const forwardValues = missingValues(rawData, dates, 'forward');

    // console.log('forward values', JSON.stringify(forwardValues));
    // const values = missingValues(rawData, dates, 'forward');
    // const values = reverseArray(forwardValues);

    // secondly in reverse mode
    // const reversedValues = reverseArray(rawData);
    const values = missingValues(forwardValues, dates, 'reverse');
    console.log('values', JSON.stringify(values));

    const midsY = [];
    const midsX = [];

    const slices = [];
    let slice = [];
    let p1 = 0,
      p2 = 0;
    let dif = 7;

    let remainingValues = [];
    values.forEach((value, index) => {
      // const difference = dateDiffInDays(dates[p1], dates[p2]);
      // if (difference > dif - 1) {
      //   slice = values.slice(p1, p2);
      //   // console.log('slice',slice, ' midsY', midsY)
      //   addMean({ slice, midsY, range: dates[p1] + ' to ' + dates[p2 - 1], midsX });
      //   slices.push(slice);
      //   p1 = p2;
      // }

      // this approach does not work because there are missing values. In order for this
      // to work I have to fill the missing values with the previous one
      // const lastDatePeriod = Math.floor(values.length / dif) * dif;
      // const lastDatePeriod = Math.floor(values.length / dif) * dif;

      // get last remaining values
      // if (index >= lastDatePeriod) {
      //   verboseLog(
      //     `------lastDatePeriod---------- ${lastDatePeriod} lastValue: ${values[lastDatePeriod]} populating remaining values ${index}`,
      //   );
      //   remainingValues.push(value);
      //   verboseLog(`----------remainingValues-------------- ${remainingValues}`);
      // }

      // if (index === values.length - 1 && remainingValues.length > 0) {
      //   // push remainingValues in the last iteration
      //   slices.push(remainingValues);
      //   addMean({
      //     slice: remainingValues,
      //     midsY,
      //     range: dates[p2 - 1] + ' to Today',
      //     midsX,
      //   });
      // }

      // increase counter
      p2++;
    });

    // verboseLog(`remainingValues completed: ${remainingValues}`);
    // verboseLog(`-------------- slices: ${slices}`);
    // verboseLog(`-------------- midsY: ${midsY}`);
    // verboseLog(`-------------- midsX: ${midsX}`);

    // const data = [{ x: midsX, y: midsY, type: 'line' }];
    // plot(data);

    // plot initial data
    // const data_ = [{ x: dates, y: values, type: 'line' }];
    // plot(data_);
  });
