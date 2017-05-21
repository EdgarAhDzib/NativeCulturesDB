const express = require('express');
const router = express.Router();

const Media = require('../models/media');

router.get('/media/:id', (req, res) => {
	Media.find({content_id: req.params.id}, (err, results) =>{
		res.json(results);
	});
});

module.exports = router;