/* Command: npm start verbose */
var mode = process.argv.slice(2)[0];

const verboseLog = (string, testMode) => {
  if (mode === 'verbose' || testMode) {
    console.log('Logs: ------> ' + string);
  }
};

export default verboseLog;
