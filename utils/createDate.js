/**
 * It will create a Date object from a string date in format
 * DD-MM-YYYY
 */
import splitDate from './splitDate';

const createDate = (stringDate) => {
  const splitted = splitDate(stringDate);
  return new Date(splitted[1] + '-' + splitted[0] + '-' + splitted[2]);
};

export default createDate;
