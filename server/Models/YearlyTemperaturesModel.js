var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yearSchema = new Schema({
	year: Number,
	monthRanges: [{
		month: Number,
		minViableTemp: Number,
		maxViableTemp: Number		
	}]
	
});

module.exports = mongoose.model('YearlyTempRanges', yearSchema, 'YearlyTempRanges');