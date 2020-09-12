import verboseLog from './verboseLog';
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const preprocessDate = (dateString, delimiter) => {
  // preprocess dates from form DD-MM-YYYY

  //   var dateString = '23/10/2015'; // Oct 23
  // console.log('dateString', dateString);
  var dateParts = dateString.split(delimiter);

  // month is 0-based, that's why we need dataParts[1] - 1
  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  return dateObject;
};

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  const aDate = preprocessDate(a, '-');
  const bDate = preprocessDate(b, '-');

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(aDate.getFullYear(), aDate.getMonth(), aDate.getDate());
  const utc2 = Date.UTC(bDate.getFullYear(), bDate.getMonth(), bDate.getDate());
  const difference = Math.floor((utc2 - utc1) / _MS_PER_DAY);

  // verboseLog(`${a} to ${b} difference is ${difference}`);
  return difference;
}

export default dateDiffInDays;
