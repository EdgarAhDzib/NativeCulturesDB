const express = require('express')
const router = express.Router();
const passport = require('passport');

const Culture = require('../models/cultures');
const User = require('../models/user');

router.get('/cultures', (req, res) => {
	Culture.find({}, null, {sort: {group_name: 1}}, (err, results) => {
		res.json(results);
	});
});

router.get('/langfamilies', (req, res) => {
	Culture.find().distinct('prim_family', (err, results) => {
		res.json(results);
	});
});

router.get('/langgroup/:name', (req, res) => {
	Culture.find({prim_family: req.params.name}, (err, results) => {
		res.json(results);
	});
});

router.get('/culture/:id', (req, res) => {
	Culture.findOne({group_name: req.params.id})
	.populate("items")
	.exec(function(error, doc){
		if (error) {
			console.log(error);
		} else {
			res.json(doc);
		}
	});
});

router.get('/culturebrowse/:id', (req, res) => {
	if (req.params.id != "" && req.params.id != null) {
		Culture.find({group_name: new RegExp('^'+req.params.id, "i")}, (err, results) =>{
			res.json(results);
		});
	}
});

router.get('/culturesbyuser/', (req, res) => {
	if (!req.isAuthenticated() || !req.hasOwnProperty("user")) {
		return;
	}
	console.log(req.user._id);
	// Query for user by id, the groups property not accessed properly from req.user object
});

router.get('/culturebrowse/', (req, res) => {
	// Do nothing
});

module.exports = router;