import missingValues from '../missingValues';
import { rawData } from './__data__/rawData';
import { dates } from './__data__/dates';

describe('missingValues', () => {
  it('should fill missing values with the previous existing value', () => {
    const filledValues = missingValues(rawData, dates, 'forward');
    expect(filledValues).toMatchSnapshot();
  });
});
