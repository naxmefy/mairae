var debug;

debug = require('debug');

module.exports = function(loggerName) {
  if (!loggerName) {
    loggerName = 'mairae';
  }
  return debug('mairae:' + loggerName);
};