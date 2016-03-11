var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// models
var User = require('./models/UserSchema.js');
var Series = require('./models/SeriesSchema.js');
var Game = require('./models/GameSchema.js');
var Team = require('./models/TeamSchema.js');

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

// user api
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
	user.name = req.body.name;
	user.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.json({ message: 'User created!' });
	});
});

// series api
app.get('/api/series', function (req, res, next) {
	Series.find(function(err, series) {
		if(err) {
			res.send(err);
		}
		res.json(series);
	});
});
app.get('/api/series/:id', function (req, res, next) {
	Series.findById(req.params.id, function(err, series) {
		if(err) {
			res.send(err);
		}
		res.json(series);
	});
});
app.post('/api/series', function (req, res) {
	var series = new Series();
	series.length = req.body.length;
	series.homeUser = req.body.homeUser;
	series.awayUser = req.body.awayUser;
	series.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.json({ message: 'Series created!' });
	});
});

// games api
app.get('/api/games', function (req, res, next) {
	Game.find(function(err, games) {
		if(err) {
			res.send(err);
		}
		res.json(games);
	});
});
app.get('/api/games/:id', function (req, res, next) {
	Game.findById(req.params.id, function(err, game) {
		if(err) {
			res.send(err);
		}
		res.json(game);
	});
});
app.post('/api/series', function (req, res) {
	var game = new Game();
	game.series = req.body.series;
	game.date = req.body.date;
	game.homeUser = req.body.homeUser;
	game.awayUser = req.body.awayUser;
	game.homeTeam = req.body.homeTeam;
	game.awayTeam = req.body.awayTeam;
	game.homeScore = req.body.homeScore;
	game.awayScore = req.body.awayScore;
	game.overtime = req.body.overtime;
	game.notes = req.body.notes;
	game.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.json({ message: 'Game created!' });
	});
});

// teams api
app.get('/api/teams', function (req, res, next) {
	Team.find(function(err, teams) {
		if(err) {
			res.send(err);
		}
		res.json(teams);
	});
});
app.get('/api/teams/:id', function (req, res, next) {
	Team.findById(req.params.id, function(err, team) {
		if(err) {
			res.send(err);
		}
		res.json(team);
	});
});
app.post('/api/teams', function (req, res) {
	var team = new Team();
	team.city = req.body.city;
	team.name = req.body.name;
	team.logoUrl = req.body.logoUrl;
	team.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.json({ message: 'Team created!' });
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