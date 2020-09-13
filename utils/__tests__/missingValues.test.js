import missingValues from '../missingValues';
import { rawData } from './__data__/rawData';
import { dates } from './__data__/dates';

describe('missingValues', () => {
  it('should fill missing values with the previous existing value', () => {
    const mockDate = new Date('2020-09-12T10:20:30Z');
    const filledValues = missingValues({ rawData, dates, mode: 'forward', currentDate: mockDate });
    expect(filledValues).toMatchSnapshot();
  });
});
