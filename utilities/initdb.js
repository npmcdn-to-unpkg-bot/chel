var mongoose = require('mongoose');

// models
var User = require('../models/UserSchema.js');
var Series = require('../models/SeriesSchema.js');
var Game = require('../models/GameSchema.js');
var Team = require('../models/TeamSchema.js');

console.log('chel initdb utility');

// connect to database
var mongoUri = 'mongodb://localhost/chel-build';
mongoose.connect(mongoUri, function (error) {
	if (error) console.error(error);
	else console.log('connected to mongo database.');
});

var seriesLengths = [3, 5, 7];
var insertedUsers = [];
var insertedTeams = [];
var insertedSeries = [];
var insertedGames = [];

// create functions
function createUser(name) {
	return {
		name: name
	};
}

function createTeam(location, name, logoUrl) {
	return {
		location: location,
		name: name,
		logoUrl: logoUrl
	};
}

function createSeries(length, homeUser, awayUser) {
	return {
		length: length,
		homeUser: homeUser,
		awayUser: awayUser
	};
}

function createGame(series, date, homeUser, awayUser, homeTeam, awayTeam, homeScore, awayScore, overtime, notes) {
	return {
		series: series,
		date: date,
		homeUser: homeUser,
		awayUser: awayUser,
		homeTeam: homeTeam,
		awayTeam: awayTeam,
		homeScore: homeScore,
		awayScore: awayScore,
		overtime: overtime,
		notes: notes
	};
}

// random functions
function getRandomSeriesLength() {
	return seriesLengths[Math.floor(Math.random() * seriesLengths.length)];
}

function getRandomUser() {
	return insertedUsers.ops[Math.floor(Math.random() * insertedUsers.ops.length)];
}

function getRandomUserOpponent(id) {
	var possibleOpponents = insertedUsers.ops.filter(function(u) {
		return u._id !== id;
	});
	return possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)];
}

function getRandomUserMatchup(matchup) {
	var homeUser = getRandomUser();
	var awayUser = getRandomUserOpponent(homeUser._id);
	return {
		homeUser: homeUser._id,
		awayUser: awayUser._id
	};
}

function createRandomSeries() {
	var matchup = getRandomUserMatchup();
	return createSeries(getRandomSeriesLength(), matchup.homeUser, matchup.awayUser);
}

function getRandomDate() {
	var startDate = new Date(2012,0,1).getTime();
	var endDate =  new Date(2015,0,1).getTime();
	var spaces = (endDate - startDate);
	var timestamp = Math.round(Math.random() * spaces);
	timestamp += startDate;
	return new Date(timestamp);
}

function getRandomTeam() {
	return insertedTeams.ops[Math.floor(Math.random() * insertedTeams.ops.length)];
}

function getRandomTeamOpponent(id) {
	var possibleOpponents = insertedTeams.ops.filter(function(u) {
		return u._id !== id;
	});
	return possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)];
}

function getRandomTeamMatchup(matchup) {
	var homeTeam = getRandomTeam();
	var awayTeam = getRandomTeamOpponent(homeTeam._id);
	return {
		homeTeam: homeTeam._id,
		awayTeam: awayTeam._id
	};
}

function getRandomScore() {
	return Math.floor(Math.random() * 6) + 0;
}

function getRandomOvertime(homeScore, awayScore) {
	if((homeScore - 1 === awayScore) || (awayScore - 1 === homeScore)) {
		return Math.random() >= 0.5;
	} else {
		return false;
	}
}

function createRandomGameForSeries(series) {
	var teams = getRandomTeamMatchup();
	var homeScore = getRandomScore();
	var awayScore = getRandomScore();
	return createGame(
		series._id,
		getRandomDate(),
		series.homeUser,
		series.awayUser,
		teams.homeTeam,
		teams.awayTeam,
		homeScore,
		awayScore,
		getRandomOvertime(homeScore, awayScore),
		""
	);
}

// insert functions
function insertUsers(userBag, callback) {
	User.collection.insert(userBag, function(err, users) {
		if (err) {
			console.log('Failed to insert users');
			console.log(err);
		} else {
			console.log('Users inserted.');
			insertedUsers = users;
			if(typeof callback === 'function') {
				callback();
			}
		}
	});
}

