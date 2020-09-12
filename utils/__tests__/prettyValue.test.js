import prettyValue from '../prettyValue';

describe('prettyValue:adds zeros for number smaller than ten', () => {
  it('should add a zero', () => {
    const number = 5;
    const returned = prettyValue(number);
    expect(returned).toBe('05');
  });
  it('should NOT add a zero', () => {
    const number = 10;
    const returned = prettyValue(number);
    expect(returned).toBe('10');
  });
});
