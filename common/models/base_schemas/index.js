var log = require('../../Logger')('base_schemas');
var Loader = require('../../Loader');
var path = require('path');

log('Init Base Schemas');

var files = Loader(__dirname, {
  excluded: ['index.js'],
  recursive: false
});

module.exports = files;

