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

const FILENAME = './data/weight_loss.csv';

let values = [];
const dates = [];
let filledDates = [];
let filledValues = [];
const rawData = [];

fs.createReadStream(FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    values.push(parseFloat(row['Kgrs'].replace(',', '.')));

    dates.push(row['Date']);
    rawData.push(row);
  })
  .on('end', () => {
    verboseLog('CSV file successfully processed');

    verboseLog(`values ${values} length ${values.length}`);

    // detect any missing dates and fill them

    values = missingValues(rawData, dates, 'forward');
    filledDates = values.map((value) => value.Date);
    filledValues = values.map((value) => {
      const replaced = value['Kgrs'].replace(',', '.');
      return parseFloat(replaced);
    });
    // parseFloat(row['Kgrs'].replace(',', '.')));

    console.log('---------- filled data', JSON.stringify(values));
    console.log('---------- filled values', JSON.stringify(filledValues));
    const midsY = [];
    const midsX = [];

    const slices = [];
    let slice = [];
    let p1 = 0,
      p2 = 0;
    let dif = 7;

    let remainingValues = [];
    filledValues.forEach((value, index) => {
      const difference = dateDiffInDays(filledDates[p1], filledDates[p2]);
      const range = filledDates[p1] + ' to ' + filledDates[p2 - 1];
      if (range.includes('23-08-2020')) {
        console.log('found');
        // debugger;
      }
      // p2 - p1 > dif - 1 ||
      if (difference > dif - 1) {
        slice = filledValues.slice(p1, p2);
        addMean({ slice, midsY, range: range, midsX });
        slices.push(slice);
        p1 = p2;
      }

      const lastDatePeriod = Math.floor(filledValues.length / dif) * dif - 1;
      verboseLog(`------lastDatePeriod---------- ${lastDatePeriod} index: ${index}`);

      verboseLog(`index is : ${index} value is: ${value}`);
      // get last remaining values
      if (index >= lastDatePeriod - 2) {
        verboseLog(`populating remaining values ${index}`);
        remainingValues.push(value);
        verboseLog(`----------remainingValues-------------- ${remainingValues}`);
      }

      if (index === filledValues.length - 1) {
        // push remainingValues in the last iteration
        slices.push(remainingValues);
        addMean({
          slice: remainingValues,
          midsY,
          range: filledDates[lastDatePeriod - 2] + ' to Today',
          midsX,
        });
      }

      // increase counter
      p2++;
    });

    verboseLog(`remainingValuse completed: ${remainingValues}`);
    verboseLog(`-------------- slices: ${slices}`);
    verboseLog(`-------------- midsY: ${midsY}`);
    verboseLog(`-------------- midsX: ${midsX}`);

    var option2 = process.argv.slice(2)[1];

    if (option2 === 'graphs') {
      /**
       * examples:
       * npm start - graphs
       * npm start '' graphs
       * npm start verbose graphs
       */
      const data = [{ x: midsX, y: midsY, type: 'line' }];
      plot(data);

      // plot initial data
      const data_ = [{ x: filledDates, y: filledValues, type: 'line' }];
      plot(data_);
    }
  });
