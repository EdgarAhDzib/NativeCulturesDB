const express = require('express')
const router = express.Router();
// const fs = require("fs");
const passport = require('passport');

const Item_index = require('../models/item');
const Media = require('../models/media');
const Source = require('../models/sources');
const User = require('../models/user');
const Culture = require('../models/cultures');

router.get('/item/:id', (req, res) => {
	Item_index.findOne({_id: req.params.id})
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

router.get('/randitem/', (req, res) => {
	Item_index.count().exec(function(err, count){

		var random = Math.floor(Math.random() * count);
		Item_index.findOne().skip(random)
		// Populate all of its associated fields
		.populate("fields")
		.populate("media")
		.populate("source_refs")
		.exec(
		function (err, doc) {
			// Log any errors
			if (err) {
				console.log(err);
			}
			// Otherwise, send the doc to the browser as a json object
			else {
				res.json(doc);
			}
		});

	});
});

router.post('/search', (req, res) => {
	var query = {$text: { $search: req.body.keywords }};
	// If _id posted into body, exclude from search results
	if (req.body.hasOwnProperty("_id")) {
		query["_id"] = { $ne: req.body._id };
	}
	Item_index.find( query, { score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } )
	.exec(function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			res.json(doc);
		}
	});
});

router.post('/additem', (req, res) => {
	/*
	console.log(req.body.body.culture);
	console.log(req.body.body.maindesc);
	console.log(req.body.body.museum);
	console.log(req.body.body.primdoc);
	console.log(req.body.body.sourceURL);
	console.log(req.body.body.title);
	console.log(req.body.body.youtube);
	console.log(req.body.body.fileOne);
	console.log(req.body.body.fileTwo);
	console.log(req.body.body.fileThree);
	console.log(req.body.body.fileFour);
	*/
	// If user not logged in, prevent post
	if (!req.isAuthenticated() || !req.hasOwnProperty("user")) {
		return;
	}
	// Prevent action if logged in user not activated
	if (!req.user.active) {
		return;
	}

	var fileOne = req.body.body.fileOne;
	var fileTwo = req.body.body.fileTwo;
	var fileThree = req.body.body.fileThree;
	var fileFour = req.body.body.fileFour;
	var thumbOneUrl = req.body.body.thumb1;
	var thumbTwoUrl = req.body.body.thumb2;
	var thumbThreeUrl = req.body.body.thumb3;
	var thumbFourUrl = req.body.body.thumb4;

	// Initialize the media object values to blank, then assign full paths as they occur
	var newFileOnePath = "";
	var newFileTwoPath = "";
	var newFileThreePath = "";
	var newFileFourPath = "";

	var ifImgFile = new RegExp(/^data:image\/\w+;base64,/);
	// REDO: Ensure that the strings are properly processed or at least set with default blank "" for the img_ref media properties
	// fs package deprecated, must be replaced
	/*
	if(ifImgFile.test(thumbOneUrl)) {
		newFileOnePath = 'assets/images/' + (new Date()).getTime() + "." + fileOne;
		var dataOne = thumbOneUrl.replace(/^data:image\/\w+;base64,/, '');
		// WORKS: file sent to public/assets/images
		fs.writeFile('./public/' + newFileOnePath, dataOne, {encoding: 'base64'}, function(err){
			console.log(err);
		});
	}
	if(ifImgFile.test(thumbTwoUrl)) {
		newFileTwoPath = 'assets/images/' + (new Date()).getTime() + "." + fileTwo;
		var dataTwo = thumbTwoUrl.replace(/^data:image\/\w+;base64,/, '');
		fs.writeFile('./' + newFileTwoPath, dataTwo, {encoding: 'base64'}, function(err){
			console.log(err);
		});
	}

	if(ifImgFile.test(thumbThreeUrl)) {
		newFileThreePath = 'assets/images/' + (new Date()).getTime() + "." + fileThree;
		var dataThree = thumbThreeUrl.replace(/^data:image\/\w+;base64,/, '');
		fs.writeFile('./' + newFileThreePath, dataThree, {encoding: 'base64'}, function(err){
			console.log(err);
		});
	}

	if(ifImgFile.test(thumbFourUrl)) {
		newFileFourPath = 'assets/images/' + (new Date()).getTime() + "." + fileFour;
		var dataFour = thumbFourUrl.replace(/^data:image\/\w+;base64,/, '');
		fs.writeFile('./' + newFileFourPath, dataFour, {encoding: 'base64'}, function(err){
			console.log(err);
		});
	}
	*/

	var Media_content = new Media({
		youtube: req.body.body.youtube,
		img_ref_1: newFileOnePath,
		img_ref_2: newFileTwoPath,
		img_ref_3: newFileThreePath,
		img_ref_4: newFileFourPath,
		museum: req.body.body.museum
	});

	var Sources = new Source({
		author: "Edgar Martin del Campo",
		url: req.body.body.sourceURL,
		contributor: req.user.firstName + " " + req.user.lastName
	});

	var Item = new Item_index({
		item_title: req.body.body.title,
		group: req.body.body.culture,
		main_desc: req.body.body.maindesc,
		prim_doc: req.body.body.primdoc,
		fields: [],
		media: [],
		source_refs: []
	});

	var itemInsertId = "";

	Item.save(function(error, doc){
		if (error) { console.log(error); }
		else {
			console.log(doc);
			itemInsertId = doc._id;
			// Then forward to the item with the new _id
			console.log("Insert _id is ", itemInsertId);

			Media_content.save(function(error, doc){
				if (error) { console.log(error); }
				else {
					Item_index.findOneAndUpdate({"_id": itemInsertId}, { $push: { "media" : doc._id } }, {new: true}).
					exec(function(err, itemDoc){
						if (err) { console.log(err); }
						else {}
					});
				}
			});

			Sources.save(function(error, doc){
				if (error) { console.log(error); }
				else {
					Item_index.findOneAndUpdate({"_id": itemInsertId}, { $push: { "source_refs" : doc._id } }, {new: true}).
					exec(function(err, itemDoc){
						if (err) { console.log(err); }
						else {}
					});
				}
			});
			// Push item _id to user's document
			User.findOneAndUpdate({"_id": req.user._id}, { $push: { "items" : itemInsertId } }, {new: true}).
			exec(function(err, itemDoc){
				if (err) { console.log(err); }
				else {}
			});
		}
	});
	// Then res.redirect(), to prevent post refresh --> Ideally, get the newly stored item by querying on its _id, cf. router.get('/item/:id') above
	// If insertId is still blank, redirect to '/' but provide an ERROR message! Otherwise, if _id is proper, display the new item
	res.redirect('/');
	return;
/*
	var image = req.body.base64;
	var data = image.replace(/^data:image\/\w+;base64,/, '');
	fs.writeFile('./assets/images/' + req.body.name, data, {encoding: 'base64'}, function(err){
		console.log(err);
	});
*/
	
});

router.post('/updateitem', (req, res) => {
	// Add check on user's available cultures: cannot update to an unavailable group
	Item_index.findOneAndUpdate({_id:req.body.id}, {$set: req.body.body}, function(err,result){
		if (err) { console.log(err); }
	});
	Item_index.findOne({_id:req.body.id})
	.populate("fields")
	.populate("media")
	.populate("source_refs")
	.exec(
	function (err, doc) {
		// Log any errors
		if (err) {
			console.log(err);
		}
		// Otherwise, send the doc to the browser as a json object
		else {
			// console.log(doc);
			// Also update the culture collection: remove previous association and assign the new one, even if in same group
			Culture.update({group_name:doc.group}, {$pull: { items: req.body.id } }, function(err,result){
				if (err) { console.log(err); }
			});
			Culture.update({group_name:req.body.body.group}, {$push: { items: req.body.id } }, function(err,result){
				if (err) { console.log(err); }
			});
			res.json(doc);
		}
	});
	// Then redirect, to prevent further processing attempts from post
	// res.redirect('/');
});

module.exports = router;