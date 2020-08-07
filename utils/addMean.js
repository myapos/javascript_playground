import sum from './sum';

const addMean = ({ slice, midsY, range, midsX }) => {
  const sumSlice = sum(...slice);
  const mean = sumSlice / slice.length;
  // console.log('sumSlice', sumSlice, 'mean', mean, ' length', slice.length);
  // midsY.push({ mean, range });
  midsY.push(mean);
  midsX.push(range);
  return mean;
};

export default addMean;
