const mongoose = require('mongoose');

// Create a schema class
var Schema = mongoose.Schema;

const Item_index = new Schema({
    // id : {type: Number},
    item_title : {type: String, text: true},
    item_id : {type: Number, unique: true},
    group : {type: String, text: true},
    period : {type: String},
    notes : {type: String, text: true},
    main_desc : {type: String, text: true},
    long_desc : {type: String, text: true},
    context : {type: String, text: true},
    research_notes : {type: String, text: true},
    display : {type: String},
    prim_doc : {type: String, text: true},
    if_published : {type: Number},
    media: [{
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        ref: "media_source"
    }],
    fields: [{
        type: Schema.Types.ObjectId,
        ref: "content_field"
    }],
    source_refs: [{
        type: Schema.Types.ObjectId,
        ref: "source_ref"
    }],
    comments: []
});

module.exports = mongoose.model('item_index', Item_index);

