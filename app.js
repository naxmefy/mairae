// Clear Console if it is possible
if (process.stdout.isTTY) {
  var i, lines, _i;

  lines = process.stdout.getWindowSize()[1];

  for (i = _i = 0; 0 <= lines ? _i < lines : _i > lines; i = 0 <= lines ? ++_i : --_i) {
    console.log('\r\n');
  }
}

// ==== Common
var common = require('./common');
process.env.COMMON = common.Modules.path.join(__dirname, 'common');

// ==== Logger
var log = common.Logger();

// ==== Manager
log('Load Manager');
var manager = require('./manager')(common);

// ==== Server
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// ==== Setup Port / SSLPort
var port = process.env.PORT || 3000;
var sslport = process.env.SSLPORT || 3001;

// ==== Init App
var app = express();

// ==== Add Sub Apps
app.use(manager);

// ==== Init HTTP server
var httpServer = http.createServer(app);

// ==== Listen HTTP Server
httpServer.listen(port);
log('HTTP Listen on Port ' + port);

// ==== HTTPS Options
var options = {

};
log("SSLKEY: " + process.env.SSLKEY);
log("SSLCERT: " + process.env.SSLCERT);
if (process.env.SSLKEY && process.env.SSLCERT) {
  options.key = fs.readFileSync(process.env.SSLKEY);
  options.cert = fs.readFileSync(process.env.SSLCERT);
}

// ==== HTTPS Server if HTTPS Options available
if (options.key && options.cert) {
  https.createServer(options, app).listen(sslport);
  log('HTTPS Listen on Port ' + sslport);
}