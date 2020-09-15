import convertToTimestamps from '../convertToTimestamps';
import createDate from '../createDate';
import { dates } from './__data__/dates';
describe('convertToTimestamps', () => {
  console.log('dates', dates);
  it('should get an array with Date instances and return an array with timestamps', () => {
    const expectedTimestamps = [
      1584136800,
      1588453200,
      1589230800,
      1589749200,
      1589835600,
      1589922000,
      1590008400,
      1590094800,
      1590181200,
      1590267600,
      1590354000,
      1590440400,
    ];
    const toDates = dates.map((d) => createDate(d));

    const convertedDates = convertToTimestamps(toDates);
    expect(convertedDates).toEqual(expectedTimestamps);
  });
});
