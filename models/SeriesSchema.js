var mongoose = require('mongoose');

var seriesSchema = new mongoose.Schema({
	length: Number,
	homeUser: String,
	awayUser: String
});

module.exports = mongoose.model('Series', seriesSchema);