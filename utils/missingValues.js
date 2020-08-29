import verboseLog from './verboseLog';
/**Detect a leap year */
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

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

  const nextDate = `${nextDay}-${monthIs.order}-${year}`;

  return {
    exists: dates.includes(nextDate),
    nextDate,
  };
};

const convertArrayToMap = (ar) => {
  let myMap = new Map();

  ar.forEach((raw) => {
    myMap.set(raw.Date, {
      ...raw,
      filled: false,
    });
  });

  return myMap;
};

const convertMapToArray = (myMap) => {
  const ar = [];
  for (let [key, value] of myMap) {
    console.log(key + ' = ' + JSON.stringify(value));
    ar.push({
      Date: key,
      Kgrs: value.Kgrs,
      filled: value.filled,
    });
  }
  console.log('converted array:', ar);

  return ar;
};

const detectMissingValues = (rawData, dates) => {
  verboseLog('---------detectMissingValues--------------');
  // const filled = [...rawData];
  const filledMap = convertArrayToMap(rawData);

  // get the first month in the values
  let tempMonth = rawData[0].Date.split('-')[1];
  let tempMonthIs = monthInfo[tempMonth];
  console.log('tempMonth detection', tempMonth, tempMonthIs);
  let nextDayIsnSameMonth = true;
  // loop
  rawData.forEach((raw, index) => {
    // console.log('raw', raw, ' index', index);

    // detect dayOfMonth
    const dayOfMonth = parseInt(raw.Date.split('-')[0]);

    // detect month
    const month = raw.Date.split('-')[1];
    const monthIs = monthInfo[month];
    // console.log('month detection', month, monthIs);

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

      filledMap.set(nextDate, {
        Date: nextDate,
        Kgrs: raw.Kgrs,
        filled: true,
      });
      monthOfNextDate = nextDate.split('-')[1];
      const nextDayOfMonth = parseInt(nextDate.split('-')[0]);
      nextDayIsInSameMonth = monthOfNextDate === monthIs.order;
      ({ exists, nextDate } = nextDateExists(nextDate, nextDayOfMonth, monthIs, dates, year));

      counter++;
    }

    console.log(
      `initial date: ${raw.Date} does next date ${nextDate} exists: ${exists} missing days: ${counter}`,
    );
    tempMonthIs = { ...monthIs };
  });

  console.log('filledMap', filledMap);

  console.log('----sorted----');

  var mapAsc = new Map(
    [...filledMap.entries()].sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      const splittedA = a[0].split('-');
      const splittedB = b[0].split('-');
      const DateA = new Date(splittedA[1] + '-' + splittedA[0] + '-' + splittedA[2]);
      const DateB = new Date(splittedB[1] + '-' + splittedB[0] + '-' + splittedB[2]);
      // console.log('DateA', DateA);
      return DateA - DateB;
    }),
  );

  console.log(mapAsc);
  convertMapToArray(mapAsc);
};

export default detectMissingValues;
