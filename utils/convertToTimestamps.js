/**
 * It will get an array with Date instances and return an array with timestamps
 *
 * Args:
 * dates: an array containind Date instances
 **/

import convertArrayToMap from './convertArrayToMap';

const convertToTimestamps = (dates) => dates.map((date) => Date.parse(date) / 1000);

export default convertToTimestamps;
