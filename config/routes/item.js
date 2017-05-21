const express = require('express')
const router = express.Router();

const Item_index = require('../models/item');

router.get('/item/:id', (req, res) => {
	Item_index.find({id: req.params.id}, (err, results) => {
		res.json(results);
	});
});

module.exports = router;