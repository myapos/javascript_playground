/* It reads weight loss data from csv file located in data folder and generates two graphs. The first one
is a simple representation of the raw csv data. The second displays the average deviation per week. 

Usage: 

Verbose mode prints logs in the output about the calculated periods, difference days and segments
Example: npm start verbose */
import csv from 'csv-parser';
import fs from 'fs';

import calculate_weight_loss from './utils/calculate_weight_loss';
import perdictions from './utils/predictions';
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

    perdictions({ midsX, midsY, filledDates, filledValues });
  });
