import createDate from '../createDate';

describe('createDate ', () => {
  it('it should create a new Date instance from a string formatted in DD-MM-YYYY', () => {
    let a = '02-08-2020';
    let expected = new Date('08-02-2020');

    const date = createDate(a);

    expect(date).toEqual(expected);
  });
});
