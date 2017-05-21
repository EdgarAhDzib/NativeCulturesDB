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

module.exports = router;