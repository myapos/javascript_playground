/* Command: npm start verbose */
var mode = process.argv.slice(2)[0];
const verboseLog = (string) => {
  if (mode === 'verbose') {
    console.log(string);
  }
};

export default verboseLog;
