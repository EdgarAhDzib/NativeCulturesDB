const express = require('express');
const router = express.Router();

const Source = require('../models/sources');

router.get('/source/:id', (req, res) =>{
	Source.find({content_id: req.params.id}, (err, result)=>{
		res.json(result);
	});
});

router.post('/updatesource', (req, res) => {
	Source.findOneAndUpdate({_id:req.body.id}, {$set: req.body.body}, function(err,result){
		if (err) { console.log(err); }
	});
});

module.exports = router;