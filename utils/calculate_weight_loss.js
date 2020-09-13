/**
 * It will calculate all the data for plotting graphs
 *
 * Parameters:
 * rawData: an array containing objects from csv reading
 * dates: an array containing only the dates from csv reading
 */

import { plot } from 'nodeplotlib';
import addMean from './addMean';
import dateDiffInDays from './dateDiffInDays';
import missingValues from './missingValues';
import verboseLog from './verboseLog';

const calculate_weight_loss = ({ rawData, dates, currentDate }) => {
  let values = [];

  let filledDates = [];
  let filledValues = [];

  // detect any missing dates and fill them
  values = missingValues({ rawData, dates, mode: 'forward', currentDate });
  filledDates = values.map((value) => value.Date);
  filledValues = values.map((value) => {
    const replaced = value['Kgrs'].replace(',', '.');
    return parseFloat(replaced);
  });

  verboseLog(`filledValues ${filledValues}`);
  verboseLog(`filledValues length ${filledValues.length}`);

  verboseLog(`filledDates ${filledDates}`);
  verboseLog(`filledDates length ${filledDates.length}`);

  const midsY = [];
  const midsX = [];

  const slices = [];
  let slice = [];
  let p1 = 0,
    p2 = 0;
  let dif = 7;

  // const lastDateIndexPeriod = Math.floor(filledValues.length / (dif - 1)) * (dif - 1);
  const lastDateIndexPeriod = Math.floor(filledValues.length / dif) * dif;
  verboseLog(`lastDateIndexPeriod: ${lastDateIndexPeriod}`);

  let remainingValues = [];
  filledValues.forEach((value, index) => {
    const difference = dateDiffInDays(filledDates[p1], filledDates[p2]);
    const range = filledDates[p1] + ' to ' + filledDates[p2 - 1];

    // p2 - p1 > dif - 1
    if (difference > dif - 1) {
      slice = filledValues.slice(p1, p2);
      addMean({ slice, midsY, range: range, midsX });
      slices.push(slice);
      p1 = p2;
    }

    if (index === filledValues.length - 1) {
      verboseLog('Calculate last period values');

      // 1. get last midX
      const lastMidsX = midsX[midsX.length - 1].split(' ');
      const dateOfLastPeriod = lastMidsX[lastMidsX.length - 1];
      verboseLog('last period: ' + dateOfLastPeriod);
      let lastDateIndexPeriod;

      // 2. find index of last date period from array
      filledDates.some((date, index) => {
        if (date === dateOfLastPeriod) {
          lastDateIndexPeriod = index + 1;
          return true;
        }
        return false;
      });

      verboseLog(
        'lastDateIndexPeriod ' +
          lastDateIndexPeriod +
          ' last value before ' +
          filledValues[lastDateIndexPeriod],
      );

      // 3. get remaining values  as as slice from filled values and lastDateIndexPeriod
      remainingValues = filledValues.slice(lastDateIndexPeriod, filledValues.length);
      verboseLog(`last iteration remaining values: ${remainingValues}`);

      // 4. push remainingValues in the last iteration
      slices.push(remainingValues);
      addMean({
        slice: remainingValues,
        midsY,
        range: filledDates[lastDateIndexPeriod] + ' to Today',
        midsX,
      });
    }

    // increase counter
    p2++;
  });

  // verboseLog(`remainingValues completed: ${remainingValues}`);
  // verboseLog(`slices: ${slices}`);
  verboseLog(`midsY: ${midsY}`);
  verboseLog(`midsX: ${midsX}`);

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

  return {
    midsX,
    midsY,
    filledDates,
    filledValues,
  };
};

export default calculate_weight_loss;
