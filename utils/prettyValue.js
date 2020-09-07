/* It adds a zero if value is smaller than ten. This will help to keep unique values in Map */
const prettyValue = (value) => {
  let pretty = parseFloat(value);
  if (pretty < 10) {
    pretty = `0${pretty}`;
  }
  return pretty;
};

export default prettyValue;