function insertTeams(teamBag, callback) {
	Team.collection.insert(teamBag, function(err, teams) {
		if (err) {
			console.log('Failed to insert teams');
			console.log(err);
		} else {
			console.log('Teams inserted.');
			insertedTeams = teams;
			if(typeof callback === 'function') {
				callback();
			}
		}
	});
}

function insertSeries(seriesBag, callback) {
	Series.collection.insert(seriesBag, function(err, series) {
		if (err) {
			console.log('Failed to insert series');
			console.log(err);
		} else {
			console.log('Series inserted.');
			insertedSeries = series;
			if(typeof callback === 'function') {
				callback();
			}
		}
	});
}

function insertGames(gamesBag, callback) {
	Game.collection.insert(gamesBag, function(err, games) {
		if (err) {
			console.log('Failed to insert games');
			console.log(err);
		} else {
			console.log('Games inserted.');
			insertedGames = games;
			if(typeof callback === 'function') {
				callback();
			}
		}
	});
}

var userBag = [
	createUser('Mike'),
	createUser('Sean'),
	createUser('Joey')
];

var teamBag = [
	// Central Division
	createTeam('Chicago', 'Blackhawks', 'images/teams/blackhawks.png'),
	createTeam('Colorado', 'Avalanche', 'images/teams/avalanche.png'),
	createTeam('Dallas', 'Stars', 'images/teams/stars.png'),
	createTeam('Minnesota', 'Wild', 'images/teams/wild.png'),
	createTeam('Nashville', 'Predators', 'images/teams/predators.png'),
	createTeam('St. Louis', 'Blues', 'images/teams/blues.png'),
	createTeam('Winnipeg', 'Jets', 'images/teams/jets.png'),
	
	// Atlantic Division
	createTeam('Boston', 'Bruins', 'images/teams/bruins.png'),
	createTeam('Buffalo', 'Sabres', 'images/teams/sabres.png'),
	createTeam('Detroit', 'Red Wings', 'images/teams/red-wings.png'),
	createTeam('Florida', 'Panthers', 'images/teams/panthers.png'),
	createTeam('Montreal', 'Canadiens', 'images/teams/canadiens.png'),
	createTeam('Ottowa', 'Senators', 'images/teams/senators.png'),
	createTeam('Tampa Bay', 'Lightning', 'images/teams/lightning.png'),
	createTeam('Toronto', 'Maple Leafs', 'images/teams/maple-leafs.png'),
	
	// Pacific Division
	createTeam('Anaheim', 'Ducks', 'images/teams/ducks.png'),
	createTeam('Arizona', 'Coyotes', 'images/teams/coyotes.png'),
	createTeam('Calgary', 'Flames', 'images/teams/flames.png'),
	createTeam('Edmonton', 'Oilers', 'images/teams/oilers.png'),
	createTeam('Los Angeles', 'Kings', 'images/teams/kings.png'),
	createTeam('San Jose', 'Sharks', 'images/teams/sharks.png'),
	createTeam('Vancouver', 'Canucks', 'images/teams/canucks.png'),
	
	// Metropolitan Division
	createTeam('Carolina', 'Hurricanes', 'images/teams/hurricanes.png'),
	createTeam('Columbus', 'Blue Jackets', 'images/teams/blue-jackets.png'),
	createTeam('New Jersey', 'Devils', 'images/teams/devils.png'),
	createTeam('New York', 'Rangers', 'images/teams/rangers.png'),
	createTeam('Philadelphia', 'Flyers', 'images/teams/flyers.png'),
	createTeam('Pittsburgh', 'Penguins', 'images/teams/penguins.png'),
	createTeam('Washington', 'Capitals', 'images/teams/capitals.png'),
	createTeam('New York', 'Islanders', 'images/teams/islanders.png')
];

insertUsers(userBag, function() {
	insertTeams(teamBag, function() {
		var randomSeriesBag = [
			createRandomSeries(),
			createRandomSeries(),
			createRandomSeries(),
			createRandomSeries(),
			createRandomSeries(),
			createRandomSeries(),
			createRandomSeries()
		];
		insertSeries(randomSeriesBag, function() {
			var randomGamesBag = [];
			for(var i = 0; i < insertedSeries.ops.length; i++) {
				var series = insertedSeries.ops[i];
				var length = series.length;
				for(var j = length; j > 0; j--) {
					randomGamesBag.push(createRandomGameForSeries(series));
				}
			}
			
			insertGames(randomGamesBag, function() {
				
			});
		});
	});
});
//insertSeries(randomSeriesBag);

//process.exit()