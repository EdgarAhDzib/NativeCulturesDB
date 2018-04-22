const express = require('express')
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/newuser/', (req, res) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var salt = bcrypt.genSaltSync(5);
	var hash = bcrypt.hashSync(password, salt);
	var NewUser = new User({
		firstName: firstName,
		lastName: lastName,
		username: username,
		email: email,
		password: hash,
		lastLogin: Date.now(),
		accessLevel: 5,
		active: false, // Authorized user of higher rank will activate account upon approval
		items: [],
		groups: []
	});
	NewUser.save(function(error, doc){
		if (error) {
			console.log(error);
			res.redirect('/');
		}
		else {
			itemInsertId = doc._id;
			// Then forward the welcome message with instructions
			res.json({ firstName:firstName, lastName:lastName });
		}
	});
	// Log the user in

	// Redirect and return after post, to prevent duplication
	return;
});

module.exports = router;