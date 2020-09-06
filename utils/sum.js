const sum = (...arr) => {
  return [...arr].reduce((acc, val) => acc + val, 0);
};
export default sum;
