/** Accepts a timestamp and converts to date  */
const toDate = (timestamp) => {
  return new Date(timestamp * 1000);
};

export default toDate;
