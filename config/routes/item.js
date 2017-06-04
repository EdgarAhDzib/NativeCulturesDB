const express = require('express')
const router = express.Router();

const Item_index = require('../models/item');

router.get('/item/:id', (req, res) => {
	Item_index.findOne({id: req.params.id})
		// Populate all of its associated fields
	.populate("fields")
	.populate("media")
	.populate("source_refs")
	// now, execute our query
	.exec(function(error, doc) {
		// Log any errors
		if (error) {
			console.log(error);
		}
		// Otherwise, send the doc to the browser as a json object
		else {
			res.json(doc);
		}
	});
});

router.post('/search/:keywords', (req, res) => {
	Item_index.find( { $text: { $search: req.params.keywords } }, { score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } ).limit(10)
	.exec(function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			res.json(doc);
		}
	});
});

module.exports = router;