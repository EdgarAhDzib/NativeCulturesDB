const mongoose = require('mongoose');

// Create a schema class
var Schema = mongoose.Schema;

const Subject = new mongoose.Schema({
	name : String,
	main_topic : String,
	subtopic : String,
	items: [{
	    // Store ObjectIds in the array
	    type: Schema.Types.ObjectId,
	    ref: "item_index"
	}]
});

module.exports = mongoose.model('ethn_field', Subject);
