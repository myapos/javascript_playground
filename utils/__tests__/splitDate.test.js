import splitDate from '../splitDate';

describe('splitDate', () => {
  it('to return a value of three elements', () => {
    const date = '03-05-2020';
    const returned = splitDate(date);
    expect(returned).toHaveLength(3);
  });

  it('zero length string as input', () => {
    const date = '';
    const returned = splitDate(date);
    expect(returned).toBe(
      'Check the input string. Input has to be in format DD-MM-YYYY with integers',
    );
  });

  it('string with no numbers as input', () => {
    const date = '2020-sdf';
    const returned = splitDate(date);
    expect(returned).toBe(
      'Check the input string. Input has to be in format DD-MM-YYYY with integers',
    );
  });

  it('string with various length as input', () => {
    const date = '2020-sdf-fdsfd-sdf-1223123';
    const returned = splitDate(date);
    expect(returned).toBe(
      'Check the input string. Input has to be in format DD-MM-YYYY with integers',
    );
  });
});
