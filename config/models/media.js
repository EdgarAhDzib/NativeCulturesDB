const mongoose = require('mongoose');

const Media = new mongoose.Schema({
	content_id : Number,
	youtube : String,
	img_ref_1 : String,
	img_ref_2 : String,
	img_ref_3 : String,
	img_ref_4 : String,
	museum : String
});

module.exports = mongoose.model('media_source', Media);
