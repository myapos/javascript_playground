/**
 * It will get an array with Date instances and return an array with timestamps
 *
 * Args:
 * dates: an array containind Date instances
 **/

import convertArrayToMap from './convertArrayToMap';

const convertToTimestamps = (dates, mode = 'default') => {
  if (mode === 'default') {
    return dates.map((date) => Date.parse(date) / 1000);
  } else {
    return dates.map((date) => Date.parse(date) / 1000000);
  }
};

export default convertToTimestamps;
