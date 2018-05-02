const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Require Bcrypt program for password check
const bcrypt = require('bcryptjs');

// Create User schema
const UserSchema = new mongoose.Schema ({
	firstName: String,
	lastName: String,
	username: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String,
	lastLogin: Date,
	accessLevel: Number,
	active: Boolean,
	items: [{
		type: Schema.Types.ObjectId,
		ref: "item_index"
	}],
	cultures: [{
		type: Schema.Types.ObjectId,
		ref: "native_group"
	}]
});

var User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserName = function(email, cb){
	var query = {email: email};
	User.findOne(query, cb);
}

module.exports.passWord = function(passW, value, cb){
	bcrypt.compare(passW, value, (err, res) => { // compares regular PW to hash in DB
		console.log(res); // true or false
		if (res) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	});
}

module.exports.findUserById = function(id, callback) {
	User.findById(id, callback);
}