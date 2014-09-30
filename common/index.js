var Logger = exports.Logger = require('./Logger');

var log = Logger('common');

var Modules = exports.Modules = require('./Modules');

var path = Modules.path;

log('Load Common Config');

exports.Config = require('./config');

log('Load Common Loader');

var Loader = exports.Loader = require('./Loader');

log('Load Common Models');

exports.Models = require('./models');

log('Load Common Services');

exports.Services = Loader(path.join(__dirname, 'services'));

log('Load Common Middlewares');

exports.Middlewares = Loader(path.join(__dirname, 'middlewares'));