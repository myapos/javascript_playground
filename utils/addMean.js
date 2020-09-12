import sum from './sum';

/**
 * It accepts an array with values calculates the mean value of the values of the array. The mean is added to the
 * midsY. midsY and midsX are passed by reference and they used to gather the mean and the range values
 */
const addMean = ({ slice, midsX, midsY, range }) => {
  // export values from slice objects
  const sliceValues = slice.map((item) => parseFloat(item));

  const sumSlice = sum(...sliceValues);
  const mean = sumSlice / slice.length;
  // console.log('sumSlice', sumSlice, 'mean', mean, ' length', slice.length);
  // midsY.push({ mean, range });
  midsY.push(mean);
  midsX.push(range);
  return mean;
};

export default addMean;
