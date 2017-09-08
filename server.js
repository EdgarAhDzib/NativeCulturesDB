var nahualtocaitl = require('./nahualtocaitl');

var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8040;

require('./webpack.config.js');

app.use(express.static(process.cwd() + "/public") );

//Use body-parser to generate JSON content
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json", limit: '50mb' }));
app.use(bodyParser.urlencoded({
	limit: '50mb',
	// This may require setting to true
	extended: false
}));
// Source: https://stackoverflow.com/questions/39215574/how-to-upload-imageslarge-files-to-server-using-axios
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser({uploadDir:'/tempimgpath'}));

// !-- The routes and use assignments must be defined after bodyParser, or posted data will not be passed properly
const cultures = require("./config/routes/cultures");
const content_fields = require("./config/routes/content_fields");
const item = require("./config/routes/item");
const media = require("./config/routes/media");
const sources = require("./config/routes/sources");
const subjects = require("./config/routes/subjects");
const populate = require("./populate_ids");
const rrn = require("./rrn_api");

app.use('/', cultures);
app.use('/', content_fields);
app.use('/', item);
app.use('/', media);
app.use('/', sources);
app.use('/', subjects);
app.use('/', populate);
app.use('/', rrn);

var databaseUri = "mongodb://localhost/native";
// var MONGODB_URI = require('./keys.js');

//Option whether to connect to remote server or localhost
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri);
}

// Database configuration with mongoose
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});