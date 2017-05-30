var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weekSchema = new Schema({
	week: Date,
	weekFormatted: String,
	minTemp: Number,
	maxTemp: Number,
	avgTemp: Number
});

module.exports = mongoose.model('WeeklyTemperatures', weekSchema, 'WeeklyTemperatures');