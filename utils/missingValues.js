import verboseLog from './verboseLog';
import groupByProperty from './groupByProperty';
import { first } from 'lodash';

/**Detect a leap year */
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
/* It adds a zero if value is smaller than ten. This will help to keep unique values in Map */
const prettyValue = (value) => {
  let pretty = parseFloat(value);
  if (pretty < 10) {
    pretty = `0${pretty}`;
  }
  return pretty;
};
const monthInfo = {
  '01': {
    month: 'January',
    numOfDays: 31,
    order: '01',
  },
  '02': {
    month: 'February',
    numOfDays: 28,
    order: '02',
  },
  '03': {
    month: 'March',
    numOfDays: 31,
    order: '03',
  },
  '04': {
    month: 'April',
    numOfDays: 30,
    order: '04',
  },
  '05': {
    month: 'May',
    numOfDays: 31,
    order: '05',
  },
  '06': {
    month: 'June',
    numOfDays: 30,
    order: '06',
  },
  '07': {
    month: 'July',
    numOfDays: 31,
    order: '07',
  },
  '08': {
    month: 'August',
    numOfDays: 31,
    order: '08',
  },
  '09': {
    month: 'September',
    numOfDays: 30,
    order: '09',
  },
  '10': {
    month: 'October',
    numOfDays: 31,
    order: '10',
  },
  '11': {
    month: 'November',
    numOfDays: 30,
    order: '11',
  },
  '12': {
    month: 'December',
    numOfDays: 31,
    order: '12',
  },
};

/** It accepts a day and tests if the next date exist in the initial data */
const nextDateExists = (raw, dayOfMonth, monthIs, dates, year) => {
  //   console.log('---------', dayOfMonth, monthIs, dates);
  let nextDay = ++dayOfMonth;

  if (nextDay >= monthIs.numOfDays) {
    nextDay = monthIs.numOfDays;
  }

  const nextDate = `${prettyValue(nextDay)}-${monthIs.order}-${year}`;
  return {
    exists: dates.includes(nextDate),
    nextDate,
  };
};

const splitDate = (date) => date.split('-');

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

const convertMapToArray = (myMap) => {
  const ar = [];
  for (let [key, value] of myMap) {
    // console.log(key + ' = ' + JSON.stringify(value));
    ar.push({
      Date: key,
      Kgrs: value.Kgrs,
      month: value.month,
      order: value.order,
      filled: value.filled,
    });
  }
  // console.log('converted array:', JSON.stringify(ar, null, 2));
  // console.log('converted array:', ar);

  return ar;
};

/** It detects missing values in two modes (forward and reverse). In forward mode it scans the dates inside a
 * year and it fills in the missing dates with the value of previous day. In reverse mode it scans the  data in
 * reverse and fills the missing date with the next date. The result should be a range with full dates containing
 * values from prexisted data
 *
 * rawData: raw data from parsing csv. it is an array of json objects
 * dates: the array of dates extracted from rawData
 * mode: can be 'forward' or 'reverse' string
 */
const missingValues = (rawData, dates, mode) => {
  let converted = [];
  let grouped;
  verboseLog('---------detectMissingValues-------------- ' + mode);
  const filledMap = convertArrayToMap(rawData);

  // get the first month in the values
  let tempMonth = rawData[0].Date.split('-')[1];
  let tempMonthIs = monthInfo[tempMonth];

  if (mode === 'forward') {
    // loop
    rawData.forEach((raw, index) => {
      // detect dayOfMonth
      const dayOfMonth = parseFloat(raw.Date.split('-')[0]);

      // check for the first day in each month
      // detect month

      const month = raw.Date.split('-')[1];
      const monthIs = monthInfo[month];

      // detect year
      const year = raw.Date.split('-')[2];

      // build nextDate and search if it exists in initial dates
      let { exists, nextDate } = nextDateExists(raw.Date, dayOfMonth, monthIs, dates, year);

      let monthOfNextDate = nextDate.split('-')[1];
      let nextDayIsInSameMonth = monthOfNextDate === monthIs.order;
      let counter = 0;

      // if the next date does not exist in the array then add it
      while (!exists && nextDayIsInSameMonth && counter <= monthIs.numOfDays) {
        // push missing date with the previous value

        const splittedKey = nextDate.split('-');

        const prettyDate = `${prettyValue(splittedKey[0])}-${prettyValue(
          splittedKey[1],
        )}-${prettyValue(splittedKey[2])}`;

        filledMap.set(prettyDate, {
          Date: prettyDate,
          Kgrs: raw.Kgrs,
          filled: true,
          month: monthInfo[prettyValue(splittedKey[1])].month,
          order: monthInfo[prettyValue(splittedKey[1])].order,
        });
        monthOfNextDate = nextDate.split('-')[1];
        const nextDayOfMonth = prettyValue(parseFloat(nextDate.split('-')[0]));
        nextDayIsInSameMonth = monthOfNextDate === monthIs.order;
        ({ exists, nextDate } = nextDateExists(nextDate, nextDayOfMonth, monthIs, dates, year));

        counter++;
      }

      tempMonthIs = { ...monthIs };
    });

    // sort by date
    var mapAsc = new Map(
      [...filledMap.entries()].sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const splittedA = splitDate(a[0]);
        const splittedB = splitDate(b[0]);
        const DateA = new Date(splittedA[1] + '-' + splittedA[0] + '-' + splittedA[2]);
        const DateB = new Date(splittedB[1] + '-' + splittedB[0] + '-' + splittedB[2]);
        // console.log('DateA', DateA);
        return DateA - DateB;
      }),
    );

    converted = convertMapToArray(mapAsc);
  } else if (mode === 'reverse') {
    const extraInfoArray = convertMapToArray(filledMap);

    // group by month
    grouped = groupByProperty(extraInfoArray, 'month');

    // console.log('grouped', grouped);
    // loop in reverse mode for each month and detect if there are missing values for each month
    // in the beginning
    let hasMissingValuesPerMonth = false;
    Object.keys(grouped).forEach((month) => {
      const splitted = splitDate(grouped[month][0].Date);
      const monthKey = splitted[1];

      if (grouped[month].length !== monthInfo[monthKey].numOfDays) {
        const monthData = grouped[month];
        hasMissingValuesPerMonth = true;
        const firstMonthRecording = monthData[0];

        const numOfMissingDays = monthInfo[monthKey].numOfDays - grouped[month].length;
        // console.log('----------monthData----------', monthData);
        // console.log('first recorded value', firstMonthRecording);

        console.log(`month:${month} has ${numOfMissingDays} missing days in the beginning`);

        const splitted = splitDate(firstMonthRecording.Date);
        const firstDay = parseFloat(splitted[0]);

        // loop and fill missing dates in the beginning
        for (let i = 1; i <= numOfMissingDays; i++) {
          const dayNumber = prettyValue(firstDay - i);
          // build date
          const newDate = `${dayNumber}-${splitted[1]}-${splitted[2]}`;
          grouped[month].unshift({
            ...firstMonthRecording,
            Date: newDate,
            filled: true,
          });
        }
      }
    });

    // console.log('-----grouped--------', JSON.stringify(grouped));
    // flaten grouped to converted

    Object.keys(grouped).forEach((month) => {
      converted.push(...grouped[month]);
    });
  }

  // console.log('grouped', grouped);
  return converted;
};

export default missingValues;
