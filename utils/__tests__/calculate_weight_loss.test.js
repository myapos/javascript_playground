import calculate_weight_loss from '../calculate_weight_loss';
import { rawData } from './__data__/rawData';
import { dates } from './__data__/dates';
import { bigDataSet } from './__data__/bigDataSet';
import { bigDateSet } from './__data__/bigDateSet';
describe('calculate weight loss graph values', () => {
  it('to should calculate midsX, midsY of graphs and filledValues, filledDates', () => {
    const { midsX, midsY, filledDates, filledValues } = calculate_weight_loss(rawData, dates);

    expect(midsX).toMatchSnapshot();
    expect(midsY).toMatchSnapshot();
    expect(filledDates).toMatchSnapshot();
    expect(filledValues).toMatchSnapshot();
  });

  it('to should calculate midsX, midsY of graphs and filledValues, filledDates with big dataSets', () => {
    const { midsX, midsY, filledDates, filledValues } = calculate_weight_loss(
      bigDataSet,
      bigDateSet,
    );

    expect(midsX).toMatchSnapshot();
    expect(midsY).toMatchSnapshot();
    expect(filledDates).toMatchSnapshot();
    expect(filledValues).toMatchSnapshot();
  });
});
