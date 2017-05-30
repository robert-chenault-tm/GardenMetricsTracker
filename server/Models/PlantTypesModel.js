var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var plantTypesSchema = new Schema({
	name: String,
	defaultMeasurement: String,
	defaultInchRootRadius: Number,
	plantBreeds: [{ val: String }]
});

module.exports = mongoose.model('PlantTypes', plantTypesSchema, 'PlantTypes');