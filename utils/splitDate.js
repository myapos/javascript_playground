/* It accepts a date string in forma DD-MM-YYYY and splits it by dash */
const splitDate = (date) => {
  const splitted = date.split('-');

  const day = parseInt(splitted[0]);
  const month = parseInt(splitted[0]);
  const year = parseInt(splitted[2]);

  const rule = isNaN(day) || isNaN(month) || isNaN(year) || splitted.length > 3;
  if (rule) {
    return 'Check the input string. Input has to be in format DD-MM-YYYY with integers';
  }

  return splitted;
};
export default splitDate;
