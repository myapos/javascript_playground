const sum = (...arr) => {
  const test = [...arr];
  console.log('test', test);
  if (arr.length > 0) {
    return [...arr].reduce((acc, val) => acc + val, 0);
  } else return 0;
};
export default sum;
