const mongoose = require('mongoose');

// Create a schema class
var Schema = mongoose.Schema;

const Item_index = new Schema({
    id : {type: Number},
    item_title : {type: String},
    item_id : {type: Number},
    group : {type: String},
    period : {type: String},
    notes : {type: String},
    main_desc : {type: String},
    long_desc : {type: String},
    context : {type: String},
    research_notes : {type: String},
    display : {type: String},
    prim_doc : {type: String},
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
    }]
});

module.exports = mongoose.model('item_index', Item_index);

