import dateDiffInDays from '../dateDiffInDays';

describe('datediffInDays it should calcualte the difference between two dates', () => {
  it('should calculate difference of 2 days', () => {
    let a = '02-08-2020';
    let b = '04-08-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual(2);
  });

  it('should calculate difference of 2 days', () => {
    let a = '04-08-2020';
    let b = '02-08-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual(2);
  });

  it('should calculate difference of 10 days', () => {
    let a = '11-08-2020';
    let b = '01-08-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual(10);
  });

  it('should calculate difference of 2 days', () => {
    let a = '31-08-2020';
    let b = '02-09-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual(2);
  });

  it('should detect invalid dates', () => {
    let a = '35-08-2020';
    let b = '40-09-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual('Invalid Input');
  });

  it('should detect invalid dates in a', () => {
    let a = '35-08-2020';
    let b = '01-09-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual('Invalid Input');
  });

  it('should detect invalid dates in b', () => {
    let a = '01-08-2020';
    let b = '45-09-2020';

    const diff = dateDiffInDays(a, b);

    expect(diff).toEqual('Invalid Input');
  });
});
