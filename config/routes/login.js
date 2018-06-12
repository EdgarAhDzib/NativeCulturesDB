const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

var User = require("../models/user");

passport.use(new LocalStrategy({
		usernameField: 'email',
	},
	function(email, password, done) {
		User.getUserName(email, function(err, user) {
			if (err) throw err;
			if (!user) {
				// Ideal to indicate "one OR other", to prevent confirmation of either
				return done(null, false, {message: "Invalid email or password"} );
			}

			User.passWord(password, user.password, function(err, match) {
				if (err) throw err;
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, {message: "Invalid email or password"} );
				};
			});
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findUserById(id, function(err, user) {
		done(err, user);
	});
});

// Works
router.post("/login", passport.authenticate("local",{ successRedirect: '/success', failureRedirect: '/fail', failureFlash: true }),
	function(req,res){
	}
);

router.get("/success",  (req, res) => {
	// console.log("Success route");
	if (req.isAuthenticated()) {
		console.log("Success login");
		// Update user's login date
		User.findOneAndUpdate({_id:req.user._id}, {$set: {lastLogin: Date.now()}}, function(err,result){
			if (err) { console.log(err); }
		});
		// console.log("Logged in, send JSON content");
		// Send properties
		var sendObj = {
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			username: req.user.username,
			accessLevel: req.user.accessLevel,
			active: req.user.active,
			items: req.user.items,
			cultures: req.user.cultures,
			loggedIn: true
		};
		res.json(sendObj);
		return;
	} else {
		console.log("Login failed, do nothing");
		res.json({ loggedIn: false });
		return;
	}
});

router.get("/fail",  (req, res) => {
	// console.log("Fail route");
	// Clear the session on fail
	req.logout();
	req.flash("success_msg", "Logout successful");
	res.json("false");
	return;
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "Logout successful");
	if (req.isAuthenticated()) {
		// console.log("Still logged in");
		res.json("true from logout");
	} else {
		// console.log("Logged out");
		res.json("false");
	}
	return;
});

module.exports = router;