var os                      = require('os');
var sys                     = require('sys');
var path                    = require('path');
var fs                      = require('fs');
var express                 = require('express');
var livereload              = require('express-livereload');
var mongoose                = require('mongoose');
var mongooseSchemaExtend    = require('mongoose-schema-extend');
var morgan                  = require('morgan');
var bodyParser              = require('body-parser');
var cookieParser            = require('cookie-parser');
var favicon                 = require('serve-favicon');
var stylus                  = require('stylus');

module.exports = {
  os: os,
  sys: sys,
  path: path,
  fs: fs,
  express: express,
  livereload: livereload,
  mongoose: mongoose,
  mongooseSchemaExtend: mongooseSchemaExtend,
  morgan: morgan,
  bodyParser: bodyParser,
  cookieParser: cookieParser,
  favicon: favicon,
  stylus: stylus
};