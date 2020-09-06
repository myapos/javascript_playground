import sum from './sum';

const addMean = ({ slice, midsY, range, midsX }) => {
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
