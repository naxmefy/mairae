var os                      = require('os');
var sys                     = require('sys');
var path                    = require('path');
var fs                      = require('fs');
var express                 = require('express');
var session                 = require('express-session');
var livereload              = require('express-livereload');
var mongoose                = require('mongoose');
var mongoStore              = require('connect-mongo');
var mongooseSchemaExtend    = require('mongoose-schema-extend');
var passport                = require('passport');
var bcrypt                  = require('bcrypt');
var passportLocal           = require('passport-local');
var morgan                  = require('morgan');
var bodyParser              = require('body-parser');
var cookieParser            = require('cookie-parser');
var favicon                 = require('serve-favicon');
var methodOverride          = require('method-override');
var flash                   = require('connect-flash');
var _                       = require('lodash');
var stylus                  = require('stylus');

module.exports = {
  os: os,
  sys: sys,
  path: path,
  fs: fs,
  express: express,
  session: session,
  livereload: livereload,
  mongoose: mongoose,
  mongoStore: mongoStore,
  mongooseSchemaExtend: mongooseSchemaExtend,
  passport: passport,
  bcrypt: bcrypt,
  passportLocal: passportLocal,
  morgan: morgan,
  bodyParser: bodyParser,
  cookieParser: cookieParser,
  favicon: favicon,
  methodOverride: methodOverride,
  flash: flash,
  _: _,
  stylus: stylus
};