import convertMapToArray from '../convertMapToArray';
import convertArrayToMap from '../convertArrayToMap';
import { rawData } from './__data__/rawData';
describe('convertMapToArray', () => {
  it('will convert array to Map', () => {
    const filledMap = convertArrayToMap(rawData);

    const converted = convertMapToArray(filledMap);
    expect(converted).toMatchSnapshot();
  });
});
