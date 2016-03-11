var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
	city: String,
	name: String,
	logoUrl: String
});

module.exports = mongoose.model('Team', teamSchema);
