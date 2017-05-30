var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var plantSchema = new Schema({
	plantName: String,
	localID: String,
	plantBreed: String,
	location: String,
	inchRootRadius: Number,
	plantDate: Date
	
});

module.exports = mongoose.model('Plant', plantSchema, 'Plant');