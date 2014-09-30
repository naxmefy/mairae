var log = require("../Logger")("service_database");

log("Load Requirements");

var mongoose = require("mongoose");

log("Setup Database Holder");

var database = null;

log("Setup Retry Counter");

var counter = 0;

var connectWithRetry = function(conf, cb) {
  database = mongoose.connect(conf.mongodb, function(err) {
    if (err) {
      log("[Try: " + counter + "]Failed to connect to mongo on startup - retrying in 5 sec", err);
      counter++;
      if (counter > conf.mongodb_max_retries) {
        if ((typeof cb !== "undefined" && cb !== null)) {
          cb(err);
        }
      }
      setTimeout((function() {
        connectWithRetry(conf, cb);
      }), 5000);
    } else {
      log("Successfully connected to mongo");
      if ((typeof cb !== "undefined" && cb !== null)) {
        cb(null);
      }
    }
  });

  return database;
};

module.exports = function(conf, cb) {
  if (database === null) {
    log("Init Database");
    log(conf);
    return connectWithRetry(conf, cb);
  } else {
    log("Found Database Connection");
    if ((typeof cb !== "undefined" && cb !== null)) {
      cb(null);
    }
    return database;
  }
};