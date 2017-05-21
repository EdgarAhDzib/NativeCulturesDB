const mongoose = require('mongoose');

/*
// Original Schema
const Field = new mongoose.Schema({
	content_id : Number,
	ethn_id : String,
});

module.exports = mongoose.model('content_field', Field);
*/

// Create a schema class
var Schema = mongoose.Schema;

// Create the Field schema
var FieldSchema = new Schema({
  // Just a number
  content_id: {
    type: Number
  },
  // Just a string
  ethn_id: {
    type: String
  }
});

// Create the Field model with the FieldSchema
var Field = mongoose.model("content_field", FieldSchema);

// Export the Field model
module.exports = Field;