var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
	series: String,
	date: String,
	homeUser: String,
	awayUser: String,
	homeTeam: String,
	awayTeam: String,
	homeScore: Number,
	awayScore: Number,
	overtime: Boolean,
	notes: String
});

module.exports = mongoose.model('Game', gameSchema);