const express = require('express');
const router = express.Router();

const Source = require('../models/sources');

router.get('/source/:id', (req, res) =>{
	Source.find({content_id: req.params.id}, (err, result)=>{
		res.json(result);
	});
});

module.exports = router;