const express = require('express')
const router = express.Router();

const Content_field = require('../models/content_fields');

router.get('/contents/:id', (req, res) => {
	Content_field.find({content_id: req.params.id}, (err, results) => {
		res.json(results);
	});
});

module.exports = router;