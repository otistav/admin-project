const log4js = require('log4js');

log4js.configure({
  appenders: { debug: { type: 'file', filename: 'debug.log' } },
  categories: { default: { appenders: ['debug'], level: 'trace' } }
});

const logger = log4js.getLogger('debug');


module.exports = logger;