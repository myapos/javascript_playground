import verboseLog from '../verboseLog';
// create a function into global context for Jest
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

describe('verboseLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log a formatted message', () => {
    const string = 'dummy text';
    verboseLog(string, true);
    expect(global.console.log).toHaveBeenCalled();
    expect(global.console.log).toHaveBeenCalledWith('Logs: ------> ' + string);
  });

  it('should not log anything', () => {
    const text = 'dummy text';
    verboseLog(text);
    expect(global.console.log).not.toHaveBeenCalled();
  });
});
