const express = require('express')
const router = express.Router();

const Culture = require('../models/cultures');

router.get('/cultures', (req, res) => {
	Culture.find({}, (err, results) => {
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

module.exports = router;