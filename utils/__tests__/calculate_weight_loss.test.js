import calculate_weight_loss from '../calculate_weight_loss';
import { rawData } from './__data__/rawData';
import { dates } from './__data__/dates';
import { bigDataSet } from './__data__/bigDataSet';
import { bigDateSet } from './__data__/bigDateSet';
describe('calculate weight loss graph values', () => {
  it('to should calculate midsX, midsY of graphs and filledValues, filledDates', () => {
    const mockDate = new Date('2020-09-12T10:20:30Z');
    const { midsX, midsY, filledDates, filledValues } = calculate_weight_loss({
      rawData,
      dates,
      currentDate: mockDate,
    });

    expect(midsX).toMatchSnapshot();
    expect(midsY).toMatchSnapshot();
    expect(filledDates).toMatchSnapshot();
    expect(filledValues).toMatchSnapshot();
  });

  it('to should calculate midsX, midsY of graphs and filledValues, filledDates with big dataSets', () => {
    const mockDate = new Date('2020-09-12T10:20:30Z');
    const { midsX, midsY, filledDates, filledValues } = calculate_weight_loss({
      rawData: bigDataSet,
      dates: bigDateSet,
      currentDate: mockDate,
    });

    // expect(spyDate).toHaveBeenCalled();
    expect(midsX).toMatchSnapshot();
    expect(midsY).toMatchSnapshot();
    expect(filledDates).toMatchSnapshot();
    expect(filledValues).toMatchSnapshot();
  });
});
