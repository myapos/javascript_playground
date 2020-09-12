import sum from '../sum';

describe('sum', () => {
  it('to return zero with zero values', () => {
    const ar = [];
    const returned = sum(...ar);

    // console.log('returned', returned);
    expect(returned).toEqual(0);
  });

  it('to return the sum', () => {
    const ar = [1, 2, 3, 4];
    const returned = sum(...ar);

    // console.log('returned', returned);
    expect(returned).toEqual(10);
  });
});
