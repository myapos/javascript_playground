import prettyValue from './prettyValue';

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

export default nextDateExists;
