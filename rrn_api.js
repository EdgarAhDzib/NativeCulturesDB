var express = require('express');
var router = express.Router();
// var request = require('request');
const Item_index = require('./config/models/item');
// const Test = require('./config/models/test');
const Tribe = require('./config/models/cultures');
const Media = require('./config/models/media');
const Source = require('./config/models/sources');
const Field = require('./config/models/content_fields');

// Delete items without group name
router.get("/deleteitems", (req, res) => {
	Item_index.find({group:""}).exec(function(error, doc){
		if (error) { console.log(error); }
		else {
			for (let i = 0; i < doc.length; i++) {
				// Delete all associated documents from their respective collections
				Media.deleteMany({_id:doc[i].media[0]}).exec(function(err, result){
					console.log(result);
				});
				Source.deleteMany({_id:doc[i].source_refs[0]}).exec(function(err, result){
					console.log(result);
				});
				for (let j = 0; j < doc[i].fields.length; j++) {
					Field.deleteMany({_id:doc[i].fields[j]}).exec(function(err,result){
						console.log(result);
					});
				}
			}
			res.json(doc);
		}
	});
	// Item_index.deleteMany({group:""}).exec(function(err,doc){});
});

// Repeated with Field, Media, Source models
router.get("/deleteorphans", (req, res) => {
	Source.find({}).exec(function(error, doc){
		if (error) { console.log(error); }
		else {
			for (let i = 0; i < doc.length; i++) {
				Item_index.findOne({source_refs:doc[i]._id}).exec(function(err, match){
					if (err) {console.log(err);}
					else if (match) {
						// console.log("Match");
						// console.log(match);
					}
					else {
						console.log( "Orphan", doc[i]._id);
						Source.deleteOne({_id:doc[i]._id}).exec(function(err,doc){
							if (err) {console.log(err);}
						});
					}
				});
			}
		}
	});
});

