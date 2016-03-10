var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// models
var User = require('./models/UserSchema.js');

// connect to database
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/chel';
mongoose.connect(mongoUri, function (error) {
	if (error) console.error(error);
	else console.log('connected to mongo database.');
});

// express
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});
app.get('/', function (req, res) {
	res.sendFile('index.html', {
		root: 'public'
	});
});
app.use(express.static('public'));

// api
app.get('/api/users', function (req, res, next) {
	User.find(function(err, users) {
		if(err) {
			res.send(err);
		}
		res.json(users);
	});
});
app.get('/api/users/:id', function (req, res, next) {
	User.findById(req.params.id, function(err, user) {
		if(err) {
			res.send(err);
		}
		res.json(user);
	});
});
app.post('/api/users', function (req, res) {
	var user = new User();
	console.log(req.body);
	user.name = req.body.name
	user.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.json({ message: 'User created!' });
	});
});

// 404
app.get('*', function (req, res) {
	res.sendFile('404.html', {
		root: 'public'
	});
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('chel deking on port ' + port + '.');
});