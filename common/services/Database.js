var log = require("../Logger")("service_database");

log("Load Requirements");

var mongoose = require("mongoose");

log("Setup Database Holder");

var database = null;

log("Setup Retry Counter");

var counter = 0;

var connectWithRetry = function(conf, cb) {
  database = mongoose.connect(conf.db, function(err) {
    if (err) {
      log("[Try: " + counter + "]Failed to connect to mongo on startup - retrying in 5 sec", err);
      counter++;
      if (counter > conf.max_retries) {
        if (cb !== null) {
          cb(err);
        }
      }
      setTimeout((function() {
        connectWithRetry(conf, cb);
      }), 5000);
    } else {
      log("Successfully connected to mongo");
      if (cb !== null) {
        cb(null);
      }
    }
  });
};

module.exports = function(conf, cb) {
  log(conf);
  if (database === null) {
    log("Init Database");
    connectWithRetry(conf, cb);
  } else {
    log("Found Database Connection");
    if (cb !== null) {
      cb(null);
    }
    database;
  }
};