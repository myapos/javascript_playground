import splitDate from './splitDate';
import prettyValue from './prettyValue';
import monthInfo from './monthInfo';

const convertArrayToMap = (ar) => {
  let myMap = new Map();

  ar.forEach((raw) => {
    const splitted = splitDate(raw.Date);

    // detect key
    const prettyKey = prettyValue(splitted[1]);

    myMap.set(raw.Date, {
      ...raw,
      filled: typeof raw.filled !== 'undefined' ? raw.filled : false,
      month: monthInfo[prettyKey].month,
      order: monthInfo[prettyKey].order,
    });
  });

  return myMap;
};
export default convertArrayToMap;
