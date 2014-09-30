var log = require('../../Logger')('base_schema_activity');
var extend = require('mongoose-schema-extend');

var DatesSchema = require('./dates');

var ActivitySchema = DatesSchema.extend({
  title: {
    type: String,
    required: true
  },
  description: String
});

module.exports = ActivitySchema;