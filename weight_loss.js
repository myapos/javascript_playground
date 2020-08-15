/* It reads weight loss data from csv file located in data folder and generates two graphs. The first one
is a simple representation of the raw csv data. The second displays the average deviation per week */
import csv from 'csv-parser';
import fs from 'fs';
import { plot } from 'nodeplotlib';

import addMean from './utils/addMean';
import dateDiffInDays from './utils/dateDiffInDays';

const FILENAME = './data/weight_loss.csv';

const values = [];
const dates = [];
fs.createReadStream(FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    // console.log('reveived data', row['Kgrs']);
    values.push(parseFloat(row['Kgrs'].replace(',', '.')));

    dates.push(row['Date']);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    console.log('values', values, ' length', values.length);

    // console.log('dates', dates);

    const midsY = [];
    const midsX = [];

    const slices = [];
    let slice = [];
    let p1 = 0,
      p2 = 0;
    let dif = 7;

    let remainingValues = [];
    values.forEach((value, index) => {
      const difference = dateDiffInDays(dates[p1], dates[p2]);
      // p2 - p1 > dif - 1 ||
      if (difference > dif - 1) {
        slice = values.slice(p1, p2);
        // console.log('slice',slice, ' midsY', midsY)
        addMean({ slice, midsY, range: dates[p1] + ' to ' + dates[p2 - 1], midsX });
        slices.push(slice);
        p1 = p2;
      }

      const lastDatePeriod = Math.floor(values.length / dif) * dif - 1;
      console.log('------lastDatePeriod----------', lastDatePeriod, 'index ', index);
      // get last remaining values
      if (index >= lastDatePeriod) {
        remainingValues.push(value);
        console.log('----------remainingValues--------------', remainingValues);
      }

      if (index === values.length - 1) {
        // push remainingValues in the last iteration
        slices.push(remainingValues);
        addMean({
          slice: remainingValues,
          midsY,
          range: dates[lastDatePeriod] + ' to Today',
          midsX,
        });
      }

      // increase counter
      p2++;
    });

    console.log('-------------- slices', slices);
    console.log('-------------- midsY', midsY);
    console.log('-------------- midsX', midsX);

    // const data = [{ x: [1, 3, 4, 5], y: [3, 12, 1, 4], type: 'line' }];
    const data = [{ x: midsX, y: midsY, type: 'line' }];
    plot(data);

    // plot initial data
    const data_ = [{ x: dates, y: values, type: 'line' }];
    plot(data_);
  });
