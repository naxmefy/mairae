var log = require('../../Logger')('schema_user');
var extend = require('mongoose-schema-extend');

var base_schemas = require('../base_schemas');
var DatesSchema = base_schemas.dates;
var ActivitySchema = base_schemas.activity;

log('Init UserSchema')
var UserSchema = DatesSchema.extend({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  name: String,
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  activities: [ActivitySchema]
});

log('Setup Pre Save');
UserSchema.pre('save', function (next) {
  var common = require(process.env.COMMON);
  var bcrypt = common.Modules.bcrypt;
  var user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(common.Config.security.salt_factor, function (err, salt) {
    if(err) {
      return err;
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if(err) {
        return err;
      }
      user.password = hash;
      return next();
    });
  });
});

log('Setup Static Methods');
UserSchema.statics = {
  loadById: function(id, cb) {
    this.findOne({_id: id}).exec(cb);
  },

  loadByEmailOrUsername: function(login, cb) {
    this.loadByEmailOrUsernameWithPassword(login, cb, true);
  },

  loadByEmailOrUsernameWithPassword: function(login, cb, noPass) {
    var regexForEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    var regex = new RegExp(["^",login,"$"].join(""),"i");
    var query = {};
    var pass = '';
    if(!noPass) {
      pass = '+password';
    }

    if(regexForEmail.test(login)) {
      query['email'] = regex;
    } else {
      query['username'] = regex;
    }
    
    this.findOne(query, pass).exec(cb);
  }
};

log('Setup Model Methods');
UserSchema.methods = {
  generateRandomToken: function() {
    var chars = '_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var token = new Date().getTime() + '_';

    for(var x = 0; x <= 15; x++) {
      var i = Math.floor(Math.random() * 62);
      token += chars.charAt(i);
    }

    return token;
  },

  validPassword: function (candidatePassword, cb) {
    var common = require(process.env.COMMON);
    var bcrypt = common.Modules.bcrypt;
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if(err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  }
};

log('Export Model');
module.exports = UserSchema;