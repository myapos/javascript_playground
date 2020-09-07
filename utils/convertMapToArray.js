const convertMapToArray = (myMap) => {
  const ar = [];
  for (let [key, value] of myMap) {
    // console.log(key + ' = ' + JSON.stringify(value));
    ar.push({
      Date: key,
      Kgrs: value.Kgrs,
      month: value.month,
      order: value.order,
      filled: value.filled,
    });
  }
  // console.log('converted array:', JSON.stringify(ar, null, 2));
  // console.log('converted array:', ar);

  return ar;
};

export default convertMapToArray;
