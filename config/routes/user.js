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
		cultures: []
	});
	NewUser.save(function(error, doc){
		if (error) {
			console.log(error);
			res.redirect('/');
		}
		else {
			itemInsertId = doc._id;
			// Then send properties forward to User page
			// Redo: some properties will be sent with the '/user' route
			var sendObj = {
				firstName: firstName,
				lastName: lastName,
				username: username,
				accessLevel: 5,
				active: false,
				items: [],
				cultures: [],
				loggedIn: true
			};
			res.json(sendObj);
		}
	});
	// Redirect and return after post, to prevent duplication
	return;
});

router.get('/user', (req, res) => {
	if (req.isAuthenticated()) {
		User.findOne({_id:req.user._id})
		.populate("items")
		.exec(function(error, doc){
			if (error) {
				console.log(error);
			} else {
				// console.log(doc);
				// Do not send the password or any other sensitive properties
				var sendObj = {
					firstName: doc.firstName,
					lastName: doc.lastName,
					username: doc.username,
					lastLogin: doc.lastLogin,
					accessLevel: doc.accessLevel,
					active: doc.active,
					cultures: doc.cultures,
					items: doc.items
				}
				res.json(sendObj);
			}
		});
	}
	return;
});

module.exports = router;