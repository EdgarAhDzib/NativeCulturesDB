const mongoose = require('mongoose');

// Create a schema class
var Schema = mongoose.Schema;

const Culture = new mongoose.Schema({
	group_name : String,
	alt_name : String,
	region : String,
	country_one : String,
	country_two : String,
	items: [{
	    // Store ObjectIds in the array
	    type: Schema.Types.ObjectId,
	    ref: "item_index"
	}]
});

module.exports = mongoose.model('native_group', Culture);
