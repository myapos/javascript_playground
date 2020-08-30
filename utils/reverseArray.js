import { reverse } from 'lodash';

/** It get an array and creates a new one with reversed order
 *
 */
const reverseArray = (ar) => {
  const newAr = [];

  for (let i = ar.length - 1; i >= 0; i--) {
    newAr.push(ar[i]);
  }

  console.log('reversed ar', newAr);
  return newAr;
};

export default reverseArray;
