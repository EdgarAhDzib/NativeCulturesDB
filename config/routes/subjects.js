const express = require('express');
const router = express.Router();

const Subject = require('../models/subjects');

router.get('/subjects/:id', (req, res)=>{
	Subject.findOne({name: req.params.id})
	.populate("items")
	.exec(function(err, doc){
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

// See the browse routes in cultures.js
router.get('/subjbrowse/:id', (req, res) => {
	if (req.params.id != "" && req.params.id != null) {
		Subject.find({name: new RegExp('^'+req.params.id, "i")}, (err, results) =>{
			res.json(results);
		});
	}
});

router.get('/subjbrowse/', (req, res) => {
	// Do nothing
});

module.exports = router;