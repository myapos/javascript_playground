import addMean from '../addMean';

describe('addMean', () => {
  it('to calculate mean and gather values to midsY and midsX arrays', () => {
    const midsY = [];
    const midsX = [];
    const slice = [1, 2, 3, 4, 5];
    const range = '06-09-2020 to Today';

    const mean = addMean({ slice, midsX, midsY, range });
    // console.log('mean', mean, midsX, midsY);

    expect(mean).toBe(3);
    expect(midsX).toHaveLength(1);
    expect(midsY).toHaveLength(1);
    expect(midsY[0]).toBe(3);
    expect(midsX[0]).toBe('06-09-2020 to Today');
  });
});
