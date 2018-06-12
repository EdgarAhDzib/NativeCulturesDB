var nahualtocaitl = require('./nahualtocaitl');

var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
const passport = require('passport');

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('flash');
var session = require('express-session');

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

app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
	errorFormatter: function(param, mssg, value){
		var namespace = param.split('.');
		var root = namespace.shift();
		var formParam = root;
		while (namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			mssg: mssg,
			value: value
		};
	}
}));

// flash() Must precede route references
app.use(flash());

// !-- The routes and use assignments must be defined after bodyParser, or posted data will not be passed properly
const cultures = require("./config/routes/cultures");
const content_fields = require("./config/routes/content_fields");
const item = require("./config/routes/item");
const media = require("./config/routes/media");
const sources = require("./config/routes/sources");
const subjects = require("./config/routes/subjects");
const login = require("./config/routes/login");
const user = require("./config/routes/user");
// const populate = require("./populate_ids");
const rrn = require("./rrn_api");

app.use('/', cultures);
app.use('/', content_fields);
app.use('/', item);
app.use('/', media);
app.use('/', sources);
app.use('/', subjects);
app.use('/', login);
app.use('/', user);
// app.use('/', populate);
app.use('/', rrn);

app.use(cookieParser);

app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

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