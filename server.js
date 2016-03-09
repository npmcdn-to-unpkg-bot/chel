var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

// load routes here

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