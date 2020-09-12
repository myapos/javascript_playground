import convertArrayToMap from '../convertArrayToMap';
import { rawData } from './__data__/rawData';
describe('convertArrayToMap', () => {
  it('will convert array to Map', () => {
    const filledMap = convertArrayToMap(rawData);
    expect(filledMap).toMatchSnapshot();
  });
});
