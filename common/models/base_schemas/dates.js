var log = require('../../Logger')('base_schema_dates');
var Schema = require('mongoose').Schema;

var DatesSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = DatesSchema;