/**
 * It  will get an array and a property and it will return an object
 * of grouped arrays by prop
 * @param {*} ar
 * @param {*} prop
 * Example of output 
 * March: [
    { Date: '14-03-2020', Kgrs: '108', filled: false, month: 'March' },
    { Date: '18-03-2020', Kgrs: '107', filled: false, month: 'March' }
  ],
  May: [
    { Date: '03-05-2020', Kgrs: '104,9', filled: false, month: 'May' },
    ...
  ], ...
 */
const groupByProperty = (ar, prop) => {
  const grouped = {};

  ar.forEach((item) => {
    if (!grouped[item[prop]]) {
      // create an array with item inside
      grouped[item[prop]] = [item];
    } else {
      // push it
      grouped[item[prop]].push(item);
    }
  });

  return grouped;
};

export default groupByProperty;
