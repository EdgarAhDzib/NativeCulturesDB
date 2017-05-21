const mongoose = require('mongoose');

const Source_ref = new mongoose.Schema({
	content_id : Number,
	author : String,
	url : String,
	contributor : String,
	user_id : String,
	publication : String
});

module.exports = mongoose.model('source_ref', Source_ref);
