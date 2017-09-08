const express = require('express');
const router = express.Router();

const Media = require('../models/media');

router.get('/media/:id', (req, res) => {
	Media.find({content_id: req.params.id}, (err, results) =>{
		res.json(results);
	});
});

router.post('/updatemedia', (req, res) => {
	Media.findOneAndUpdate({_id:req.body.id}, {$set: req.body.body}, function(err,result){
		if (err) { console.log(err); }
	});
});

router.post('/addmedia', (req, res) => {
	console.log(req.body.base64);
	console.log(req.body.name);
	var image = req.body.base64;
	var data = image.replace(/^data:image\/\w+;base64,/, '');
	fs.writeFile('./imageuploads/' + req.body.name, data, {encoding: 'base64'}, function(err){
		console.log(err);
	});
});

module.exports = router;