router.get("/rrn/:tribe", (req, res) => {
	// culture+Nasca%2C+held+at+MOA%3A+University+of+British+Columbia%2C
	// https://www.rrncommunity.org/items.json?filters=culture+Haida%2C+held+at+Brooklyn+Museum
	var cultureMain = "";
	var cultureAlt = "";

	request('https://www.rrncommunity.org/items.json?per_page=25&filters='+req.params.tribe, function (error, response, body) {
		var allResults = [];
		if (!error && response.statusCode == 200) {
			var results = JSON.parse(body);
			for (let j = 0; j < results.items.length; j++) {
				// Initialize the associative array keys, insert them as blanks if no value assigned: allResults['categ'] = "";
				allResults['item_id'] = results.items[j].id;
				allResults['name'] = results.items[j].name;
				allResults['cultureMain'] = "";
				allResults['cultureAlt']  = "";
				allResults['notes']  = "";
				allResults['main_desc']  = "";
				allResults['long_desc']  = "";
				allResults['context']  = "";
				allResults['research_notes']  = "";
				allResults['display']  = "";
				allResults['prim_doc']  = "";
				allResults['source_ref'] = results.items[j].original_record_url;
				if (results.items[j].cultures.length > 0) {
					if ("name" in results.items[j].cultures[0]) {
						allResults['cultureMain'] = results.items[j].cultures[0].name;
						cultureMain = results.items[j].cultures[0].name;
					}
				}
				if (results.items[j].cultures.length > 1) {
					if ("name" in results.items[j].cultures[1]) {
						allResults['cultureAlt'] = results.items[j].cultures[1].name;
						cultureAlt = results.items[j].cultures[1].name;
					}
				}
				if ("institution_notes" in results.items[j]) {
					for (let k = 0; k < results.items[j].institution_notes.length; k++) {
						switch (results.items[j].institution_notes[k].title) {
							case "Notes" : allResults['notes'] = results.items[j].institution_notes[k].text; break;
							case "Description" : allResults['main_desc'] = results.items[j].institution_notes[k].text; break;
							case "Longer Description" : allResults['long_desc'] = results.items[j].institution_notes[k].text; break;
							case "Context" : allResults['context'] = results.items[j].institution_notes[k].text; break;
							case "Research Notes" : allResults['research_notes'] = results.items[j].institution_notes[k].text; break;
							case "Display History" : allResults['display'] = results.items[j].institution_notes[k].text; break;
							case "Primary Documentation" : allResults['prim_doc'] = results.items[j].institution_notes[k].text; break;
							default: var placeholder = ""; break;
						}
					}
				}
				allResults['start_year'] = "";
				if ("creation_events" in results.items[j]) {
					allResults['start_year'] = results.items[j].creation_events.start_year ? results.items[j].creation_events.start_year: "";
				}
				allResults['subjects'] = [];
				for (let k = 0; k < results.items[j].materials.length; k++) {
					allResults['subjects'].push(results.items[j].materials[k].name);
				}
				for (let k = 0; k < results.items[j].item_types.length; k++) {
					allResults['subjects'].push(results.items[j].item_types[k].name);
				}
				allResults['images'] = [];
				allResults['images']['img_ref_1'] = "";
				allResults['images']['img_ref_2'] = "";
				allResults['images']['img_ref_3'] = "";
				allResults['images']['img_ref_4'] = "";
				allResults['images']['institution'] = results.items[j].holding_institution.name;
				for (let k = 0; k < results.items[j].digital_objects.length; k++) {
					var imgUrl = results.items[j].digital_objects[k].url;
					if (imgUrl.charAt(44) == "3") {
						console.log("This URL has a 3!\n" + imgUrl);
						imgUrl = imgUrl.replace("original","w800h600");
					}
					imgUrl = imgUrl.replace("//","https://");                
					switch (results.items[j].digital_objects[k].order) {
						case 0 :
						allResults['images']['img_ref_1'] = imgUrl;
						break;
						case 1 :
						allResults['images']['img_ref_2'] = imgUrl;
						break;
						case 2 :
						allResults['images']['img_ref_3'] = imgUrl;
						break;
						case 3 :
						allResults['images']['img_ref_4'] = imgUrl;
						break;
						default: break;
					}
				}
				// Convert this array to associative
				var itemArray = [allResults['item_id'], allResults['name'], allResults['cultureMain'], allResults['cultureAlt'], allResults['source_ref'], allResults['start_year'], allResults['notes'], allResults['main_desc'], allResults['long_desc'], allResults['context'], allResults['research_notes'], allResults['display'], allResults['prim_doc'], allResults['subjects'], allResults['images']];
				allResults.push(itemArray);
			} // Closes FOR loop for results
			res.json(results);
		} // Closes condition for connection, error

		// Associate with image and material sources, primary URL
		// Add tribe and subject entries to their collections if they don't already exist, and associate
		// If the id already exists, skip it
		for (let i = 0; i < allResults.length; i++) {
			// console.log(allResults[i]);

			Item_index.findOne({item_id: allResults[i][0]}).exec(function(error, doc){
				if (error) { console.log(error); }
				if (doc) { console.log(allResults[i][0]); }
				else {
					// Then run the insert here
					// Get item_id from new insert and associate with media, materials, sources --> _id's from these inserted docs, update the item_index document by query on same item_id
					var Item = new Item_index({
						item_title : allResults[i][1],
						item_id : allResults[i][0],
						group : allResults[i][2],
						period : allResults[i][5],
						notes : allResults[i][6],
						main_desc : allResults[i][7],
						long_desc : allResults[i][8],
						context : allResults[i][9],
						research_notes : allResults[i][10],
						display : allResults[i][11],
						prim_doc : allResults[i][12],
						if_published : 1,
					});
					var Images = new Media({
						img_ref_1 : allResults[i][14]['img_ref_1'],
						img_ref_2 : allResults[i][14]['img_ref_2'],
						img_ref_3 : allResults[i][14]['img_ref_3'],
						img_ref_4 : allResults[i][14]['img_ref_4'],
						museum : allResults[i][14]['institution']
					});
					var SourceURL = new Source({ url : allResults[i][4] });

					Item.save(function(err, doc){
						if (err) {console.log(err);}
						else {console.log(doc);}
					});

					Images.save(function(err, doc){
						if (err) { console.log(err); }
						else {
						// Push the ObjectID values from the subjects, images, refs to their respective arrays in the Item model
							Item_index.findOneAndUpdate({item_id: allResults[i][0]}, {$push: {"media": doc._id}}, {new: true})
							.exec(function(err, mediaDoc) {
								if (err) { console.log(err); }
								else {}
							});
						}
					});
					SourceURL.save(function(err, doc){
						if (err) { console.log(err); }
						else {
							// Associate media with inserted item
							Item_index.findOneAndUpdate({item_id: allResults[i][0]}, {$push: {"source_refs": doc._id}}, {new: true})
							.exec(function(err, sourceDoc) {
								if (err) { console.log(err); }
								else {}
							});
						}
					});
					for (let j = 0; j < allResults[i][13].length; j++) {
						var Subj = new Field({ ethn_id : allResults[i][13][j] });
						Subj.save(function(err, doc){
							if (err) { console.log(err); }
							else {
								Item_index.findOneAndUpdate({item_id: allResults[i][0]}, {$push: {"fields": doc._id}}, {new: true})
								.exec(function(err, fieldDoc) {
									if (err) { console.log(err); }
									else {}
								})
							}
						})
					} // Closes FOR loop for subject fields

				} // Closes if/else condition after findOne
			});
		} // Closes FOR loop for allResults array

				// If culture not yet cataloged, add it to collection
		Tribe.findOne({group_name: req.params.tribe}).exec(function(error, doc){
			if (error) { console.log(error); }
			if (doc) { console.log(req.params.tribe); }
			else {
				var Culture = new Tribe({
					group_name: cultureMain,
					alt_name: cultureAlt
				});
				Culture.save(function(err, doc){
					if (err) { console.log(err); }
					else {}
				});
			}
		});

	});
});

module.exports = router;